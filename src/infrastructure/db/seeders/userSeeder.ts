import { db } from '../sequelize';
import bcrypt from 'bcrypt';

export const seedUsers = async () => {
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const users = [
    // Admins
    {
      email: 'admin@oxyjeunes.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin' as const,
      isActive: true,
      gender: 'MALE' as const,
      age: 35,
      city: 'Paris',
      country: 'France',
      interests: ['environment', 'education', 'health']
    },
    {
      email: 'admin2@oxyjeunes.com',
      password: hashedPassword,
      name: 'System Administrator',
      role: 'admin' as const,
      isActive: true,
      gender: 'FEMALE' as const,
      age: 28,
      city: 'Lyon',
      country: 'France',
      interests: ['technology', 'social_justice']
    },

    // Association Owners
    {
      email: 'association1@oxyjeunes.com',
      password: hashedPassword,
      name: 'Jean Dupont',
      role: 'associationOwner' as const,
      isActive: true,
      gender: 'MALE' as const,
      age: 42,
      city: 'Marseille',
      country: 'France',
      interests: ['environment', 'community']
    },
    {
      email: 'association2@oxyjeunes.com',
      password: hashedPassword,
      name: 'Marie Laurent',
      role: 'associationOwner' as const,
      isActive: true,
      gender: 'FEMALE' as const,
      age: 38,
      city: 'Toulouse',
      country: 'France',
      interests: ['education', 'youth']
    },
    {
      email: 'association3@oxyjeunes.com',
      password: hashedPassword,
      name: 'Pierre Martin',
      role: 'associationOwner' as const,
      isActive: true,
      gender: 'MALE' as const,
      age: 45,
      city: 'Nice',
      country: 'France',
      interests: ['health', 'social_services']
    },

    // Volunteers
    {
      email: 'volunteer1@oxyjeunes.com',
      password: hashedPassword,
      name: 'Sophie Bernard',
      role: 'volunteer' as const,
      isActive: true,
      gender: 'FEMALE' as const,
      age: 22,
      city: 'Paris',
      country: 'France',
      interests: ['environment', 'animals']
    },
    {
      email: 'volunteer2@oxyjeunes.com',
      password: hashedPassword,
      name: 'Lucas Moreau',
      role: 'volunteer' as const,
      isActive: true,
      gender: 'MALE' as const,
      age: 25,
      city: 'Lyon',
      country: 'France',
      interests: ['education', 'technology']
    },
    {
      email: 'volunteer3@oxyjeunes.com',
      password: hashedPassword,
      name: 'Emma Roux',
      role: 'volunteer' as const,
      isActive: true,
      gender: 'FEMALE' as const,
      age: 20,
      city: 'Marseille',
      country: 'France',
      interests: ['health', 'community']
    },
    {
      email: 'volunteer4@oxyjeunes.com',
      password: hashedPassword,
      name: 'Thomas Leroy',
      role: 'volunteer' as const,
      isActive: true,
      gender: 'MALE' as const,
      age: 27,
      city: 'Toulouse',
      country: 'France',
      interests: ['social_justice', 'youth']
    },
    {
      email: 'volunteer5@oxyjeunes.com',
      password: hashedPassword,
      name: 'Camille Petit',
      role: 'volunteer' as const,
      isActive: true,
      gender: 'FEMALE' as const,
      age: 24,
      city: 'Nice',
      country: 'France',
      interests: ['environment', 'education']
    }
  ];

  const createdUsers = [];
  for (const userData of users) {
    const user = await db.user.create(userData);
    createdUsers.push(user.get());
  }

  return createdUsers;
}; 