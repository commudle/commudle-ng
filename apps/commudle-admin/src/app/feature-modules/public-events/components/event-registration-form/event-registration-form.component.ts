import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICommunity } from 'apps/shared-models/community.model';
import { IEvent } from 'apps/shared-models/event.model';
import { EventDataFormEntityGroupsService } from 'apps/commudle-admin/src/app/services/event-data-form-entity-groups.service';
import { IEventDataFormEntityGroup } from 'apps/shared-models/event_data_form_enity_group.model';
import { ERegistationTypes } from 'apps/shared-models/enums/registration_types.enum';

@Component({
  selector: 'commudle-event-registration-form',
  templateUrl: './event-registration-form.component.html',
  styleUrls: ['./event-registration-form.component.scss'],
})
export class EventRegistrationFormComponent implements OnInit {
  @Input() community: ICommunity;
  @Input() event: IEvent;
  @Output() hasRegistrationForm = new EventEmitter();

  openForm: IEventDataFormEntityGroup;

  constructor(private eventDataFormEntityGroupsService: EventDataFormEntityGroupsService) {}

  ngOnInit(): void {
    this.getRegistrationForm();
  }

  getRegistrationForm() {
    if (this.event.editable) {
      this.eventDataFormEntityGroupsService.pGetPublicOpenDataForms(this.event.id).subscribe((data) => {
        this.openForm = data.event_data_form_entity_groups.find(
          (form) => form.registration_type.name === ERegistationTypes.ATTENDEE,
        );
        if (this.openForm) {
          this.hasRegistrationForm.emit(true);
        }
      });
    }
  }
}
