export interface INote {
  id: number;
  text: string;
  parent_type: string;
  parent_id: number;
  user_id: number;
}
