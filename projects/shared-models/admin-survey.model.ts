import { IDataFormEntity } from './data_form_entity.model';

export interface IAdminSurvey {
  id: number;
  name: string;
  status: string;
  multi_response: boolean;
  total_responses: number;
  data_form_entity: IDataFormEntity;
}
