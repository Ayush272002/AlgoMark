export interface Problem {
  id: number;
  leetcodeId: number;
  title: string;
  acceptance: string;
  difficulty: string;
  frequency: number;
  link: string;
  userStatus: Array<{ status: string }>;
}
