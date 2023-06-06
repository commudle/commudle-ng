import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@commudle/theme';
import { UserConsentsComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-consents/user-consents.component';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { DataFormEntityResponseGroupsService } from 'apps/commudle-admin/src/app/services/data-form-entity-response-groups.service';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { UserEventRegistrationsService } from 'apps/commudle-admin/src/app/services/user-event-registrations.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { IDataFormEntityResponseGroup } from 'apps/shared-models/data_form_entity_response_group.model';
import { ConsentTypesEnum } from 'apps/shared-models/enums/consent-types.enum';
import { ERegistrationStatuses } from 'apps/shared-models/enums/registration_statuses.enum';
import { IEvent } from 'apps/shared-models/event.model';
import { SeoService } from 'apps/shared-services/seo.service';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss'],
})
export class RsvpComponent implements OnInit, OnDestroy {
  token: string;
  rsvpStatus: number;
  event: IEvent;
  community: ICommunity;
  dferg: IDataFormEntityResponseGroup;
  ERegistrationStatuses = ERegistrationStatuses;
  customReg: boolean;
  eventId: string;
  showConfirmationDialog = false;

  constructor(
    private dataFormEntityResponseGroupsService: DataFormEntityResponseGroupsService,
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
    private userEventRegistrationService: UserEventRegistrationsService,
    private nbDialogService: NbDialogService,
    private router: Router,
    private eventsService: EventsService,
    private communitiesService: CommunitiesService,
  ) {}

  ngOnInit() {
    this.seoService.setTitle('RSVP');
    this.seoService.noIndex(true);

    this.activatedRoute.queryParams.subscribe((data) => {
      this.token = data['token'];
      this.rsvpStatus = data['rsvp_status'];
      this.customReg = data['custom_reg'];
      this.eventId = data['event_id'];

      if (data['custom_reg'] !== undefined) {
        if (this.rsvpStatus == 1) {
          this.getDetailsFromQueryParams();
        } else {
          this.updateCustomRegRSVP(this.token, this.rsvpStatus, this.customReg);
        }
      } else {
        this.updateRSVPStatus();
      }
    });
  }

  ngOnDestroy() {
    this.seoService.noIndex(false);
  }

  getDetailsFromQueryParams() {
    if (this.eventId) {
      this.eventsService.pGetEvent(this.eventId).subscribe((data) => {
        this.event = data;
        this.communitiesService.pGetCommunityDetails(this.event.kommunity_id).subscribe((data) => {
          this.community = data;
          this.onAcceptRoleButton();
        });
      });
    }
  }

  updateRSVPStatus() {
    this.dataFormEntityResponseGroupsService.updateRSVPStatus(this.token, this.rsvpStatus).subscribe((data) => {
      this.event = data.event;
      this.community = data.community;
      this.dferg = data.data_form_entity_response_group;
      this.showConfirmationDialog = true;
    });
  }

  updateCustomRegRSVP(token, rsvpStatus, customReg) {
    this.userEventRegistrationService.updateRSVP(token, rsvpStatus, customReg).subscribe((data) => {
      this.community = data.community;
      this.event = data.event;
      this.dferg = data.user_event_registration;
      this.showConfirmationDialog = true;
    });
  }

  onAcceptRoleButton() {
    const dialogRef = this.nbDialogService.open(UserConsentsComponent, {
      context: {
        consentType: ConsentTypesEnum.AcceptRSVP,
        communityNameSpeaker: this.community.name,
        eventNameSpeaker: this.event.name,
      },
    });
    dialogRef.componentRef.instance.consentOutput.subscribe((result) => {
      dialogRef.close();
      if (result === 'accepted') {
        this.rsvpStatus = 1;
        this.updateCustomRegRSVP(this.token, this.rsvpStatus, this.customReg);
      } else {
        this.rsvpStatus = 0;
        this.updateCustomRegRSVP(this.token, this.rsvpStatus, this.customReg);
      }
    });
  }
}
