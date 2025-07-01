import { db } from '../sequelize';

export const seedDestinations = async (locations: any[]) => {
  const destinations = [
    {
      name: 'Centre Communautaire d’Alger',
      description: 'Un centre communautaire dynamique au cœur d’Alger offrant diverses opportunités de bénévolat.',
      location_id: locations[0]?.id
    },
    {
      name: 'Maison des Jeunes Oran',
      description: 'Centre moderne à Oran axé sur l’éducation et le développement des compétences.',
      location_id: locations[1]?.id
    },
    {
      name: 'Site de Nettoyage de Plage Annaba',
      description: 'Zone côtière à Annaba où les bénévoles œuvrent pour la propreté des plages.',
      location_id: locations[2]?.id
    },
    {
      name: 'Campus Universitaire Constantine',
      description: 'Campus universitaire à Constantine où se déroulent des programmes éducatifs.',
      location_id: locations[3]?.id
    },
    {
      name: 'Maison de Retraite Tlemcen',
      description: 'Établissement à Tlemcen offrant des services et de la compagnie aux personnes âgées.',
      location_id: locations[4]?.id
    },
    {
      name: 'Refuge Animalier de Blida',
      description: 'Refuge à Blida pour animaux abandonnés et secourus.',
      location_id: locations[5]?.id
    },
    {
      name: 'Jardin Communautaire de Bejaia',
      description: 'Jardin communautaire à Bejaia promouvant l’agriculture durable.',
      location_id: locations[6]?.id
    },
    {
      name: 'Clinique de Santé Mascara',
      description: 'Clinique à Mascara offrant des services médicaux et de l’éducation à la santé.',
      location_id: locations[7]?.id
    },
    {
      name: 'Réserve Naturelle Mostaganem',
      description: 'Réserve à Mostaganem axée sur la conservation de l’environnement.',
      location_id: locations[8]?.id
    },
    {
      name: 'Pôle Technologique de Setif',
      description: 'Pôle technologique à Setif offrant des programmes d’éducation numérique.',
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