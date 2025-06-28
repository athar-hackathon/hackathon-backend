export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  phone?: number;
  gender?: 'MALE' | 'FEMALE';
  age?: number;
  profilePicture?: string;
  locationId: number;
  createdAt?: string;
  updatedAt?: string;
}
