import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataFormEntityResponseGroupsService } from 'apps/commudle-admin/src/app/services/data-form-entity-response-groups.service';
import { ICommunity } from '@commudle/shared-models';
import { IDataFormEntityResponseGroup } from '@commudle/shared-models';
import { ERegistrationStatuses } from '@commudle/shared-models';
import { IEvent } from '@commudle/shared-models';
import { SeoService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-rsvp',
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

  constructor(
    private dataFormEntityResponseGroupsService: DataFormEntityResponseGroupsService,
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
  ) {}

  ngOnInit() {
    this.seoService.setTitle('RSVP');
    this.seoService.noIndex(true);

    this.activatedRoute.queryParams.subscribe((data) => {
      this.token = data['token'];
      this.rsvpStatus = data['rsvp_status'];
      this.updateRSVPStatus();
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
}
