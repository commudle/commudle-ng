/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RazorpayService, StripeHandlerService, countries_details } from '@commudle/shared-services';
import { NbDialogRef, NbDialogService } from '@commudle/theme';
import { Subscription } from 'rxjs';
import { faArrowUpRightFromSquare, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import {
  EBusinessType,
  EBusinessCategory,
  IRazorpayAccount,
  IPageInfo,
  FinancialServicesSubcategory,
  EducationSubcategory,
  HealthcareSubcategory,
  EcommerceSubcategory,
  ServiceSubcategory,
  HousingSubcategory,
  NotForProfitSubcategory,
  SocialSubcategory,
  MediaAndEntertainmentSubcategory,
  GamingSubcategory,
  ItAndSoftwareSubcategory,
  FoodSubcategory,
  UtilitiesSubcategory,
  GovernmentSubcategory,
  LogisticsSubcategory,
  ToursAndTravelSubcategory,
  TransportSubcategory,
} from '@commudle/shared-models';
import { EDbModels } from '@commudle/shared-models';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';
@Component({
  selector: 'commudle-community-bank-details',
  templateUrl: './community-bank-details.component.html',
  styleUrls: ['./community-bank-details.component.scss'],
})
export class CommunityBankDetailsComponent implements OnInit, OnDestroy {
  isLoading = false;
  communityId: number;
  ac: string;
  stripeAccounts = [];
  subscriptions: Subscription[] = [];
  isUpdating = false;
  countryForm: FormGroup;
  stripeConnectAccountForm;
  razorpayAccountForm: FormGroup;
  settlementDetailsForm: FormGroup;
  dialogRef: NbDialogRef<any>;
  countries = countries_details;
  icons = {
    faArrowUpRightFromSquare,
    faTriangleExclamation,
  };
  selectedCountry = '';
  EBusinessType = EBusinessType;
  EBusinessCategory = EBusinessCategory;
  razorpayAccounts: IRazorpayAccount[] = [];
  razorpayPageInfo: IPageInfo;
  subCategory = {
    FinancialServicesSubcategory,
    EducationSubcategory,
    HealthcareSubcategory,
    EcommerceSubcategory,
    ServiceSubcategory,
    HousingSubcategory,
    NotForProfitSubcategory,
    SocialSubcategory,
    MediaAndEntertainmentSubcategory,
    GamingSubcategory,
    ItAndSoftwareSubcategory,
    FoodSubcategory,
    UtilitiesSubcategory,
    GovernmentSubcategory,
    LogisticsSubcategory,
    ToursAndTravelSubcategory,
    TransportSubcategory,
  };
  staticAssets = staticAssets;
  showPanField = false;

  constructor(
    private stripeHandlerService: StripeHandlerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private dialogService: NbDialogService,
    private razorPayService: RazorpayService,
  ) {
    this.countryForm = this.fb.group({
      country: ['', Validators.required],
    });
    this.stripeConnectAccountForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_country_code: [91, Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      zip_code: ['', Validators.required],
      city: ['', Validators.required],
      state: [''],
      country: ['', Validators.required],
    });
    this.razorpayAccountForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      type: ['route', Validators.required],
      legal_business_name: ['', Validators.required],
      business_type: [EBusinessType.INDIVIDUAL, Validators.required],
      customer_facing_business_name: [''],
      contact_name: ['', Validators.required],
      profile: this.fb.group({
        category: ['', Validators.required],
        subcategory: ['', Validators.required],
        addresses: this.fb.group({
          registered: this.fb.group({
            street1: ['', Validators.required],
            street2: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            postal_code: ['', Validators.required],
            country: ['India', Validators.required],
          }),
        }),
      }),
      legal_info: this.fb.group({
        pan: [''],
        gst: [''],
      }),
    });
    this.settlementDetailsForm = this.fb.group({
      settlements: this.fb.group({
        account_number: ['', Validators.required],
        ifsc_code: ['', Validators.required],
        beneficiary_name: ['', Validators.required],
      }),
      tnc_accepted: [true, Validators.required],
    });
  }

  ngOnInit(): void {
    this.communityId = this.activatedRoute.parent.parent.snapshot.params['community_id'];
    this.getStripeAccounts();
    this.getRazorpayAccounts();
    this.businessTypeChanged();
    this.ac = this.activatedRoute.snapshot.queryParamMap.get('ac');
    if (this.ac) {
      this.retrieveStripeAccount(this.ac);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    this.dialogRef?.close();
  }

  openDialogBox(StripeConnectAccount: TemplateRef<any>) {
    this.dialogRef = this.dialogService.open(StripeConnectAccount);
  }

  connectStripeAccount() {
    const currentUrl = this.router.url;
    this.isLoading = true;
    this.subscriptions.push(
      this.stripeHandlerService
        .connectStripeAccount(this.stripeConnectAccountForm, currentUrl, this.communityId)
        .subscribe(
          (data) => {
            this.isLoading = false;
            this.stripeConnectAccountForm.reset();
            this.dialogRef.close();
            window.location.href = data.url;
          },
          () => {
            this.isLoading = false;
          },
        ),
    );
  }

  getStripeAccounts() {
    this.subscriptions.push(
      this.stripeHandlerService.indexStripeAccount(this.communityId).subscribe((data) => {
        this.stripeAccounts = this.stripeAccounts.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
      }),
    );
  }

  getRazorpayAccounts() {
    this.subscriptions.push(
      this.razorPayService.indexRazorpayAccounts(this.communityId).subscribe((data) => {
        this.razorpayAccounts = this.razorpayAccounts.concat(
          data.page.reduce((acc, value) => [...acc, value.data], []),
        );
      }),
    );
  }

  retrieveStripeAccount(uuid: string) {
    this.isUpdating = true;
    this.subscriptions.push(
      this.stripeHandlerService.retrieveStripeAccount(uuid).subscribe((data) => {
        for (let i = 0; i < this.stripeAccounts.length; i++) {
          if (this.stripeAccounts[i].uuid === this.ac) {
            this.stripeAccounts[i].active = true;
            this.stripeAccounts[i].details = data;
            break;
          }
        }
        this.isUpdating = false;
      }),
    );
  }

  updateStripeAccount(uuid: string) {
    const currentUrl = this.router.url;
    this.subscriptions.push(
      this.stripeHandlerService.linkAccount(uuid, currentUrl).subscribe((data) => {
        window.location.href = data.url;
      }),
    );
  }

  createRazorpayAccount() {
    this.isLoading = true;
    this.razorPayService
      .createRazorpayAccount(
        this.communityId,
        EDbModels.KOMMUNITY,
        this.razorpayAccountForm.value,
        this.settlementDetailsForm.value,
      )
      .subscribe(
        (data) => {
          this.isLoading = false;
          if (data) {
            this.razorpayAccounts.push(data);
            this.dialogRef.close();
          }
        },
        (error) => {
          this.isLoading = false;
        },
      );
  }

  onCountryChange() {
    this.selectedCountry = this.countryForm.get('country').value;
    if (this.selectedCountry !== 'India') {
      this.stripeConnectAccountForm.patchValue({
        country: this.selectedCountry,
      });
    }
  }

  categoryChanges() {
    this.razorpayAccountForm.patchValue({
      profile: {
        subcategory: '',
      },
    });
  }

  businessTypeChanged() {
    const businessTypeControl = this.razorpayAccountForm.get('business_type');
    const panControl = this.razorpayAccountForm.get('legal_info.pan');

    businessTypeControl.valueChanges.subscribe((value) => {
      if (
        value !== EBusinessType.INDIVIDUAL &&
        value !== EBusinessType.NOT_YET_REGISTERED &&
        value !== EBusinessType.OTHER
      ) {
        this.showPanField = true;

        panControl.setValidators([Validators.required]);
      } else {
        this.showPanField = false;
        panControl.setValue('');
        panControl.clearValidators();
      }
      panControl.updateValueAndValidity();
    });
  }
}
