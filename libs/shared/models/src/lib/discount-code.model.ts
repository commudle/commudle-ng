import { IUser } from './user.model';

export interface IDiscountCode {
  id: number;
  code: string;
  discount_type: string;
  discount_value: number;
  event_data_form_entity_group_ids: [];
  expires_at: Date;
  max_limit: number;
  user: IUser;
}
