import { IEventTicketOrder } from './event-ticket-order.model';
import { IRazorpayPayment } from './razorpay-payment.model';

export interface IRazorpayOrder {
  id: number;
  rzp_order_id: string;
  amount: string;
  currency: string;
  status: string;
  order_response: [];
  created_at: string;
  updated_at: string;
  razorpay_payment: IRazorpayPayment;
  orderable: IEventTicketOrder;
}
