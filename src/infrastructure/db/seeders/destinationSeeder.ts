import { db } from '../sequelize';

export const seedDestinations = async (locations: any[]) => {
  const destinations = [
    {
      name: 'Paris Community Center',
      description: 'A vibrant community center in the heart of Paris offering various volunteer opportunities.',
      location_id: locations[0]?.id
    },
    {
      name: 'Lyon Youth Center',
      description: 'Modern youth center in Lyon focused on education and skill development.',
      location_id: locations[1]?.id
    },
    {
      name: 'Marseille Beach Cleanup Site',
      description: 'Coastal area in Marseille where environmental volunteers work to keep beaches clean.',
      location_id: locations[2]?.id
    },
    {
      name: 'Toulouse University Campus',
      description: 'University campus in Toulouse where educational programs and mentoring take place.',
      location_id: locations[3]?.id
    },
    {
      name: 'Nice Elderly Care Facility',
      description: 'Care facility in Nice providing services and companionship to elderly residents.',
      location_id: locations[4]?.id
    },
    {
      name: 'Bordeaux Animal Shelter',
      description: 'Animal shelter in Bordeaux caring for abandoned and rescued animals.',
      location_id: locations[5]?.id
    },
    {
      name: 'Lille Community Garden',
      description: 'Community garden in Lille promoting sustainable agriculture and green spaces.',
      location_id: locations[6]?.id
    },
    {
      name: 'Dijon Health Clinic',
      description: 'Health clinic in Dijon providing medical services and health education.',
      location_id: locations[7]?.id
    },
    {
      name: 'Annecy Nature Reserve',
      description: 'Nature reserve in Annecy focused on environmental conservation and wildlife protection.',
      location_id: locations[8]?.id
    },
    {
      name: 'Nantes Technology Hub',
      description: 'Technology hub in Nantes offering digital literacy and tech education programs.',
      location_id: locations[9]?.id
    }
  ];

  const createdDestinations = [];
  for (const destinationData of destinations) {
    const destination = await db.destination.create(destinationData);
    createdDestinations.push(destination.get());
  }

  return createdDestinations;
}; 