import request from 'supertest';
import {app,server} from '../server.js';
import { disconnectDB } from '../config/db.js';

describe('GET /', () => {
  it('returns 200 OK', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('OK');
  });
});

// cleanup after all tests
afterAll(async () => {
  await disconnectDB();   // close mongoose
  if (server) server.close();        // close express server
});
