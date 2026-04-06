import { cache } from 'react';

export interface VillageStats {
  population: number;
  populationGrowth: string;
  area: number;
  areaType: string;
  birthRate: number;
  birthRateTrend: string;
  budget: {
    investments: number;
    salaries: number;
    others: number;
  };
  demographics: {
    activePopulation: number;
  };
}

export const getVillageStats = cache(async function(): Promise<VillageStats> {
  // Simulăm un fetch care ar putea veni dintr-un API extern în viitor
  // Momentan returnăm datele statice dar centralizate, pregătite pentru caching
  return {
    population: 7913,
    populationGrowth: '+12%',
    area: 42.35,
    areaType: 'Regiune Metr.',
    birthRate: 11.7,
    birthRateTrend: '> Media Jud.',
    budget: {
      investments: 45,
      salaries: 30,
      others: 25
    },
    demographics: {
      activePopulation: 70.6
    }
  };
});
