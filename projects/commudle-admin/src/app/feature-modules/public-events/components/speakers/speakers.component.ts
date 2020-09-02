import { UserEventRegistrationsService } from 'projects/commudle-admin/src/app/services/user-event-registrations.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICommunity } from 'projects/shared-models/community.model';
import { IEvent } from 'projects/shared-models/event.model';
import { DataFormEntityResponseGroupsService } from 'projects/commudle-admin/src/app/services/data-form-entity-response-groups.service';
import { IDataFormEntityResponseGroup } from 'projects/shared-models/data_form_entity_response_group.model';
import { IUserEventRegistration } from 'projects/shared-models/user_event_registration.model';

@Component({
  selector: 'app-speakers',
  templateUrl: './speakers.component.html',
  styleUrls: ['./speakers.component.scss']
})
export class SpeakersComponent implements OnInit {
  @Input() community: ICommunity;
  @Input() event: IEvent;
  @Output() hasSpeakers = new EventEmitter();

  speakers: IDataFormEntityResponseGroup[] = [];
  simpleAgendaSpeakers: IUserEventRegistration[] = [];

  constructor(
    private dataFormEntityResponseGroupsService: DataFormEntityResponseGroupsService,
    private userEventRegistrationsService: UserEventRegistrationsService
  ) { }

  ngOnInit() {
    if (this.event.custom_agenda) {
      this.getCustomAgendaSpeakers();
    } else {
      this.getSimpleAgendaSpeakers();
    }
  }

  getCustomAgendaSpeakers() {
    this.dataFormEntityResponseGroupsService.pGetEventSpeakers(this.event.id).subscribe(
      data => {
        this.speakers = data.data_form_entity_response_groups;
        if (this.speakers.length > 0) {
          this.hasSpeakers.emit(true);
        }
      }
    );
  }

  getSimpleAgendaSpeakers() {
    this.userEventRegistrationsService.pSpeakers(this.event.slug).subscribe(
      data => {
        this.simpleAgendaSpeakers = data.user_event_registrations;
      }
    );
  }

}
