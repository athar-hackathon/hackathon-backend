import { db } from '../sequelize';
import bcrypt from 'bcrypt';

export const seedUsers = async () => {
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const users = [
    // Admins
    {
      email: 'admin@oxyjeunes.com',
      password: hashedPassword,
      name: 'Amine Bensalah',
      role: 'admin' as const,
      isActive: true,
      gender: 'MALE' as const,
      age: 35,
      city: 'Algiers',
      country: 'Algeria',
      interests: ['environment', 'education', 'health']
    },
    {
      email: 'admin2@oxyjeunes.com',
      password: hashedPassword,
      name: 'Nadia Bouzid',
      role: 'admin' as const,
      isActive: true,
      gender: 'FEMALE' as const,
      age: 28,
      city: 'Oran',
      country: 'Algeria',
      interests: ['technology', 'social_justice']
    },

    // Association Owners
    {
      email: 'association1@oxyjeunes.com',
      password: hashedPassword,
      name: 'Yacine Bniadm',
      role: 'associationOwner' as const,
      isActive: true,
      gender: 'MALE' as const,
      age: 42,
      city: 'Tlemcen',
      country: 'Algeria',
      interests: ['environment', 'community']
    },
    {
      email: 'association2@oxyjeunes.com',
      password: hashedPassword,
      name: 'Samira Benali',
      role: 'associationOwner' as const,
      isActive: true,
      gender: 'FEMALE' as const,
      age: 38,
      city: 'Constantine',
      country: 'Algeria',
      interests: ['education', 'youth']
    },
    {
      email: 'association3@oxyjeunes.com',
      password: hashedPassword,
      name: 'Karim Ait Ahmed',
      role: 'associationOwner' as const,
      isActive: true,
      gender: 'MALE' as const,
      age: 45,
      city: 'Annaba',
      country: 'Algeria',
      interests: ['health', 'social_services']
    },

    // Volunteers
    {
      email: 'volunteer1@oxyjeunes.com',
      password: hashedPassword,
      name: 'Imene Zerrouki',
      role: 'volunteer' as const,
      isActive: true,
      gender: 'FEMALE' as const,
      age: 22,
      city: 'Bejaia',
      country: 'Algeria',
      interests: ['environment', 'animals']
    },
    {
      email: 'volunteer2@oxyjeunes.com',
      password: hashedPassword,
      name: 'Walid Meddah',
      role: 'volunteer' as const,
      isActive: true,
      gender: 'MALE' as const,
      age: 25,
      city: 'Blida',
      country: 'Algeria',
      interests: ['education', 'technology']
    },
    {
      email: 'volunteer3@oxyjeunes.com',
      password: hashedPassword,
      name: 'Amina Khelifi',
      role: 'volunteer' as const,
      isActive: true,
      gender: 'FEMALE' as const,
      age: 20,
      city: 'Mascara',
      country: 'Algeria',
      interests: ['health', 'community']
    },
    {
      email: 'volunteer4@oxyjeunes.com',
      password: hashedPassword,
      name: 'Rachid Boudiaf',
      role: 'volunteer' as const,
      isActive: true,
      gender: 'MALE' as const,
      age: 27,
      city: 'Setif',
      country: 'Algeria',
      interests: ['social_justice', 'youth']
    },
    {
      email: 'volunteer5@oxyjeunes.com',
      password: hashedPassword,
      name: 'Lina Amrani',
      role: 'volunteer' as const,
      isActive: true,
      gender: 'FEMALE' as const,
      age: 24,
      city: 'Mostaganem',
      country: 'Algeria',
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