import { UserEventRegistrationsService } from 'apps/commudle-admin/src/app/services/user-event-registrations.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICommunity } from 'apps/shared-models/community.model';
import { IEvent } from 'apps/shared-models/event.model';
import { DataFormEntityResponseGroupsService } from 'apps/commudle-admin/src/app/services/data-form-entity-response-groups.service';
import { IDataFormEntityResponseGroup } from 'apps/shared-models/data_form_entity_response_group.model';
import { IUserEventRegistration } from 'apps/shared-models/user_event_registration.model';

@Component({
  selector: 'app-speakers',
  templateUrl: './speakers.component.html',
  styleUrls: ['./speakers.component.scss'],
})
export class SpeakersComponent implements OnInit {
  @Input() community: ICommunity;
  @Input() event: IEvent;

  viewMoreSection = true;
  footerText = 'View More';
  isLoading = true;

  speakers: IDataFormEntityResponseGroup[] = [];
  simpleAgendaSpeakers: IUserEventRegistration[] = [];

  constructor(
    private dataFormEntityResponseGroupsService: DataFormEntityResponseGroupsService,
    private userEventRegistrationsService: UserEventRegistrationsService,
  ) {}

  ngOnInit() {
    if (this.event.custom_agenda || this.event.custom_registration) {
      this.getCustomAgendaSpeakers();
    } else {
      this.getSimpleAgendaSpeakers();
    }
  }

  getCustomAgendaSpeakers() {
    this.dataFormEntityResponseGroupsService.pGetEventSpeakers(this.event.id).subscribe((data) => {
      this.speakers = data.data_form_entity_response_groups;
      this.isLoading = false;
      this.footerText = `View More (${this.speakers.length - 5})`;
    });
  }

  getSimpleAgendaSpeakers() {
    this.userEventRegistrationsService.pSpeakers(this.event.slug).subscribe((data) => {
      this.simpleAgendaSpeakers = data.user_event_registrations;
      this.footerText = `View More (${this.simpleAgendaSpeakers.length - 5})`;
    });
  }

  viewMore() {
    this.viewMoreSection = !this.viewMoreSection;
    if (!this.viewMoreSection) {
      this.footerText = `View Less`;
    } else {
      this.footerText = `View More (${this.speakers.length + this.simpleAgendaSpeakers.length - 5})`;
    }
  }
}
