/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
  EventTicketOrderService,
  PaymentSettingService,
  StripeHandlerService,
  countries_details,
} from '@commudle/shared-services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'commudle-fill-data-form-paid',
  templateUrl: './fill-data-form-paid.component.html',
  styleUrls: ['./fill-data-form-paid.component.scss'],
})
export class FillDataFormPaidComponent implements OnInit, OnDestroy {
  countries = countries_details;
  dataFormEntity: IDataFormEntity;
  formClosed = false;
  showProfileForm = false;
  redirectRoute: any;
  event: IEvent;
  community: ICommunity;
  selectedFormResponse: any;
  currentUser: ICurrentUser;
  dialogRef: NbDialogRef<any>;

  existingResponses;
  createDataForm: FormGroup;

  subscriptions: Subscription[] = [];
  gtmData: any = {};
  stripeInstance: any; // Use specific types for Stripe and Elements if available
  elementsInstance: any;
  selectedUsers = [];
  showUserFillForm = false;
  paymentData;
  addUserForm;
  formData = new FormData();
  forms: FormGroup[] = []; // Store multiple forms
  totalUsers = 1;

  @ViewChild('formConfirmationDialog', { static: true }) formConfirmationDialog: TemplateRef<any>;
  //number codes
  numberCodes = [];
  searchTerm = '';

  searchResult = [];
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
    private stripeHandlerService: StripeHandlerService,
  ) {
    this.addUserForm = this.fb.group({
      additional_users: this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        phone_number: ['', Validators.required],
      }),
    });
  }

  ngOnInit() {
    // this.numberCodes = this.numberCodeService.getNumberCodes();
    // console.log(
    //   '🚀 ~ file: fill-data-form-paid.component.ts:96 ~ FillDataFormPaidComponent ~ ngOnInit ~ this.numberCodes:',
    //   this.numberCodes,
    // );
    this.subscriptions.push(
      this.activatedRoute.params.subscribe((params) => {
        this.getDataFormEntity(params.data_form_entity_id);
      }),
    );

    this.subscriptions.push(
      this.activatedRoute.queryParams.subscribe((data) => {
        if (data.next) {
          this.redirectRoute = [decodeURIComponent(data.next)];
        }
      }),
    );

    this.subscriptions.push(
      this.authWatchService.currentUser$.subscribe((data) => {
        this.currentUser = data;
        if (this.currentUser) {
          this.gtmData.com_user_id = this.currentUser.id;
        }
      }),
    );
  }

  // filterNumberCodes(): any[] {
  //   // const data = this.numberCodes.filter((code) => code.phone.toString().includes(this.searchTerm));
  //   // console.log("🚀 ~ file: fill-data-form-paid.component.ts:126 ~ FillDataFormPaidComponent ~ filterNumberCodes ~ data:", data)

  //   // return data;
  // }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());

    this.dialogRef?.close();
  }

  fetchPaidTicketingData(edfegId) {
    this.subscriptions.push(
      this.paymentSettingService.indexPaymentSettings(edfegId).subscribe((data) => {
        this.paymentData = data;
      }),
    );
  }

  getDataFormEntity(dataFormEntityId) {
    this.dataFormEntitiesService.getDataFormEntity(dataFormEntityId).subscribe((data) => {
      this.dataFormEntity = data;
      this.fetchPaidTicketingData(this.dataFormEntity.entity_id);
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
    });
  }

  getExistingResponses() {
    this.dataFormEntityResponsesService.getExistingResponse(this.dataFormEntity.id).subscribe((data) => {
      this.existingResponses = data.existing_responses;

      if (!this.dataFormEntity.multi_response && this.existingResponses.length >= 1) {
        this.selectedFormResponse = this.existingResponses[this.existingResponses.length - 1];
      }
    });
  }

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

  getEvent() {
    this.eventsService.pGetEvent(this.dataFormEntity.redirectable_entity_id).subscribe((data) => {
      this.event = data;
      this.gtmData.com_event_name = this.event.name;
      this.seoService.setTitle(`${this.dataFormEntity.name} | ${this.event.name}`);
      this.getCommunity(this.event.kommunity_id);

      if (this.event.header_image_path) {
        this.seoService.setTag('og:image', this.event.header_image_path);
      }
    });
  }

  getCommunity(communityId) {
    this.communitiesService.getCommunityDetails(communityId).subscribe((data) => {
      this.community = data;

      if (!this.event.header_image_path) {
        this.seoService.setTag('og:image', this.community.logo_path);
      }
      // if (!this.redirectRoute) {
      //   this.redirectRoute = ['/communities', this.community.slug, 'events', this.event.slug];
      // }
    });
  }

  submitForm($event) {
    this.dataFormEntityResponsesService.submitDataFormEntityResponse(this.dataFormEntity.id, $event).subscribe(() => {
      this.toastLogService.successDialog('Saved!');
      this.redirectTo();
      this.gtm.dataLayerPushEvent('submit-form', this.gtmData);
    });
  }

  redirectTo() {
    if (this.redirectRoute) {
      this.router.navigate(this.redirectRoute);
    } else {
      this.dialogRef = this.dialogService.open(this.formConfirmationDialog, { closeOnBackdropClick: false });
    }
  }

  // createToken() {
  //   const stripe = this.stripeHandlerService.stripe;
  //   const elements = stripe.elements();
  //   const style = {
  //     base: {
  //       color: '#32325d',
  //       fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
  //       fontSmoothing: 'antialiased',
  //       fontSize: '16px',
  //       '::placeholder': {
  //         color: '#fff00f',
  //       },
  //     },
  //     invalid: {
  //       color: '#fa755a',
  //       iconColor: '#fa755a',
  //     },
  //   };
  //   // Create an instance of the card Element.
  //   const card = elements.create('card', { style: style });
  //   console.log("🚀 ~ file: fill-data-form.component.ts:198 ~ FillDataFormComponent ~ createToken ~ card:", card)
  //   // Add an instance of the card Element into the `card-element` <div>.
  //   card.mount('#card-element');

  //   card.addEventListener('change', (event) => {
  //     const displayError = document.getElementById('card-errors');
  //     if (event.error) {
  //       displayError.textContent = event.error.message;
  //     } else {
  //       displayError.textContent = '';
  //     }
  //   });

  //   stripe.createToken(card).then((result) => {
  //     if (result.error) {
  //       // Inform the user if there was an error
  //       const errorElement = document.getElementById('card-errors');
  //       errorElement.textContent = result.error.message;
  //     } else {
  //       // Send the token to your server
  //       // stripeTokenHandler(result.token);
  //       console.log(result.token);
  //     }
  //   });
  // }

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
  }

  submit() {
    this.eventTicketOrderService
      .createEventTicketOrder(this.formData, this.dataFormEntity.entity_id)
      .subscribe((data) => {
        console.log(
          '🚀 ~ file: fill-data-form.component.ts:269 ~ FillDataFormComponent ~ this.eventTicketOrderService.createEventTicketOrder ~ data:',
          data,
        );
        const stripe = this.stripeHandlerService.stripe;
        const options = {
          clientSecret: data.stripe_payment_intent.details.client_secret,
          layout: {
            type: 'accordion',
            defaultCollapsed: false,
            radios: true,
            spacedAccordionItems: false,
          },
          business: 'Commudle',
          appearance: {
            theme: 'stripe',
            variables: { colorPrimaryText: '#262626' },
          },
        };
        const elements = stripe.elements(options);
        const paymentElement = elements.create('payment');
        paymentElement.mount('#payment-element');
        paymentElement.update({ business: { name: 'Stripe Shop' } });
      });
  }

  saveUserDetails(index) {
    this.totalUsers = this.totalUsers + 1;
    this.selectedUsers = [];
    this.selectedUsers.push(this.forms[index].value);

    this.selectedUsers.forEach((user) => {
      this.formData.append(`additional_users[][name]`, user.additional_users.name);
      this.formData.append(`additional_users[][email]`, user.additional_users.email);
      this.formData.append(`additional_users[][phone_country_code]`, '+91');
      this.formData.append(`additional_users[][phone]`, user.additional_users.phone_number);
    });
  }
}
