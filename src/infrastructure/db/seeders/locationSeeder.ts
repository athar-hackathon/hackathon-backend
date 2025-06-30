import { db } from '../sequelize';

export const seedLocations = async () => {
  const locations = [
    {
      longitude: 2.3522,
      latitude: 48.8566,
      country: 'France',
      state: 'Île-de-France',
      city: 'Paris',
      address: '1 Place de la Concorde, 75001 Paris'
    },
    {
      longitude: 4.8357,
      latitude: 45.7640,
      country: 'France',
      state: 'Auvergne-Rhône-Alpes',
      city: 'Lyon',
      address: 'Place Bellecour, 69002 Lyon'
    },
    {
      longitude: 5.3698,
      latitude: 43.2965,
      country: 'France',
      state: 'Provence-Alpes-Côte d\'Azur',
      city: 'Marseille',
      address: 'Vieux Port, 13001 Marseille'
    },
    {
      longitude: 1.4442,
      latitude: 43.6047,
      country: 'France',
      state: 'Occitanie',
      city: 'Toulouse',
      address: 'Place du Capitole, 31000 Toulouse'
    },
    {
      longitude: 7.2619,
      latitude: 43.7102,
      country: 'France',
      state: 'Provence-Alpes-Côte d\'Azur',
      city: 'Nice',
      address: 'Promenade des Anglais, 06000 Nice'
    },
    {
      longitude: -0.5792,
      latitude: 44.8378,
      country: 'France',
      state: 'Nouvelle-Aquitaine',
      city: 'Bordeaux',
      address: 'Place de la Bourse, 33000 Bordeaux'
    },
    {
      longitude: 3.0573,
      latitude: 50.6292,
      country: 'France',
      state: 'Hauts-de-France',
      city: 'Lille',
      address: 'Grand Place, 59000 Lille'
    },
    {
      longitude: 5.0415,
      latitude: 47.3220,
      country: 'France',
      state: 'Bourgogne-Franche-Comté',
      city: 'Dijon',
      address: 'Place de la Libération, 21000 Dijon'
    },
    {
      longitude: 6.1432,
      latitude: 46.2044,
      country: 'France',
      state: 'Auvergne-Rhône-Alpes',
      city: 'Annecy',
      address: 'Lac d\'Annecy, 74000 Annecy'
    },
    {
      longitude: -1.5536,
      latitude: 47.2184,
      country: 'France',
      state: 'Pays de la Loire',
      city: 'Nantes',
      address: 'Place du Commerce, 44000 Nantes'
    }
  ];

  const createdLocations = [];
  for (const locationData of locations) {
    const location = await db.location.create(locationData);
    createdLocations.push(location.get());
  }

  return createdLocations;
}; 