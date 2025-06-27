import request from 'supertest';
import app from '../src/app';

describe('POST /auth/login', () => {
  it('should return 401 for invalid credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'fail@test.com', password: 'wrong' });
    expect(res.statusCode).toEqual(401);
  });
});