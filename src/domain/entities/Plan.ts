export interface Plan {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  volunteerNumber: number;
  appliedVolunteerNumber: number;
  isActive: boolean;
  isPaid: boolean;
  fees:string;
  locationId: number;
  category_id: string;
  createdAt?: string;
  updatedAt?: string;
}
