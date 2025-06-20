import { CompanyStats } from './CompanyStats';

export interface Company {
  id: number;
  name: string;
  _count: {
    problems: number;
  };
  stats: CompanyStats;
}
