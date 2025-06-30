import { ILocationRepository } from "@/src/domain/repositories/ILocationRepository";
import { Location } from "@/src/domain/entities/Location";
import { db } from "../db/sequelize";
import { Model, Op, fn, col, literal } from "sequelize";

type LocationCreationInput = Omit<Location, "id" | "createdAt" | "updatedAt">;

export const LocationRepository: ILocationRepository = {
  async findAll(): Promise<Location[]> {
    const locations = await db.location.findAll();
    return locations.map((location: Model) => location.get() as Location);
  },

  async findById(id: string): Promise<Location | null> {
    const location = await db.location.findByPk(id);
    return location ? (location.get() as Location) : null;
  },

  async findByLocationFilters(filters: {
    country?: string;
    state?: string;
    city?: string;
    address?: string;
  }): Promise<Location[]> {
    const whereClause: any = {};

    if (filters.country) {
      whereClause.country = { [Op.iLike]: `%${filters.country}%` };
    }

    if (filters.state) {
      whereClause.state = { [Op.iLike]: `%${filters.state}%` };
    }

    if (filters.city) {
      whereClause.city = { [Op.iLike]: `%${filters.city}%` };
    }

    if (filters.address) {
      whereClause.address = { [Op.iLike]: `%${filters.address}%` };
    }

    const locations = await db.location.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']]
    });

    return locations.map((location: Model) => location.get() as Location);
  },
  async create(locationData: LocationCreationInput): Promise<Location> {
    const location = await db.location.create(locationData);
    return location.get() as Location;
  },

  async update(id: string, locationData: Partial<Location>): Promise<Location | null> {
    const location = await db.location.findByPk(id);
    if (!location) return null;
    
    await location.update(locationData);
    return location.get() as Location;
  },

  async delete(id: string): Promise<boolean> {
    const location = await db.location.findByPk(id);
    if (!location) return false;
    
    await location.destroy();
    return true;
  }
}; 