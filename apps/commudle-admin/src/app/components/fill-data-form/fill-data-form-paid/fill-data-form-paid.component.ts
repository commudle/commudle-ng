/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@commudle/theme';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { DataFormEntitiesService } from 'apps/commudle-admin/src/app/services/data-form-entities.service';
import { DataFormEntityResponsesService } from 'apps/commudle-admin/src/app/services/data-form-entity-responses.service';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { LibErrorHandlerService } from 'apps/lib-error-handler/src/public-api';
import { ICommunity } from 'apps/shared-models/community.model';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { IDataFormEntity } from 'apps/shared-models/data_form_entity.model';
import { IEvent } from 'apps/shared-models/event.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { SeoService } from 'apps/shared-services/seo.service';
import { Subscription } from 'rxjs';
import { GoogleTagManagerService } from 'apps/commudle-admin/src/app/services/google-tag-manager.service';
import {
  DiscountCodesService,
  EventTicketOrderService,
  PaymentSettingService,
  countries_details,
} from '@commudle/shared-services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StripeService, StripePaymentElementComponent } from 'ngx-stripe';
import { StripeElementsOptions } from '@stripe/stripe-js';
import { faRotateRight, faTriangleExclamation, faUndo, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { DataFormFillComponent } from 'apps/shared-components/data-form-fill/data-form-fill.component';
import { environment } from '@commudle/shared-environments';
import { RazorpayService } from '@commudle/shared-services';
import { EDbModels, IRazorpayOrder } from '@commudle/shared-models';
import { AppUsersService } from 'apps/commudle-admin/src/app/services/app-users.service';
import { IUserStat } from 'libs/shared/models/src/lib/user-stats.model';

declare const Razorpay: any;
@Component({
  selector: 'commudle-fill-data-form-paid',
  templateUrl: './fill-data-form-paid.component.html',
  styleUrls: ['./fill-data-form-paid.component.scss'],
})
export class FillDataFormPaidComponent implements OnInit, OnDestroy, AfterViewInit {
  countries = countries_details; //list of country code for phone numbers codes
  dataFormEntity: IDataFormEntity;
  formClosed = false; //form is closed or open for filling state
  showProfileForm = false; //if profile was not completed
  redirectRoute: any;
  event: IEvent;
  community: ICommunity;
  selectedFormResponse: any;
  currentUser: ICurrentUser;
  dialogRef: NbDialogRef<any>;
  paymentDialogRef: NbDialogRef<any>;

  existingResponses;

  subscriptions: Subscription[] = [];
  gtmData: any = {};
  selectedUsers = []; //store additional user information
  paymentDetails; //store payments details
  formData = new FormData();
  forms: FormGroup[] = []; // Store multiple additional user forms

  isFormDirty: boolean[] = [];
  @ViewChild('paymentDialog', { static: true }) paymentDialog: TemplateRef<any>;

  @ViewChild(DataFormFillComponent, { static: false }) dataFormFillComponent: DataFormFillComponent;

  @ViewChild('formConfirmationDialog', { static: true }) formConfirmationDialog: TemplateRef<any>;
  @ViewChild('paymentErrorDialog', { static: true }) paymentErrorDialog: TemplateRef<any>;

  @ViewChild(StripePaymentElementComponent)
  paymentElement: StripePaymentElementComponent;

  @ViewChild('consentAnimation', { static: false }) consentAnimationContainer: ElementRef<HTMLDivElement>;

  elementsOptions: StripeElementsOptions = {
    locale: 'auto',
  };

  promoCode = ''; //for promoCode input
  promoCodeApplied = false;
  discountAmount = 0; //discount amount after applied promo code

  basePrice: number; //actual ticket price
  totalPrice: number; // total ticket price basePrice * UsersCount - discount price if any

  eventTicketOrders: any;
  totalTaxAmount = 0;

  targetDate: Date;
  timeRemaining: number;
  formattedTimeRemaining: string;
  showTimer = false;

  stripePaymentIntendId: string;
  ticketPaidAlready: boolean;

  faIcon = {
    faRotateRight,
    faCircleCheck,
    faTriangleExclamation,
    faUndo,
    faCircleXmark,
  };

  showEventTicketOrder;
  isLoadingPayment = false;
  userProfileDetails: IUserStat;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataFormEntitiesService: DataFormEntitiesService,
    private eventsService: EventsService,
    private communitiesService: CommunitiesService,
    private router: Router,
    private seoService: SeoService,
    private errorHandler: LibErrorHandlerService,
    private dataFormEntityResponsesService: DataFormEntityResponsesService,
    private toastLogService: LibToastLogService,
    private dialogService: NbDialogService,
    private authWatchService: LibAuthwatchService,
    private gtm: GoogleTagManagerService,
    private paymentSettingService: PaymentSettingService,
    private fb: FormBuilder,
    private eventTicketOrderService: EventTicketOrderService,
    private stripeService: StripeService,
    private discountCodeService: DiscountCodesService,
    private razorpayService: RazorpayService,
    private appUsersService: AppUsersService,
  ) {}

  ngOnInit() {
    this.fetchDataFormEntity();
    this.setRedirectPath();
    this.setupCurrentUser();
  }

  ngAfterViewInit(): void {
    import('lottie-web').then((l) => {
      l.default.loadAnimation({
        container: this.consentAnimationContainer?.nativeElement,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: 'https://lottie.host/81ecf9b7-b435-487c-b2d5-1386e690df6f/AQjcda3Dkr.json',
      });
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.dialogRef?.close();
  }

  //fetch current user details
  setupCurrentUser() {
    this.subscriptions.push(
      this.authWatchService.currentUser$.subscribe((data) => {
        this.currentUser = data;
        if (this.currentUser) {
          this.gtmData.com_user_id = this.currentUser.id;
          this.appUsersService.getProfileStats().subscribe((data) => {
            this.userProfileDetails = data;
          });
        }
      }),
    );
  }

  // prefilled form for current user
  createCurrentUserForm() {
    this.addNewUser();
    this.forms[0].patchValue({
      additional_users: {
        name: this.currentUser.name,
        email: this.currentUser.email,
        phone_country_code: this.currentUser.phone_country_code,
        phone_number: this.currentUser.phone,
      },
    });
  }

  setRedirectPath() {
    this.subscriptions.push(
      this.activatedRoute.queryParams.subscribe((data) => {
        if (data.next) {
          this.redirectRoute = [decodeURIComponent(data.next)];
        }
      }),
    );
  }

  fetchDataFormEntity() {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe((params) => {
        this.getDataFormEntity(params.data_form_entity_id);
      }),
    );
  }

  // fetch form questions
  getDataFormEntity(dataFormEntityId) {
    this.subscriptions.push(
      this.dataFormEntitiesService.getDataFormEntity(dataFormEntityId).subscribe((data) => {
        this.dataFormEntity = data;
        this.fetchPaidTicketingData();
        this.gtmData.com_form_parent_type = this.dataFormEntity.entity_type;
        this.seoService.setTags(
          `${this.dataFormEntity.name}`,
          `Fill the form for ${this.dataFormEntity.name}`,
          'https://commudle.com/assets/images/commudle-logo192.png',
        );
        this.formClosed = !this.dataFormEntity.user_can_fill_form;
        if (!this.formClosed) {
          this.getExistingResponses();
          this.getParent();
        }
      }),
    );
  }

  //Fetch ticket Details
  fetchPaidTicketingData() {
    this.subscriptions.push(
      this.paymentSettingService.pIndexPaymentSettings(this.dataFormEntity.entity_id).subscribe((data) => {
        this.paymentDetails = data;
        this.basePrice = data.price / 100;
        this.totalPrice = this.basePrice;
        this.calculateTaxAmount();
      }),
    );
  }

  // check event ticket order
  checkEventTicketOrder(edfegId) {
    this.eventTicketOrderService.showEventTicketOrder(edfegId).subscribe((data) => {
      this.eventTicketOrders = data.event_ticket_orders;
      if (this.eventTicketOrders.length === 0) {
        this.createCurrentUserForm();
      } else {
        for (const eto of this.eventTicketOrders) {
          if (this.currentUser.username === eto.user_id) {
            this.showEventTicketOrder = eto;
            if (eto.status === 'full_refund') {
              this.showEventTicketOrder = eto;
              this.ticketPaidAlready = true;
            }
            this.etoPrefilledDetails(this.showEventTicketOrder);
          }

          if (this.currentUser.username !== eto.user_id && eto.status === 'unpaid') {
            this.showEventTicketOrder = [];
            this.showEventTicketOrder = eto;
            this.etoPrefilledDetails(this.showEventTicketOrder);
          }

          if (eto.status === 'paid') {
            this.ticketPaidAlready = true;
            this.showEventTicketOrder = eto;
            this.etoPrefilledDetails(this.showEventTicketOrder);
            break;
          }
        }

        if (!this.showEventTicketOrder) {
          this.createCurrentUserForm();
        }
      }
    });
  }

  etoPrefilledDetails(eto) {
    if (eto?.discount_code.code) {
      this.promoCode = eto.discount_code.code;
      this.applyPromo();
    }

    if (eto?.eto_users) {
      for (let i = 0; i < eto.eto_users.length; i++) {
        const user = eto.eto_users[i];
        this.addNewUser();
        this.forms[i].patchValue({
          additional_users: {
            name: user.name,
            email: user.email,
            phone_country_code: user.phone_country_code,
            phone_number: user.phone,
          },
        });
      }
    }

    if (eto?.discount_code_expires_at) {
      this.targetDate = new Date(eto.discount_code_expires_at);
      if (this.targetDate) {
        this.updateTimeRemaining();
        if (this.showTimer) {
          setInterval(() => {
            this.updateTimeRemaining();
          }, 1000);
        }
      }
    }
  }

  updateTimeRemaining() {
    this.showTimer = true;
    const currentTime = new Date();
    const timeDiff = this.targetDate.getTime() - currentTime.getTime();
    this.timeRemaining = timeDiff > 0 ? timeDiff : 0;
    const minutes = Math.floor(this.timeRemaining / (1000 * 60));
    const seconds = Math.floor((this.timeRemaining % (1000 * 60)) / 1000);
    this.formattedTimeRemaining = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    if (this.timeRemaining <= 0) {
      this.showTimer = false;
    }
  }

  // Fetch preExisting form response
  getExistingResponses() {
    this.subscriptions.push(
      this.dataFormEntityResponsesService.getExistingResponse(this.dataFormEntity.id).subscribe((data) => {
        this.existingResponses = data.existing_responses;

        if (!this.dataFormEntity.multi_response && this.existingResponses.length >= 1) {
          this.selectedFormResponse = this.existingResponses[this.existingResponses.length - 1];
        }
      }),
    );
  }

  //get form entityType
  getParent() {
    switch (this.dataFormEntity.redirectable_entity_type) {
      case 'Event':
        this.getEvent();
        break;
      case 'AdminSurvey':
        this.showProfileForm = false;
        // nothing need to be done here
        break;
      case 'Survey':
        this.showProfileForm = false;
        // nothing need to be done here
        break;
      default:
        this.errorHandler.handleError(404, 'You cannot fill this form');
    }
  }

  //Fetch event details
  getEvent() {
    this.subscriptions.push(
      this.eventsService.pGetEvent(this.dataFormEntity.redirectable_entity_id).subscribe((data) => {
        this.event = data;
        this.checkEventTicketOrder(this.dataFormEntity.entity_id);
        this.gtmData.com_event_name = this.event.name;
        this.seoService.setTitle(`${this.dataFormEntity.name} | ${this.event.name}`);
        this.getCommunity(this.event.kommunity_id);

        if (this.event.header_image_path) {
          this.seoService.setTag('og:image', this.event.header_image_path);
        }
      }),
    );
  }

  //Fetch Community details
  getCommunity(communityId) {
    this.subscriptions.push(
      this.communitiesService.getCommunityDetails(communityId).subscribe((data) => {
        this.community = data;

        if (!this.event.header_image_path) {
          this.seoService.setTag('og:image', this.community.logo_path);
        }
        // if (!this.redirectRoute) {
        //   this.redirectRoute = ['/communities', this.community.slug, 'events', this.event.slug];
        // }
      }),
    );
  }

  //submit user form details
  submitForm($event) {
    this.dataFormEntityResponsesService.submitDataFormEntityResponse(this.dataFormEntity.id, $event).subscribe(() => {
      this.redirectTo();
      this.gtm.dataLayerPushEvent('submit-form', this.gtmData);
    });
  }

  // Generate new additional user form
  addNewUser() {
    const newForm = this.fb.group({
      additional_users: this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        phone_country_code: ['', Validators.required],
        phone_number: ['', Validators.required],
      }),
    });
    this.forms.push(newForm);
    this.totalPrice = this.basePrice * this.forms.length;
    this.calculateTaxAmount();
    if (this.promoCodeApplied) this.applyPromo();
  }

  //save additional user details in form for api
  saveUserDetails() {
    for (const form of this.forms) {
      const user = form.value;
      this.formData.append(`users[][name]`, user.additional_users.name);
      this.formData.append(`users[][email]`, user.additional_users.email);
      this.formData.append(`users[][phone_country_code]`, user.additional_users.phone_country_code);
      this.formData.append(`users[][phone]`, user.additional_users.phone_number);
    }
  }

  removeUser(index) {
    if (index >= 0 && index < this.forms.length) {
      this.forms.splice(index, 1);
      this.totalPrice = this.basePrice * this.forms.length - this.discountAmount;
      if (this.promoCodeApplied) {
        this.applyPromo();
      }
      this.calculateTaxAmount();
    }
  }

  submitFormAndPay() {
    this.dataFormFillComponent.submitForm();
  }

  applyPromo() {
    if (!this.ticketPaidAlready) {
      this.discountCodeService
        .canBeApplied(
          this.promoCode,
          this.dataFormEntity.entity_id,
          this.paymentDetails.price,
          this.event.id,
          this.forms.length,
        )
        .subscribe((data) => {
          if (data.can_be_applied) {
            this.discountAmount = data.discount_amount / 100;
            this.promoCodeApplied = true;
            this.totalPrice = this.basePrice * this.forms.length - this.discountAmount;
            this.calculateTaxAmount();
          } else {
            this.toastLogService.warningDialog('Discount code is invalid');
            this.removePromoCode();
          }
        });
    }
  }

  removePromoCode() {
    this.promoCode = '';
    this.promoCodeApplied = false;
    this.discountAmount = 0;
    this.totalPrice = this.basePrice * this.forms.length;
    this.calculateTaxAmount();
  }

  redirectTo() {
    if (this.redirectRoute) {
      this.router.navigate(this.redirectRoute);
    } else {
      this.saveUserDetails();
      if (this.ticketPaidAlready) {
        this.dialogRef = this.dialogService.open(this.formConfirmationDialog, { closeOnBackdropClick: false });
      } else if (!this.ticketPaidAlready) {
        if (this.eventTicketOrders.length > 0 && this.showEventTicketOrder !== undefined) {
          this.updateTickerOrder();
        } else {
          this.createTicketOrder();
        }
      }
    }
  }

  // click for open payment box and get ticket order id
  createTicketOrder() {
    this.eventTicketOrderService
      .createEventTicketOrder(this.formData, this.dataFormEntity.entity_id, this.promoCodeApplied ? this.promoCode : '')
      .subscribe((data) => {
        if (data.bank_ac_type === EDbModels.STRIPE_CONNECT_ACCOUNT) {
          this.elementsOptions.clientSecret = data.stripe_payment_intent.details.client_secret;
          this.stripePaymentIntendId = data.stripe_payment_intent.stripe_pi_id;
          this.paymentDialogRef = this.dialogService.open(this.paymentDialog, { closeOnBackdropClick: false });
        } else if (data.bank_ac_type === EDbModels.RAZORPAY_LINKED_ACCOUNT) {
          this.createOrUpdateRazorpayOrder(data.id);
        }
        if (data.discount_code_expires_at) {
          this.targetDate = new Date(data.discount_code_expires_at);
          if (this.targetDate) {
            this.updateTimeRemaining();
            if (this.showTimer) {
              setInterval(() => {
                this.updateTimeRemaining();
              }, 1000);
            }
          }
        }
      });
  }

  updateTickerOrder() {
    this.eventTicketOrderService
      .updateEventTicketOrder(
        this.formData,
        this.showEventTicketOrder.uuid,
        this.promoCodeApplied ? this.promoCode : '',
      )
      .subscribe((data) => {
        if (data.bank_ac_type === EDbModels.STRIPE_CONNECT_ACCOUNT) {
          this.elementsOptions.clientSecret = data.stripe_payment_intent.details.client_secret;
          this.stripePaymentIntendId = data.stripe_payment_intent.stripe_pi_id;
          this.paymentDialogRef = this.dialogService.open(this.paymentDialog, { closeOnBackdropClick: false });
        } else if (data.bank_ac_type === EDbModels.RAZORPAY_LINKED_ACCOUNT) {
          this.createOrUpdateRazorpayOrder(data.id);
        }
        if (data.discount_code_expires_at) {
          this.targetDate = new Date(data.discount_code_expires_at);
          if (this.targetDate) {
            this.updateTimeRemaining();
            if (this.showTimer) {
              setInterval(() => {
                this.updateTimeRemaining();
              }, 1000);
            }
          }
        }
      });
  }

  // for Payment confirm Function from stripe
  pay() {
    this.isLoadingPayment = true;
    this.stripeService
      .confirmPayment({
        elements: this.paymentElement.elements,
        redirect: 'if_required',
      })
      .subscribe((result) => {
        if (result.error) {
          this.isLoadingPayment = false;
          this.toastLogService.warningDialog(result.error.decline_code, 10000);
          this.dialogRef = this.dialogService.open(this.paymentErrorDialog, {
            closeOnBackdropClick: false,
            context: result.error.decline_code,
          });
        } else {
          if (result.paymentIntent.status === 'succeeded') {
            this.fetchPaidTicketingData();
            this.isLoadingPayment = false;
            this.paymentDialogRef.close();
            this.toastLogService.successDialog('Your Payment Was Received Successfully', 3000);
            this.eventTicketOrderService.checkPayment(this.stripePaymentIntendId).subscribe((data) => {});
            this.dialogRef = this.dialogService.open(this.formConfirmationDialog, { closeOnBackdropClick: false });
          }
        }
      });
  }

  //calculate tax amount
  calculateTaxAmount() {
    if (this.paymentDetails?.tax_percentage) {
      this.totalTaxAmount = (this.totalPrice * this.paymentDetails.tax_percentage) / 100;
    }
  }

  // create or update razorpay order
  createOrUpdateRazorpayOrder(etoId) {
    const orderDetails = {
      amount: Math.round((this.totalPrice + this.totalTaxAmount) * 100),
      currency: 'INR',
    };
    this.razorpayService.createOrFindOrder(orderDetails, etoId).subscribe((data: IRazorpayOrder) => {
      this.razorPaySubmit(data);
    });
  }

  // load and pay razorpay
  razorPaySubmit(order: IRazorpayOrder) {
    this.isLoadingPayment = true;
    const options = {
      key: environment.razorpay_key,
      order_id: order.rzp_order_id,
      handler: (response: any) => {
        {
          this.razorpayService.createOrUpdatePayment(response, false, order?.razorpay_payment?.id).subscribe((data) => {
            this.fetchPaidTicketingData();
            this.checkEventTicketOrder(this.dataFormEntity.entity_id);
            this.ticketPaidAlready = true;
            this.toastLogService.successDialog('Your Payment Was Received Successfully');
            this.isLoadingPayment = false;
            this.dialogRef = this.dialogService.open(this.formConfirmationDialog, {
              closeOnBackdropClick: false,
            });
          });
        }
      },
      prefill: {
        name: this.currentUser.name,
        email: this.currentUser.email,
        contact: this.currentUser.phone ? this.currentUser.phone : '',
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', (response: any) => {
      {
        this.razorpayService
          .createOrUpdatePayment(response.error, true, order?.razorpay_payment?.id)
          .subscribe((data) => {
            alert('Message from Razorpay:' + response.error.description);
          });
      }
    });
    rzp1.open();
  }

  // Reloads the current window location.
  reload() {
    window.location.reload();
  }
}
