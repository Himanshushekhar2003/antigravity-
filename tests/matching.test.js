import { describe, it, expect } from 'vitest';
import { findBestRider } from '../src/matching';

describe('Real-Time Matching System', () => {
  it('should filter out riders further than 3km', () => {
    const riders = [
      { id: '1', distance: 1.5, currentLoad: 1, delayRisk: 0.1 },
      { id: '2', distance: 3.5, currentLoad: 0, delayRisk: 0.0 }
    ];
    
    const result = findBestRider(riders);
    expect(result.id).toBe('1');
  });

  it('should evaluate the best score based on the formula', () => {
    // Formula: Score = (Distance * 0.5) + (Current Load * 0.3) + (Delay Risk * 0.2)
    // Rider 1 Score = (2 * 0.5) + (1 * 0.3) + (0 * 0.2) = 1.0 + 0.3 + 0 = 1.3
    // Rider 2 Score = (1 * 0.5) + (3 * 0.3) + (0 * 0.2) = 0.5 + 0.9 + 0 = 1.4
    // Rider 1 should win because lower score = better match

    const riders = [
      { id: '1', distance: 2, currentLoad: 1, delayRisk: 0 },
      { id: '2', distance: 1, currentLoad: 3, delayRisk: 0 }
    ];

    const result = findBestRider(riders);
    expect(result.id).toBe('1');
    expect(result.score).toBeCloseTo(1.3);
  });

  it('should return null if no riders are available within 3km', () => {
    const riders = [
      { id: '1', distance: 4, currentLoad: 0, delayRisk: 0 }
    ];
    expect(findBestRider(riders)).toBeNull();
  });
});
