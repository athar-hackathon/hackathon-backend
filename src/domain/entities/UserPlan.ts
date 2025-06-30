export interface UserPlan {
  id: string;
  userId: string;
  planId: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedAt: Date;
  updatedAt?: Date;
  createdAt?: Date;
} 