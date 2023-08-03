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
import { Subscription, distinctUntilChanged, switchMap } from 'rxjs';
import { GoogleTagManagerService } from 'apps/commudle-admin/src/app/services/google-tag-manager.service';
import { PaymentSettingService, StripeHandlerService } from '@commudle/shared-services';
import { FormControl } from '@angular/forms';
import { ISearch } from 'apps/shared-models/search.model';
import { SearchService } from 'apps/commudle-admin/src/app/feature-modules/search/services/search.service';
import { AppUsersService } from 'apps/commudle-admin/src/app/services/app-users.service';
@Component({
  selector: 'app-fill-data-form',
  templateUrl: './fill-data-form.component.html',
  styleUrls: ['./fill-data-form.component.scss'],
})
export class FillDataFormComponent implements OnInit, OnDestroy {
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

  subscriptions: Subscription[] = [];
  gtmData: any = {};
  stripeInstance: any; // Use specific types for Stripe and Elements if available
  elementsInstance: any;
  inputFormControl: FormControl;
  selectedUsers = [];
  showUserFillForm = false;
  paymentData;

  @ViewChild('formConfirmationDialog', { static: true }) formConfirmationDialog: TemplateRef<any>;

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
    private stripeHandlerService: StripeHandlerService,
    private searchService: SearchService,
    private appUsersService: AppUsersService,
    private paymentSettingService: PaymentSettingService,
  ) {
    this.inputFormControl = new FormControl('');
  }

  ngOnInit() {
    // const stripe = this.stripeHandlerService.stripe;
    // const options = {
    //   clientSecret: '{{CLIENT_SECRET}}',
    //   layout: {
    //     type: 'tabs',
    //     defaultCollapsed: false,
    //   },
    //   business: 'Commudle',
    //   appearance: {
    //     theme: 'flat',
    //     variables: { colorPrimaryText: '#262626' },
    //   },
    // };
    // const elements = stripe.elements(options);
    // const paymentElement = elements.create('payment');
    // paymentElement.mount('#payment-element');

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
    this.observeInput();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());

    this.dialogRef?.close();
  }

  observeInput() {
    this.inputFormControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        switchMap((value: string) => this.searchService.getSearchResultsByScope(value, 1, 20, 'User')),
      )
      .subscribe((value: ISearch) => {
        this.searchResult = value.results;
      });
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

  submit() {}
  selected(username) {
    this.subscriptions.push(
      this.appUsersService.getProfile(username).subscribe((data) => {
        this.selectedUsers.push(data);
      }),
    );
  }

  removeSelectedUser(selectedUser) {
    const indexToRemove = this.selectedUsers.findIndex((user) => user.id === selectedUser.id);
    if (indexToRemove !== -1) {
      this.selectedUsers.splice(indexToRemove, 1);
    }
  }
}
