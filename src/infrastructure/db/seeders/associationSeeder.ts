import { db } from '../sequelize';

export const seedAssociations = async (users: any[]) => {
  // Get association owners (users with role 'associationOwner')
  const associationOwners = users.filter(user => user.role === 'associationOwner');
  
  const associations = [
    {
      name: 'Bniadm',
      description: 'Association Bniadm pour le développement local et la solidarité à Tlemcen.',
      intagram_url: 'https://instagram.com/bniadm_dz',
      facebook_url: 'https://facebook.com/bniadm',
      twitter_url: 'https://twitter.com/bniadm',
      owner_id: associationOwners[0]?.id
    },
    {
      name: 'Jeunesse Algérienne',
      description: 'Opportunités éducatives et programmes de mentorat pour la jeunesse algérienne.',
      intagram_url: 'https://instagram.com/jeunesse_dz',
      facebook_url: 'https://facebook.com/jeunessealgerie',
      twitter_url: 'https://twitter.com/jeunesse_dz',
      owner_id: associationOwners[1]?.id
    },
    {
      name: 'Santé Communautaire Algérie',
      description: 'Promotion de la santé et services médicaux pour les communautés locales.',
      intagram_url: 'https://instagram.com/sante_dz',
      facebook_url: 'https://facebook.com/santealgerie',
      twitter_url: 'https://twitter.com/sante_dz',
      owner_id: associationOwners[2]?.id
    },
    {
      name: 'Réseau de Sauvetage Animal',
      description: 'Sauvetage et soins des animaux abandonnés en Algérie.',
      intagram_url: 'https://instagram.com/animaux_dz',
      facebook_url: 'https://facebook.com/animauxalgerie',
      twitter_url: 'https://twitter.com/animaux_dz',
      owner_id: associationOwners[0]?.id
    },
    {
      name: 'Justice Sociale Algérie',
      description: 'Pour l’égalité et la justice sociale en Algérie.',
      intagram_url: 'https://instagram.com/justice_dz',
      facebook_url: 'https://facebook.com/justicesocialealgerie',
      twitter_url: 'https://twitter.com/justice_dz',
      owner_id: associationOwners[1]?.id
    },
    {
      name: 'Tech pour Tous',
      description: 'Utiliser la technologie pour résoudre les problèmes sociaux en Algérie.',
      intagram_url: 'https://instagram.com/tech_dz',
      facebook_url: 'https://facebook.com/techpourtous',
      twitter_url: 'https://twitter.com/tech_dz',
      owner_id: associationOwners[2]?.id
    },
    {
      name: 'Fondation Aînés',
      description: 'Soutien et accompagnement des personnes âgées en Algérie.',
      intagram_url: 'https://instagram.com/aines_dz',
      facebook_url: 'https://facebook.com/ainesalgerie',
      twitter_url: 'https://twitter.com/aines_dz',
      owner_id: associationOwners[0]?.id
    },
    {
      name: 'Équipe Secours Algérie',
      description: 'Assistance d’urgence et secours lors de catastrophes naturelles.',
      intagram_url: 'https://instagram.com/secours_dz',
      facebook_url: 'https://facebook.com/secoursalgerie',
      twitter_url: 'https://twitter.com/secours_dz',
      owner_id: associationOwners[1]?.id
    },
    {
      name: 'Patrimoine Culturel Algérien',
      description: 'Préservation et promotion du patrimoine culturel algérien.',
      intagram_url: 'https://instagram.com/patrimoine_dz',
      facebook_url: 'https://facebook.com/patrimoinealgerie',
      twitter_url: 'https://twitter.com/patrimoine_dz',
      owner_id: associationOwners[2]?.id
    },
    {
      name: 'Sports pour Tous',
      description: 'Rendre le sport accessible à tous en Algérie.',
      intagram_url: 'https://instagram.com/sports_dz',
      facebook_url: 'https://facebook.com/sportsalgerie',
      twitter_url: 'https://twitter.com/sports_dz',
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