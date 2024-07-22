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
import { IUserStat } from 'libs/shared/models/src/lib/user-stats.model';
import { AppUsersService } from 'apps/commudle-admin/src/app/services/app-users.service';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { UserDetailsFormComponent } from 'apps/shared-components/user-details-form/user-details-form.component';
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
  completeProfileText = 'Complete your profile to boost your chances of getting shortlisted';
  existingResponses;

  subscriptions: Subscription[] = [];
  gtmData: any = {};
  userProfileDetails: IUserStat;
  faArrowRight = faArrowRight;
  formAnswers = {};

  @ViewChild('formConfirmationDialog', { static: true }) formConfirmationDialog: TemplateRef<any>;
  @ViewChild(UserDetailsFormComponent) userDetailsFormComponent: UserDetailsFormComponent;

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
    private appUsersService: AppUsersService,
  ) {}

  ngOnInit() {
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
          this.appUsersService.getProfileStats().subscribe((data) => {
            this.userProfileDetails = data;
          });
          this.gtmData.com_user_id = this.currentUser.id;
        }
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());

    this.dialogRef?.close();
  }

  getDataFormEntity(dataFormEntityId) {
    this.dataFormEntitiesService.getDataFormEntity(dataFormEntityId).subscribe((data) => {
      this.dataFormEntity = data;
      if (this.dataFormEntity.form_type) {
        this.gtmData.com_form_type_name = this.dataFormEntity.form_type.form_type_name;
      }
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
        this.completeProfileText = 'Complete your profile to grow your developer network';
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

  updateUserDetailsAndSubmitForm($event) {
    this.formAnswers = $event;
    if (this.dataFormEntity.user_details) {
      this.userDetailsFormComponent.submitUserDetails();
    } else {
      this.submitForm();
    }
  }

  updateUserDetails(event) {
    console.log('🚀 ~ FillDataFormComponent ~ updateUserDetails ~ event:', event);
    // this.submitForm();
  }

  submitForm() {
    console.log('🚀 ~ FillDataFormComponent ~ submitForm ~  this.dataFormEntity;:', this.dataFormEntity);
    // this.dataFormEntityResponsesService.submitDataFormEntityResponse(this.dataFormEntity.id, $event).subscribe(() => {
    //   this.toastLogService.successDialog('Saved!');
    //   this.redirectTo();
    //   this.gtm.dataLayerPushEvent('submit-form', this.gtmData);
    // });
  }

  redirectTo() {
    if (this.redirectRoute) {
      this.router.navigate(this.redirectRoute);
    } else {
      this.dialogRef = this.dialogService.open(this.formConfirmationDialog, { closeOnBackdropClick: false });
    }
  }

  UpdateOrSubmitResponse(value) {}
}
