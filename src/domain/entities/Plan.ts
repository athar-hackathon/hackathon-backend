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
  price:string;
  locationId: number
  createdAt?: string;
  updatedAt?: string;
}
