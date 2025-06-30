import { Plan } from "../entities/Plan";

export interface FilterOptions {
  categoryId?: string;
  minFees?: number;
  isActive?: boolean;
  isPaid?: boolean;
  // Location search parameters
  country?: string;
  state?: string;
  city?: string;
  address?: string;
}

export interface IPlanRepository {
  createPlan(user: Omit<Plan, "id" | "createdAt" | "updatedAt">): Promise<Plan>;
  findAll(): Promise<Plan[]>;
  findById(id: string): Promise<Plan | null>;
  findByFilters(filters: FilterOptions): Promise<Plan[]>;
  create(plan: Omit<Plan, 'id' | 'createdAt' | 'updatedAt'>): Promise<Plan>;
  update(id: string, plan: Partial<Plan>): Promise<Plan | null>;
  delete(id: string): Promise<boolean>;
  findByAssociationId(associationId: string): Promise<Plan[]>;
  filterPlans(filters: {
    categories?: string[];
    minFee?: number;
    location?: string;
    latitude?: number;
    longitude?: number;
    radius?: number;
  }): Promise<Plan[]>;
  findByCategories(categories: string[]): Promise<Plan[]>;
  findByCategoryName(categoryName: string): Promise<Plan[]>;
  findByUserParticipation(userId: string): Promise<Plan[]>;
  findMostPopular(options: { limit?: number }): Promise<Plan[]>;
} 
