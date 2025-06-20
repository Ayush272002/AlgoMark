import { Problem } from './Problem';

export interface CompanyProblem {
  id: number;
  name: string;
  problems: Problem[];
}
