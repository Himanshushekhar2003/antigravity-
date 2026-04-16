import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app';

describe('Geo-Location API Endpoints', () => {
  it('should calculate Haversine distance and return valid delivery pricing', async () => {
    // New Delhi Coordinates (Connaught Place to India Gate ~2.1 km straight line)
    // CP: 28.6304, 77.2177, India Gate: 28.6129, 77.2295
    
    const response = await request(app)
      .post('/api/pricing')
      .send({
        userLat: 28.6304,
        userLng: 77.2177,
        shopLat: 28.6129,
        shopLng: 77.2295,
        orderTotal: 250
      });

    expect(response.status).toBe(200);
    // 2.1km is > 2 and <= 5, so Medium Distance logic should apply
    // Medium distance delivery charge should be 25
    expect(response.body.distance_km).toBeCloseTo(2.26, 1);
    expect(response.body.pricing.deliveryCharge).toBe(25);
  });

  it('should return Out of Range error if distance > 10km', async () => {
    // Delhi to Gurgaon (approx 30km)
    const response = await request(app)
      .post('/api/pricing')
      .send({
        userLat: 28.6139,
        userLng: 77.2090,
        shopLat: 28.4595,
        shopLng: 77.0266,
        orderTotal: 500
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain('outside 10 km range');
  });
});
