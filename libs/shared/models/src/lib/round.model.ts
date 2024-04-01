export interface IRound {
  id: number;
  name: string;
  slug: string;
  date: string;
  description: string;
  parent_type: string;
  parent_id: number;
  user_id: number;
  order: number;
}
