import { UserEventRegistrationsService } from 'apps/commudle-admin/src/app/services/user-event-registrations.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICommunity } from '@commudle/shared-models';
import { IEvent } from '@commudle/shared-models';
import { DataFormEntityResponseGroupsService } from 'apps/commudle-admin/src/app/services/data-form-entity-response-groups.service';
import { IDataFormEntityResponseGroup } from '@commudle/shared-models';
import { IUserEventRegistration } from '@commudle/shared-models';

@Component({
  selector: 'commudle-speakers',
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
    if (this.event.custom_agenda || this.event.custom_registration) {
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
