import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EUserRoles, IRazorpayPayment } from '@commudle/shared-models';
import { RazorpayService, ToastrService } from '@commudle/shared-services';
import { NbDialogService } from '@commudle/theme';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import * as moment from 'moment';
import { Location } from '@angular/common';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { EventDataFormEntityGroupsService } from 'apps/commudle-admin/src/app/services/event-data-form-entity-groups.service';
import { IEventDataFormEntityGroup } from 'apps/shared-models/event_data_form_enity_group.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

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
  faChevronLeft = faChevronLeft;
  eventDataFormEntityGroup: IEventDataFormEntityGroup;
  transferCreating = false;

  searchForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private razorpayService: RazorpayService,
    private dialogService: NbDialogService,
    private authWatchService: LibAuthwatchService,
    private location: Location,
    private edfegService: EventDataFormEntityGroupsService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
  ) {
    this.searchForm = this.fb.group({
      search: [''],
    });
  }

  ngOnInit() {
    this.isLoading = true;
    this.activatedRoute.params.subscribe((params) => {
      this.edfegId = params['edfeg_id'];
      this.getEdfegDetails();
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
    this.searchForm.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(() => {
      this.page = 1;
      this.fetchPaymentDetails();
    });
  }

  fetchPaymentDetails() {
    this.isLoading = true;
    this.razorpayService
      .getAllPaymentDetails(this.edfegId, this.page, this.count, this.searchForm.get('search').value)
      .subscribe((data) => {
        this.razorpayPaymentDetails = data.values;
        this.total = data.total;
        this.page = data.page;
        this.count = data.count;
        this.isLoading = false;
      });
  }

  getEdfegDetails() {
    this.edfegService.getEventDataFormEntityGroup(this.edfegId).subscribe((data) => {
      this.eventDataFormEntityGroup = data;
    });
  }

  createPaymentTransfer(rzpPaymentId, index: number) {
    this.transferCreating = true;
    this.razorpayService.createPaymentTransfer(rzpPaymentId).subscribe(
      (data) => {
        if (data) {
          this.razorpayPaymentDetails[index] = data;
          this.toastrService.successDialog('Transfer created successfully');
        }
        this.transferCreating = false;
      },
      () => {
        this.transferCreating = false;
      },
    );
  }

  viewTransferDetails(transferId, dialog: TemplateRef<any>) {
    this.razorpayService.getTransferDetails(transferId).subscribe((data) => {
      this.dialogService.open(dialog, { context: data });
    });
  }

  goBackToPrevPage(): void {
    this.location.back();
  }
}
