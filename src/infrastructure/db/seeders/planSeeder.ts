import { db } from '../sequelize';

export const seedPlans = async (associations: any[], categories: any[], destinations: any[]) => {
  const plans = [
    {
      name: "Nettoyage de Plage Annaba",
      description: "Participez à une journée de nettoyage de plage à Annaba pour protéger la faune marine.",
      startDate: new Date('2024-03-15'),
      endDate: new Date('2024-03-15'),
      volunteerNumber: 20,
      appliedVolunteerNumber: 0,
      isActive: true,
      isPaid: false,
      totalFees: '0',
      destinationId: destinations[2]?.id, // Annaba
      category_id: categories[0]?.id, // Environment
      associationId: associations[0]?.id // Bniadm
    },
    {
      name: "Mentorat Jeunesse Oran",
      description: "Mentorez des jeunes à Oran dans les matières scolaires et le développement personnel.",
      startDate: new Date('2024-03-20'),
      endDate: new Date('2024-06-20'),
      volunteerNumber: 15,
      appliedVolunteerNumber: 0,
      isActive: true,
      isPaid: false,
      totalFees: '0',
      destinationId: destinations[1]?.id, // Oran
      category_id: categories[1]?.id, // Education
      associationId: associations[1]?.id // Jeunesse Algérienne
    },
    {
      name: "Campagne de Sensibilisation Santé",
      description: "Aidez à sensibiliser sur la santé préventive dans les communautés locales.",
      startDate: new Date('2024-04-01'),
      endDate: new Date('2024-04-30'),
      volunteerNumber: 25,
      appliedVolunteerNumber: 0,
      isActive: true,
      isPaid: false,
      totalFees: '0',
      destinationId: destinations[7]?.id, // Mascara
      category_id: categories[2]?.id, // Health
      associationId: associations[2]?.id // Santé Communautaire Algérie
    },
    {
      name: "Soutien Refuge Animalier",
      description: "Aidez à soigner les animaux secourus et à gérer le refuge de Blida.",
      startDate: new Date('2024-03-25'),
      endDate: new Date('2024-12-25'),
      volunteerNumber: 10,
      appliedVolunteerNumber: 0,
      isActive: true,
      isPaid: false,
      totalFees: '0',
      destinationId: destinations[5]?.id, // Blida
      category_id: categories[4]?.id, // Animal Welfare
      associationId: associations[3]?.id // Réseau de Sauvetage Animal
    },
    {
      name: "Entretien Jardin Communautaire",
      description: "Aidez à entretenir le jardin communautaire de Bejaia et à enseigner des pratiques durables.",
      startDate: new Date('2024-04-10'),
      endDate: new Date('2024-10-10'),
      volunteerNumber: 12,
      appliedVolunteerNumber: 0,
      isActive: true,
      isPaid: false,
      totalFees: '0',
      destinationId: destinations[6]?.id, // Bejaia
      category_id: categories[0]?.id, // Environment
      associationId: associations[0]?.id // Bniadm
    },
    {
      name: "Programme Compagnonnage Aînés",
      description: "Offrez de la compagnie et du soutien aux personnes âgées à Tlemcen.",
      startDate: new Date('2024-03-30'),
      endDate: new Date('2024-12-30'),
      volunteerNumber: 8,
      appliedVolunteerNumber: 0,
      isActive: true,
      isPaid: false,
      totalFees: '0',
      destinationId: destinations[4]?.id, // Tlemcen
      category_id: categories[8]?.id, // Elderly Care
      associationId: associations[6]?.id // Fondation Aînés
    },
    {
      name: "Atelier de Littératie Numérique",
      description: "Enseignez les bases de l'informatique et la littératie numérique à Setif.",
      startDate: new Date('2024-04-15'),
      endDate: new Date('2024-05-15'),
      volunteerNumber: 18,
      appliedVolunteerNumber: 0,
      isActive: true,
      isPaid: false,
      totalFees: '0',
      destinationId: destinations[9]?.id, // Setif
      category_id: categories[6]?.id, // Technology
      associationId: associations[5]?.id // Tech pour Tous
    },
    {
      name: "Projet Conservation Naturelle",
      description: "Participez à la surveillance de la faune et à la restauration des habitats à Mostaganem.",
      startDate: new Date('2024-05-01'),
      endDate: new Date('2024-08-01'),
      volunteerNumber: 15,
      appliedVolunteerNumber: 0,
      isActive: true,
      isPaid: false,
      totalFees: '0',
      destinationId: destinations[8]?.id, // Mostaganem
      category_id: categories[0]?.id, // Environment
      associationId: associations[0]?.id // Bniadm
    },
    {
      name: "Sports pour Jeunes Handicapés",
      description: "Aidez à organiser et soutenir des activités sportives pour les jeunes handicapés à Alger.",
      startDate: new Date('2024-04-20'),
      endDate: new Date('2024-07-20'),
      volunteerNumber: 20,
      appliedVolunteerNumber: 0,
      isActive: true,
      isPaid: false,
      totalFees: '0',
      destinationId: destinations[0]?.id, // Algiers
      category_id: categories[7]?.id, // Youth Development
      associationId: associations[9]?.id // Sports pour Tous
    },
    {
      name: "Formation Réponse d'Urgence",
      description: "Apprenez et enseignez les compétences de réponse d'urgence à Constantine.",
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-06-30'),
      volunteerNumber: 30,
      appliedVolunteerNumber: 0,
      isActive: true,
      isPaid: false,
      totalFees: '0',
      destinationId: destinations[3]?.id, // Constantine
      category_id: categories[9]?.id, // Disaster Relief
      associationId: associations[7]?.id // Équipe Secours Algérie
    }
  ];

  const createdPlans = [];
  for (const planData of plans) {
    const plan = await db.plan.create(planData);
    createdPlans.push(plan.get());
  }

  return createdPlans;
}; 