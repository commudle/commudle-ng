import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRazorpayPayment } from '@commudle/shared-models';
import { RazorpayService } from '@commudle/shared-services';
import { NbDialogService } from '@commudle/theme';
import * as moment from 'moment';
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
  moment = moment;
  constructor(
    private activatedRoute: ActivatedRoute,
    private razorpayService: RazorpayService,
    private dialogService: NbDialogService,
  ) {}

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

  createPaymentTransfer(paymentId, orderId) {
    this.razorpayService.createPaymentTransfer(orderId, paymentId).subscribe();
  }

  viewTransferDetails(transferId, dialog: TemplateRef<any>) {
    this.razorpayService.getTransferDetails(transferId).subscribe((data) => {
      this.dialogService.open(dialog, { context: data });
      console.log('🚀 ~ PaymentLogEdfegComponent ~ this.razorpayService.getTransferDetails ~ data:', data);
    });
  }
}
