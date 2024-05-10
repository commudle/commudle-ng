import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EUserRoles, IRazorpayPayment } from '@commudle/shared-models';
import { RazorpayService } from '@commudle/shared-services';
import { NbDialogService } from '@commudle/theme';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
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
  isSystemAdmin = false;
  currentUser: ICurrentUser;
  constructor(
    private activatedRoute: ActivatedRoute,
    private razorpayService: RazorpayService,
    private dialogService: NbDialogService,
    private authWatchService: LibAuthwatchService,
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.activatedRoute.params.subscribe((params) => {
      this.edfegId = params['edfeg_id'];
      this.fetchPaymentDetails();
    });

    this.authWatchService.currentUser$.subscribe((currentUser: ICurrentUser) => {
      this.currentUser = currentUser;
      if (currentUser.user_roles.includes(EUserRoles.SYSTEM_ADMINISTRATOR)) {
        this.isSystemAdmin = true;
      } else {
        this.isSystemAdmin = false;
      }
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
    });
  }
}
