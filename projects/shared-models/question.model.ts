import { IQuestionChoice } from './question_choice.model';

export interface IQuestion {
  id: number;
  question_type_id: number;
  data_form_id: number;
  title: string;
  description: string;
  required: boolean;
  disabled: boolean;
  question_choices: IQuestionChoice[];

}
