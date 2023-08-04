export interface IPaymentDetail {
  id: number;
  parent_type: string;
  parent_id: number;
  bank_ac_id: string;
  price: number;
  currency: number;
  updated_at: Date;
}
