import { db } from '../sequelize';

export const seedCategories = async () => {
  const categories = [
    {
      name: 'Environment'
    },
    {
      name: 'Education'
    },
    {
      name: 'Health'
    },
    {
      name: 'Community Service'
    },
    {
      name: 'Animal Welfare'
    },
    {
      name: 'Social Justice'
    },
    {
      name: 'Technology'
    },
    {
      name: 'Youth Development'
    },
    {
      name: 'Elderly Care'
    },
    {
      name: 'Disaster Relief'
    }
  ];

  const createdCategories = [];
  for (const categoryData of categories) {
    const category = await db.category.create(categoryData);
    createdCategories.push(category.get());
  }

  return createdCategories;
}; 