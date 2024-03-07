export interface IFaq {
  id: number;
  question: string;
  answer: string;
  parent_type: string;
  parent_id: number;
  user_id: number;
}
