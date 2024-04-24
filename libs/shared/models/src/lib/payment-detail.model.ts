export interface IPaymentDetail {
  id: number;
  parent_type: string;
  parent_id: number;
  price: number;
  bank_ac_id: string;
  currency: string;
  updated_at: Date;
  has_taxes: boolean;
  tax_name: string;
  tax_percentage: string;
  seller_tax_details: string;
  country: string;
  seller_name: string;
  seller_address: string;
  bank_ac_type: string;
}

export enum EPaymentBanks {
  STRIPE = 'stripe',
  RAZORPAY = 'razorpay',
}
