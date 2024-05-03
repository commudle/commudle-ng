import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRazorpayPayment } from '@commudle/shared-models';
import { RazorpayService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-payment-log-edfeg',
  templateUrl: './payment-log-edfeg.component.html',
  styleUrls: ['./payment-log-edfeg.component.scss'],
})
export class PaymentLogEdfegComponent implements OnInit {
  edfegId: number | string;
  razorpayPaymentDetails: IRazorpayPayment[];
  isLoading = false;
  page = 1;
  count = 10;
  total: number;
  constructor(private activatedRoute: ActivatedRoute, private razorpayService: RazorpayService) {}

  ngOnInit() {
    this.isLoading = true;
    this.activatedRoute.params.subscribe((params) => {
      this.edfegId = params['edfeg_id'];
      this.fetchPaymentDetails();
    });
  }

  fetchPaymentDetails() {
    this.isLoading = true;
    this.razorpayService.getAllPaymentDetails(this.edfegId, this.page, this.count).subscribe((data) => {
      this.razorpayPaymentDetails = data.values;
      this.total = data.total;
      this.page = data.page;
      this.count = data.count;
      this.isLoading = false;
    });
  }
}
