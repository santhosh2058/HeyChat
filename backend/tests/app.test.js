import request from 'supertest';
import app from '../server.js';

describe('GET /', () => {
  it('returns 200 OK', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('OK');
  });
});
