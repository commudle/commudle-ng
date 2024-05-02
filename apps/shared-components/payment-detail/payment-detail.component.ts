import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RazorpayService } from '@commudle/shared-services';
import { IRazorpayPayment } from '@commudle/shared-models';
import { SharedComponentsModule } from '@commudle/shared-components';
import { CommonModule } from '@angular/common';
import { NbCardModule } from '@commudle/theme';

@Component({
  selector: 'commudle-payment-detail',
  templateUrl: './payment-detail.component.html',
  standalone: true,
  imports: [CommonModule, NbCardModule, SharedComponentsModule],
  styleUrls: ['./payment-detail.component.scss'],
})
export class PaymentDetailComponent implements OnInit {
  edfegId: number | string;
  razorpayPaymentDetails: IRazorpayPayment[];
  isLoading = false;
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
    this.razorpayService.getAllPaymentDetails(this.edfegId).subscribe((data) => {
      this.razorpayPaymentDetails = data;
      this.isLoading = false;
    });
  }
}
