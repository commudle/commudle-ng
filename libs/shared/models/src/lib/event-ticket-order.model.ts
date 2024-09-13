import { IDiscountCode } from './discount-code.model';
import { IUser } from './user.model';

export interface IEventTicketOrder {
  id: number;
  uuid: string;
  amount: number;
  currency: string;
  status: string;
  total_amount: number;
  payments: Payment[];
  eto_users: IUser[];
  discount_amount: number;
  tax_amount: number;
  user_id: string;
  discount_code: IDiscountCode;
  application_fee_amount: number;
  payment_gateway_fee: number;
  user: IUser;
  bank_ac_type: string;
  transfer_id: string;
}

export interface Payment {
  amount: number;
  payment_type: string;
  created_at: string;
  id: number;
}
