import { describe, it, expect } from 'vitest';
import { generateBatchRoute } from '../src/routing';

describe('Route Optimization Engine', () => {
  it('should generate sequence with Pickups first, then Deliveries', () => {
    const orders = [
      { id: 'A', shopId: 'S1', customerId: 'C1' },
      { id: 'B', shopId: 'S2', customerId: 'C2' }
    ];

    const route = generateBatchRoute(orders);
    
    // Expected Output should have 4 stops representing Pickups then Drops
    expect(route.length).toBe(4);
    expect(route[0].action).toBe('PICKUP');
    expect(route[1].action).toBe('PICKUP');
    expect(route[2].action).toBe('DROP');
    expect(route[3].action).toBe('DROP');
  });

  it('should return empty route for empty order batch', () => {
    expect(generateBatchRoute([])).toEqual([]);
    expect(generateBatchRoute(null)).toEqual([]);
  });
});
