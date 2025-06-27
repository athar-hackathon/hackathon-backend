import request from 'supertest';
import app from '../src/app';

describe('POST /users', () => {
  it('should create a user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ email: 'test@example.com', password: '123456' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });
});