export interface IRazorpayOrder {
  id: number;
  rzp_order_id: string;
  amount: string;
  currency: string;
  status: string;
  order_response: [];
  created_at: string;
  updated_at: string;
}
