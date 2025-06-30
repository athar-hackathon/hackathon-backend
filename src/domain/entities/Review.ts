export interface Review {
  id: string;
  rating: number; // 1.0-5.0 stars (float)
  comment: string;
  volunteerId: string; // User who wrote the review
  associationId: string; // Association being reviewed
  createdAt?: string;
  updatedAt?: string;
} 