const request = require('supertest');
const app = require('./app');

describe('To-Do List API Tests', () => {
  
  it('GET /todos should return an empty array initially', async () => {
    const res = await request(app).get('/todos');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /todos should create a new task', async () => {
    const res = await request(app).post('/todos').send({ task: 'Learn Jest' });
    expect(res.statusCode).toBe(201);
    expect(res.body.task).toBe('Learn Jest');
  });

  it('POST /todos without a task should return an error', async () => {
    const res = await request(app).post('/todos').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Task is required');
  });

});