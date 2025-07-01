import { db } from '../sequelize';

export const seedLocations = async () => {
  const locations = [
    {
      longitude: 3.0588,
      latitude: 36.7538,
      country: 'Algeria',
      state: 'Algiers Province',
      city: 'Algiers',
      address: 'Place des Martyrs, Algiers'
    },
    {
      longitude: -0.6337,
      latitude: 35.6971,
      country: 'Algeria',
      state: 'Oran Province',
      city: 'Oran',
      address: 'Boulevard de l’ALN, Oran'
    },
    {
      longitude: 6.6147,
      latitude: 36.9040,
      country: 'Algeria',
      state: 'Annaba Province',
      city: 'Annaba',
      address: 'Cours de la Révolution, Annaba'
    },
    {
      longitude: 7.7667,
      latitude: 36.3650,
      country: 'Algeria',
      state: 'Constantine Province',
      city: 'Constantine',
      address: 'Pont Sidi M’Cid, Constantine'
    },
    {
      longitude: -1.3167,
      latitude: 35.0167,
      country: 'Algeria',
      state: 'Tlemcen Province',
      city: 'Tlemcen',
      address: 'Place Emir Abdelkader, Tlemcen'
    },
    {
      longitude: 2.8787,
      latitude: 36.4556,
      country: 'Algeria',
      state: 'Blida Province',
      city: 'Blida',
      address: 'Rue de la Gare, Blida'
    },
    {
      longitude: 5.0637,
      latitude: 36.7509,
      country: 'Algeria',
      state: 'Bejaia Province',
      city: 'Bejaia',
      address: 'Avenue de l’Indépendance, Bejaia'
    },
    {
      longitude: 1.3317,
      latitude: 35.6971,
      country: 'Algeria',
      state: 'Mascara Province',
      city: 'Mascara',
      address: 'Place 1er Novembre, Mascara'
    },
    {
      longitude: 0.1403,
      latitude: 35.5556,
      country: 'Algeria',
      state: 'Mostaganem Province',
      city: 'Mostaganem',
      address: 'Place de l’Indépendance, Mostaganem'
    },
    {
      longitude: 4.5418,
      latitude: 35.5556,
      country: 'Algeria',
      state: 'Setif Province',
      city: 'Setif',
      address: 'Avenue de l’ALN, Setif'
    }
  ];

  const createdLocations = [];
  for (const locationData of locations) {
    const location = await db.location.create(locationData);
    createdLocations.push(location.get());
  }

  return createdLocations;
}; 