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
  totalFees:string;
  destinationId: number;
  category_id: string;
  createdAt?: string;
  updatedAt?: string;
  associationId: string;
  image_url?: string;
}
