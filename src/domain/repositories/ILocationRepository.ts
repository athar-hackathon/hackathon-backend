import { Location } from "../entities/Location";

export interface ILocationRepository {
  findAll(): Promise<Location[]>;
  findById(id: string): Promise<Location | null>;
  findByLocationFilters(filters: {
    country?: string;
    state?: string;
    city?: string;
    address?: string;
  }): Promise<Location[]>;
  create(location: Omit<Location, 'id' | 'createdAt' | 'updatedAt'>): Promise<Location>;
  update(id: string, location: Partial<Location>): Promise<Location | null>;
  delete(id: string): Promise<boolean>;
} 