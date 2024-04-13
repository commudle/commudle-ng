export interface IRazorpayPayment {
  id: number;
  rzp_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
  payment_response: [];
  created_at: string;
  updated_at: string;
}
