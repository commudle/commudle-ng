import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@commudle/theme';
import { UserConsentsComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-consents/user-consents.component';
import { DataFormEntityResponseGroupsService } from 'apps/commudle-admin/src/app/services/data-form-entity-response-groups.service';
import { UserEventRegistrationsService } from 'apps/commudle-admin/src/app/services/user-event-registrations.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { IDataFormEntityResponseGroup } from 'apps/shared-models/data_form_entity_response_group.model';
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
  onacceptRSVP = false;

  constructor(
    private dataFormEntityResponseGroupsService: DataFormEntityResponseGroupsService,
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
    private userEventRegistrationService: UserEventRegistrationsService,
    private nbDialogService: NbDialogService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.seoService.setTitle('RSVP');
    this.seoService.noIndex(true);

    this.activatedRoute.queryParams.subscribe((data) => {
      this.token = data['token'];
      this.rsvpStatus = data['rsvp_status'];
      this.customReg = data['custom_reg'];

      if (data['custom_reg'] !== undefined) {
        if (this.rsvpStatus == 1) {
          this.onAcceptRoleButton();
        } else {
          this.updateRSVP(this.token, this.rsvpStatus, this.customReg);
        }
      } else {
        this.updateRSVPStatus();
      }
    });
  }

  ngOnDestroy() {
    this.seoService.noIndex(false);
  }

  updateRSVPStatus() {
    this.dataFormEntityResponseGroupsService.updateRSVPStatus(this.token, this.rsvpStatus).subscribe((data) => {
      this.event = data.event;
      this.community = data.community;
      this.dferg = data.data_form_entity_response_group;
    });
  }

  updateRSVP(token, rsvpStatus, customReg) {
    this.userEventRegistrationService.updateRSVP(token, rsvpStatus, customReg).subscribe((data) => {});
  }

  onAcceptRoleButton() {
    this.onacceptRSVP = true;
    const dialogRef = this.nbDialogService.open(UserConsentsComponent, {
      context: {
        onacceptRSVP: this.onacceptRSVP,
        // communityNameSpeaker: this.communityName,
      },
    });
    dialogRef.componentRef.instance.consentOutput.subscribe((result) => {
      dialogRef.close();
      if (result === 'accepted') {
        this.rsvpStatus = 1;
        this.updateRSVP(this.token, this.rsvpStatus, this.customReg);
      } else {
        this.rsvpStatus = 0;
        this.updateRSVP(this.token, this.rsvpStatus, this.customReg);
      }
    });
  }
}
