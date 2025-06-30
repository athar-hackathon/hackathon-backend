import { db } from '../sequelize';

const sampleComments = [
  'Great experience, would volunteer again!',
  'Very well organized and impactful.',
  'Loved the team and the mission.',
  'A rewarding and educational experience.',
  'The association staff were very supportive.',
  'I learned a lot and made new friends.',
  'Highly recommend volunteering here!',
  'The project made a real difference.',
  'Facilities could be improved, but overall good.',
  'Looking forward to the next event!'
];

function getRandomFloat(min: number, max: number, decimals = 1) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
}

export const seedReviews = async (users: any[], associations: any[]) => {
  // Get volunteers
  const volunteers = users.filter(user => user.role === 'volunteer');
  const reviews = [];
  for (let i = 0; i < 10; i++) {
    const volunteer = volunteers[i % volunteers.length];
    const association = associations[i % associations.length];
    const review = await db.review.create({
      volunteerId: volunteer.id,
      associationId: association.id,
      rating: getRandomFloat(3.5, 5.0),
      comment: sampleComments[i % sampleComments.length]
    });
    reviews.push(review.get());
  }
  return reviews;
}; 