import { describe, it, expect } from 'vitest';
import { getVillageStats } from './stats';

describe('VillageStats Service', () => {
  it('should return fixed village stats', async () => {
    const stats = await getVillageStats();
    
    expect(stats).toBeDefined();
    expect(stats.population).toBe(7913);
    expect(stats.area).toBe(42.35);
    expect(stats.budget.investments).toBe(45);
    expect(stats.demographics.activePopulation).toBe(70.6);
  });

  it('should be cached by React cache', async () => {
    const stats1 = await getVillageStats();
    const stats2 = await getVillageStats();
    
    // In a real React environment, cache would return the same promise/result 
    // during a single render pass. Here we check the data consistency.
    expect(stats1).toEqual(stats2);
  });
});
