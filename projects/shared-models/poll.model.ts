import { IQuestion } from './question.model';
import { IDataFormEntity } from './data_form_entity.model';

export interface IPoll {
  id: number;
  created_at: Date;
  pollable_type: string;
  pollable_id: number;
  questions: IQuestion[];
  data_form_entity: IDataFormEntity;
  status: EPollStatuses;
  total_responses: number;
  already_filled: boolean;
}


export enum EPollStatuses {
  DRAFT = 'draft',
  OPEN = 'open',
  CLOSED = 'closed'

}
