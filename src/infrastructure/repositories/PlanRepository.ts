import { IPlanRepository, FilterOptions } from "@/src/domain/repositories/IPlanRepository";
import { Plan } from "@/src/domain/entities/Plan";
import { db } from "../db/sequelize";
import { Op, literal } from "sequelize";
import { Model } from "sequelize";

type PlanCreationInput = Omit<Plan, "id" | "createdAt" | "updatedAt">;

export const PlanRepository: IPlanRepository = {
  async createPlan(data: PlanCreationInput) {
    const plan = await db.plan.create(data);
    return plan.get() as Plan;
  },

  async findAll(): Promise<Plan[]> {
    const plans = await db.plan.findAll({
      include: [{
        model: db.destination,
        as: 'destinations',
        include: [{
          model: db.location,
          as: 'location',
          attributes: ['city', 'country', 'address']
        }]
      }, {
        model: db.category,
        as: 'category',
        attributes: ['name']
      }]
    });
    return plans.map((plan: Model) => plan.get() as Plan);
  },

  async findById(id: string): Promise<Plan | null> {
    const plan = await db.plan.findByPk(id, {
      include: [{
        model: db.destination,
        as: 'destinations',
        include: [{
          model: db.location,
          as: 'location',
          attributes: ['city', 'country', 'address']
        }]
      }, {
        model: db.category,
        as: 'category',
        attributes: ['name']
      }]
    });
    return plan ? (plan.get() as Plan) : null;
  },

  async findByFilters(filters: FilterOptions): Promise<Plan[]> {
    const whereClause: any = {};
    const includeClause: any = [{
      model: db.destination,
      as: 'destinations',
      include: [{
        model: db.location,
        as: 'location',
        attributes: ['id', 'longitude', 'latitude', 'country', 'state', 'city', 'address']
      }]
    }];

    // Filter by category
    if (filters.categoryId) {
      whereClause.category_id = filters.categoryId;
    }

    // Filter by fees range
    if (filters.minFees !== undefined ){
      whereClause.totalFees = {};
      if (filters.minFees !== undefined) {
        whereClause.totalFees[Op.gte] = filters.minFees;
      }
    }

    // Filter by active status
    if (filters.isActive !== undefined) {
      whereClause.isActive = filters.isActive;
    }

    // Filter by paid status
    if (filters.isPaid !== undefined) {
      whereClause.isPaid = filters.isPaid;
    }

    // Location-based filtering
    if (filters.country || filters.state || filters.city || filters.address) {
      const locationWhere: any = {};
      
      if (filters.country) {
        locationWhere.country = { [Op.iLike]: `%${filters.country}%` };
      }
      if (filters.state) {
        locationWhere.state = { [Op.iLike]: `%${filters.state}%` };
      }
      if (filters.city) {
        locationWhere.city = { [Op.iLike]: `%${filters.city}%` };
      }
      if (filters.address) {
        locationWhere.address = { [Op.iLike]: `%${filters.address}%` };
      }

      includeClause[0].include[0].where = locationWhere;
    }

    const plans = await db.plan.findAll({
      where: whereClause,
      include: includeClause,
      order: [['createdAt', 'DESC']]
    });

    return plans.map((plan: Model) => plan.get() as Plan);
  },

  async create(planData: PlanCreationInput): Promise<Plan> {
    const plan = await db.plan.create(planData);
    return plan.get() as Plan;
  },

  async update(id: string, planData: Partial<Plan>): Promise<Plan | null> {
    const plan = await db.plan.findByPk(id);
    if (!plan) return null;
    
    await plan.update(planData);
    return plan.get() as Plan;
  },

  async delete(id: string): Promise<boolean> {
    try {
      const deletedCount = await db.plan.destroy({
        where: { id }
      });
      return deletedCount > 0;
    } catch (error) {
      console.error('Error deleting plan:', error);
      return false;
    }
  },

  async findByAssociationId(associationId: string): Promise<Plan[]> {
    const plans = await db.plan.findAll({
      where: { associationId: associationId },
      include: [{
        model: db.destination,
        as: 'destinations',
        include: [{
          model: db.location,
          as: 'location',
          attributes: ['id', 'longitude', 'latitude', 'country', 'state', 'city', 'address']
        }]
      }]
    });
    return plans.map((plan: Model) => plan.get() as Plan);
  },

  async filterPlans(filters: {
    categories?: string[];
    minFee?: number;
    maxFee?: number;
    location?: string;
    latitude?: number;
    longitude?: number;
    radius?: number;
  }): Promise<Plan[]> {
    const whereClause: any = {};
    const includeClause: any = [{
      model: db.destination,
      as: 'destinations',
      include: [{
        model: db.location,
        as: 'location',
        attributes: ['id', 'longitude', 'latitude', 'country', 'state', 'city', 'address']
      }]
    }];

    // Filter by categories
    if (filters.categories && filters.categories.length > 0) {
      whereClause.category_id = { [Op.in]: filters.categories };
    }

    // Filter by fees range
    if (filters.minFee !== undefined || filters.maxFee !== undefined) {
      whereClause.totalFees = {};
      if (filters.minFee !== undefined) {
        whereClause.totalFees[Op.gte] = filters.minFee;
      }
      if (filters.maxFee !== undefined) {
        whereClause.totalFees[Op.lte] = filters.maxFee;
      }
    }

    // Location-based filtering
    if (filters.location) {
      const locationWhere: any = {
        [Op.or]: [
          { country: { [Op.iLike]: `%${filters.location}%` } },
          { state: { [Op.iLike]: `%${filters.location}%` } },
          { city: { [Op.iLike]: `%${filters.location}%` } },
          { address: { [Op.iLike]: `%${filters.location}%` } }
        ]
      };
      includeClause[0].include[0].where = locationWhere;
    }

    // Distance-based filtering using Haversine formula
    if (filters.latitude && filters.longitude && filters.radius) {
      const haversineFormula = `
        (6371 * acos(cos(radians(${filters.latitude})) * 
        cos(radians(location.latitude)) * 
        cos(radians(location.longitude) - radians(${filters.longitude})) + 
        sin(radians(${filters.latitude})) * 
        sin(radians(location.latitude))))
      `;
      
      includeClause[0].include[0].attributes = [
        'id', 'longitude', 'latitude', 'country', 'state', 'city', 'address',
        [literal(haversineFormula), 'distance']
      ];
      
      includeClause[0].include[0].having = literal(`distance <= ${filters.radius}`);
      includeClause[0].include[0].order = [literal('distance')];
    }

    const plans = await db.plan.findAll({
      where: whereClause,
      include: includeClause,
      order: [['createdAt', 'DESC']]
    });

    return plans.map((plan: Model) => plan.get() as Plan);
  },

  // Find plans by category name
  async findByCategoryName(categoryName: string): Promise<Plan[]> {
    const plans = await db.plan.findAll({
      include: [{
        model: db.category,
        as: 'category',
        where: { name: categoryName },
        attributes: ['name']
      }, {
        model: db.destination,
        as: 'destinations',
        include: [{
          model: db.location,
          as: 'location',
          attributes: ['city', 'country', 'address']
        }]
      }],
      order: [['createdAt', 'DESC']]
    });
    return plans.map((plan: Model) => plan.get() as Plan);
  },

  // Find plans by categories
  async findByCategories(categories: string[]): Promise<Plan[]> {
    const plans = await db.plan.findAll({
      where: { category_id: { [Op.in]: categories } },
      include: [{
        model: db.destination,
        as: 'destinations',
        include: [{
          model: db.location,
          as: 'location',
          attributes: ['id', 'longitude', 'latitude', 'country', 'state', 'city', 'address']
        }]
      }, {
        model: db.category,
        as: 'category',
        attributes: ['id', 'name']
      }],
      order: [['createdAt', 'DESC']]
    });
    return plans.map((plan: Model) => plan.get() as Plan);
  },

  // Find plans the user has participated in (joined)
  async findByUserParticipation(userId: string): Promise<Plan[]> {
    // Assuming a join table db.user_plan exists with userId and planId
    if (!db.user_plan) return [];
    const userPlanRows = await db.user_plan.findAll({ where: { userId } });
    const planIds = userPlanRows.map((row: any) => row.planId);
    if (!planIds.length) return [];
    const plans = await db.plan.findAll({ 
      where: { id: { [Op.in]: planIds } },
      include: [{
        model: db.destination,
        as: 'destinations',
        include: [{
          model: db.location,
          as: 'location',
          attributes: ['id', 'longitude', 'latitude', 'country', 'state', 'city', 'address']
        }]
      }, {
        model: db.category,
        as: 'category',
        attributes: ['id', 'name']
      }]
    });
    return plans.map((plan: Model) => plan.get() as Plan);
  },

  // Find most popular plans (by number of joined users)
  async findMostPopular({ limit = 10 }: { limit?: number }): Promise<Plan[]> {
    // Assuming a join table db.user_plan exists with userId and planId
    if (!db.user_plan) return [];
    const popular = await db.user_plan.findAll({
      attributes: ['planId', [db.Sequelize.fn('COUNT', db.Sequelize.col('userId')), 'joinCount']],
      group: ['planId'],
      order: [[db.Sequelize.literal('joinCount'), 'DESC']],
      limit,
    });
    const planIds = popular.map((row: any) => row.planId);
    if (!planIds.length) return [];
    const plans = await db.plan.findAll({ 
      where: { id: { [Op.in]: planIds } },
      include: [{
        model: db.destination,
        as: 'destinations',
        include: [{
          model: db.location,
          as: 'location',
          attributes: ['id', 'longitude', 'latitude', 'country', 'state', 'city', 'address']
        }]
      }, {
        model: db.category,
        as: 'category',
        attributes: ['id', 'name']
      }]
    });
    return plans.map((plan: Model) => plan.get() as Plan);
  }
}; 