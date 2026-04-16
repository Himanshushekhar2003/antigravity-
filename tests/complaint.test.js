import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../src/app';
import db from '../src/db';

describe('Complaint API & Fraud Engine', () => {

  beforeEach(async () => {
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run("DELETE FROM complaints");
        db.run("DELETE FROM orders");
        const fiveMinsAgo = new Date(Date.now() - 5 * 60000).toISOString();
        db.run(`INSERT INTO orders (id, status, delivered_at) VALUES ('123', 'DELIVERED', '${fiveMinsAgo}')`, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    });
  });

  it('should reject a complaint if order is not delivered', async () => {
    // Create an undelivered order
    await new Promise((resolve) => db.run("INSERT INTO orders (id, status) VALUES ('124', 'PENDING')", resolve));
    
    const response = await request(app)
      .post('/complaints')
      .send({
        order_id: '124',
        type: 'WRONG_ITEM',
        description: 'Wrong item',
        images: ['img1.jpg']
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain('Order must be DELIVERED');
  });

  it('should reject a complaint without picture proof', async () => {
    const response = await request(app)
      .post('/complaints')
      .send({
        order_id: '123',
        type: 'DAMAGED',
        description: 'It is crushed',
        images: []
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain('Minimum 1 image required');
  });

  it('should calculate proper Fraud Score and Auto-Approve if Low Risk', async () => {
    const response = await request(app)
      .post('/complaints')
      .send({
        order_id: '123',
        type: 'MISSING_ITEM',
        description: 'Missing 1 samosa',
        images: ['proof.jpg']
      });

    expect(response.status).toBe(201);
    expect(response.body.complaint.status).toBe('APPROVED');
    // Basic formula: freq*0.4 + no_image*0.3 + ...
    expect(response.body.fraud_score).toBeLessThan(30); 
  });
});
