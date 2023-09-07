import { IDataFormEntity } from './data_form_entity.model';

export interface ISurvey {
  id: number;
  name: string;
  status: string;
  multi_response: boolean;
  total_responses: number;
  data_form_entity: IDataFormEntity;
}

export enum ESurveyStatus {
  open = 'open',
  closed = 'closed',
}
