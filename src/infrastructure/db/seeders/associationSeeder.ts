import { db } from '../sequelize';

export const seedAssociations = async (users: any[]) => {
  // Get association owners (users with role 'associationOwner')
  const associationOwners = users.filter(user => user.role === 'associationOwner');
  
  const associations = [
    {
      name: 'Green Earth Initiative',
      description: 'Dedicated to environmental conservation and sustainability projects across France.',
      intagram_url: 'https://instagram.com/greenearth_fr',
      facebook_url: 'https://facebook.com/greenearthfrance',
      twitter_url: 'https://twitter.com/greenearth_fr',
      owner_id: associationOwners[0]?.id
    },
    {
      name: 'Youth Education Foundation',
      description: 'Providing educational opportunities and mentorship programs for young people.',
      intagram_url: 'https://instagram.com/youthedu_fr',
      facebook_url: 'https://facebook.com/youthedufrance',
      twitter_url: 'https://twitter.com/youthedu_fr',
      owner_id: associationOwners[1]?.id
    },
    {
      name: 'Community Health Alliance',
      description: 'Promoting health awareness and providing healthcare services to communities.',
      intagram_url: 'https://instagram.com/communityhealth_fr',
      facebook_url: 'https://facebook.com/communityhealthfrance',
      twitter_url: 'https://twitter.com/communityhealth_fr',
      owner_id: associationOwners[2]?.id
    },
    {
      name: 'Animal Rescue Network',
      description: 'Rescuing and caring for abandoned animals across France.',
      intagram_url: 'https://instagram.com/animalrescue_fr',
      facebook_url: 'https://facebook.com/animalrescuefrance',
      twitter_url: 'https://twitter.com/animalrescue_fr',
      owner_id: associationOwners[0]?.id
    },
    {
      name: 'Social Justice Collective',
      description: 'Working towards equality and justice for all members of society.',
      intagram_url: 'https://instagram.com/socialjustice_fr',
      facebook_url: 'https://facebook.com/socialjusticefrance',
      twitter_url: 'https://twitter.com/socialjustice_fr',
      owner_id: associationOwners[1]?.id
    },
    {
      name: 'Tech for Good',
      description: 'Using technology to solve social problems and improve lives.',
      intagram_url: 'https://instagram.com/techforgood_fr',
      facebook_url: 'https://facebook.com/techforgoodfrance',
      twitter_url: 'https://twitter.com/techforgood_fr',
      owner_id: associationOwners[2]?.id
    },
    {
      name: 'Elderly Care Foundation',
      description: 'Providing care and companionship for elderly citizens.',
      intagram_url: 'https://instagram.com/elderlycare_fr',
      facebook_url: 'https://facebook.com/elderlycarefrance',
      twitter_url: 'https://twitter.com/elderlycare_fr',
      owner_id: associationOwners[0]?.id
    },
    {
      name: 'Disaster Relief Team',
      description: 'Providing emergency assistance and relief during natural disasters.',
      intagram_url: 'https://instagram.com/disasterrelief_fr',
      facebook_url: 'https://facebook.com/disasterrelieffrance',
      twitter_url: 'https://twitter.com/disasterrelief_fr',
      owner_id: associationOwners[1]?.id
    },
    {
      name: 'Cultural Heritage Society',
      description: 'Preserving and promoting French cultural heritage and traditions.',
      intagram_url: 'https://instagram.com/culturalheritage_fr',
      facebook_url: 'https://facebook.com/culturalheritagefrance',
      twitter_url: 'https://twitter.com/culturalheritage_fr',
      owner_id: associationOwners[2]?.id
    },
    {
      name: 'Sports for All',
      description: 'Making sports accessible to everyone, regardless of background or ability.',
      intagram_url: 'https://instagram.com/sportsforall_fr',
      facebook_url: 'https://facebook.com/sportsforallfrance',
      twitter_url: 'https://twitter.com/sportsforall_fr',
      owner_id: associationOwners[0]?.id
    }
  ];

  const createdAssociations = [];
  for (const associationData of associations) {
    const association = await db.association.create(associationData);
    createdAssociations.push(association.get());
  }

  return createdAssociations;
}; 