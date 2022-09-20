import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICommunity, ICurrentUser, IDataFormEntity, IEvent } from '@commudle/shared-models';
import {
  ErrorHandlerService,
  EventsService,
  LibAuthwatchService,
  LibToastLogService,
  SeoService,
} from '@commudle/shared-services';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { DataFormEntitiesService } from 'apps/commudle-admin/src/app/services/data-form-entities.service';
import { DataFormEntityResponsesService } from 'apps/commudle-admin/src/app/services/data-form-entity-responses.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-fill-data-form',
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

  @ViewChild('formConfirmationDialog', { static: true }) formConfirmationDialog: TemplateRef<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataFormEntitiesService: DataFormEntitiesService,
    private eventsService: EventsService,
    private communitiesService: CommunitiesService,
    private router: Router,
    private seoService: SeoService,
    private errorHandler: ErrorHandlerService,
    private dataFormEntityResponsesService: DataFormEntityResponsesService,
    private toastLogService: LibToastLogService,
    private dialogService: NbDialogService,
    private authWatchService: LibAuthwatchService,
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

    this.subscriptions.push(this.authWatchService.currentUser$.subscribe((data) => (this.currentUser = data)));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());

    this.dialogRef?.close();
  }

  getDataFormEntity(dataFormEntityId) {
    this.dataFormEntitiesService.getDataFormEntity(dataFormEntityId).subscribe((data) => {
      this.dataFormEntity = data;
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
      default:
        this.errorHandler.handleError(404, 'You cannot fill this form');
    }
  }

  getEvent() {
    this.eventsService.pGetEvent(this.dataFormEntity.redirectable_entity_id).subscribe((data) => {
      this.event = data;
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
      // this.toastLogService.successDialog('Saved!');
      this.redirectTo();
    });
  }

  redirectTo() {
    if (this.redirectRoute) {
      this.router.navigate(this.redirectRoute);
    } else {
      this.dialogRef = this.dialogService.open(this.formConfirmationDialog, { closeOnBackdropClick: false });
    }
  }
}
