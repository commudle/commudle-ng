import { IQuestion } from './question.model'

export interface IDataForm {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  slug: string;
  questions_count: number;
  responses_count: number;
  user: string;
  parent_type: string;
  parent_id: string;
  questions: IQuestion[];
}



export enum EDataFormParentTypes {
  community = 'Kommunity',
  adminSurvey = 'AdminSurvey'
}
