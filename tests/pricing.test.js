import { describe, it, expect } from 'vitest';
import { calculateOrderPricing } from '../src/pricing';

describe('Zone-Based Pricing Engine', () => {
  it('should apply Short Distance (<= 2km) pricing rules', () => {
    // Distance 1.5km, Order Value ₹130 (>= Min 120) -> should pass
    const result = calculateOrderPricing(1.5, 130, new Date('2026-04-16T14:00:00Z'));
    expect(result.isValid).toBe(true);
    expect(result.deliveryCharge).toBe(10); // ₹10-15 modeled as 10
    
    // Low value order should fail min order
    const resultFail = calculateOrderPricing(1.5, 100, new Date('2026-04-16T14:00:00Z'));
    expect(resultFail.isValid).toBe(false);
    expect(resultFail.error).toContain('Minimum order');
  });

  it('should apply Medium Distance (2-5km) pricing rules', () => {
    const result = calculateOrderPricing(4, 200, new Date('2026-04-16T14:00:00Z'));
    expect(result.isValid).toBe(true);
    expect(result.deliveryCharge).toBe(25);
  });

  it('should apply Long Distance (5-10km) pricing rules', () => {
    const result = calculateOrderPricing(8, 300, new Date('2026-04-16T14:00:00Z'));
    expect(result.isValid).toBe(true);
    expect(result.deliveryCharge).toBe(40);
  });

  it('should reject Out of Range (> 10km)', () => {
    const result = calculateOrderPricing(12, 500, new Date('2026-04-16T14:00:00Z'));
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('10 km range');
  });

  it('should apply Night Surge charges dynamically', () => {
    // 9:30 PM (21:30) => Surge = +₹15
    const t930 = new Date('2026-04-16T21:30:00+05:30');
    expect(calculateOrderPricing(1.5, 200, t930).surgeCharge).toBe(15);
    
    // 10:30 PM (22:30) => Surge = +₹20
    const t1030 = new Date('2026-04-16T22:30:00+05:30');
    expect(calculateOrderPricing(1.5, 200, t1030).surgeCharge).toBe(20);

    // 11:30 PM (23:30) => Surge = +₹25
    const t1130 = new Date('2026-04-16T23:30:00+05:30');
    expect(calculateOrderPricing(1.5, 200, t1130).surgeCharge).toBe(25);
  });
});
