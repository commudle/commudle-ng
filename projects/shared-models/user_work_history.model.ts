export interface IUserWorkHistory {
  id: number;
  job_title: string;
  company: string;
  location: string;
  start_date: Date;
  end_date: Date;
  is_working: boolean;
  description: string;
}
