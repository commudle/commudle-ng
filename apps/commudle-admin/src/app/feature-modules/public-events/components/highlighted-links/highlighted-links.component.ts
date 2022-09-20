import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICommunity } from '@commudle/shared-models';
import { IEvent } from '@commudle/shared-models';
import { EventDataFormEntityGroupsService } from 'apps/commudle-admin/src/app/services/event-data-form-entity-groups.service';
import { IEventDataFormEntityGroup } from '@commudle/shared-models';
import { ERegistationTypes } from '@commudle/shared-models';
import { Router } from '@angular/router';
import { EventSimpleRegistrationsService } from 'apps/commudle-admin/src/app/services/event-simple-registrations.service';
import { IEventSimpleRegistration, EEventSimpleRegistrationStatuses } from '@commudle/shared-models';
import { UserEventRegistrationsService } from 'apps/commudle-admin/src/app/services/user-event-registrations.service';
import { ERegistrationStatuses } from '@commudle/shared-models';
import { IUserEventRegistration } from '@commudle/shared-models';


@Component({
  selector: 'commudle-highlighted-links',
  templateUrl: './highlighted-links.component.html',
  styleUrls: ['./highlighted-links.component.scss']
})
export class HighlightedLinksComponent implements OnInit {
  ERegistationTypes = ERegistationTypes;
  EEventSimpleRegistrationStatuses = EEventSimpleRegistrationStatuses;
  ERegistrationStatuses = ERegistrationStatuses;

  @Input() community: ICommunity;
  @Input() event: IEvent;
  @Output() hasOpenForms = new EventEmitter();

  openForms: IEventDataFormEntityGroup[] = [];
  eventSimpleRegistration: IEventSimpleRegistration;
  userEventRegistration: IUserEventRegistration;
  currentRoute;

  constructor(
    private eventDataFormEntityGroupsService: EventDataFormEntityGroupsService,
    private eventSimpleRegistrationsService: EventSimpleRegistrationsService,
    private userEventRegistrationsService: UserEventRegistrationsService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.event.custom_registration && this.event.editable) {
      this.getEventSimpleRegistration();
      this.getUserEventRegistration();
    } else {
      this.getOpenForms();
    }


    this.currentRoute = encodeURIComponent(this.router.url);
  }

  getOpenForms() {

    if (this.event.editable) {
      this.eventDataFormEntityGroupsService.pGetPublicOpenDataForms(this.event.id).subscribe(
        data => {
          this.openForms = data.event_data_form_entity_groups;
          if (this.openForms.length > 0) {
            this.hasOpenForms.emit(true);
          }
        }
      );
    }
  }

  getEventSimpleRegistration() {
    this.eventSimpleRegistrationsService.pGet(this.event.id).subscribe(
      data => {
        if (data) {
          this.eventSimpleRegistration = data;
          this.hasOpenForms.emit(true);
        }
      }
    );
  }

  toggleUserEventRegistration() {
    this.userEventRegistrationsService.pToggle(this.eventSimpleRegistration.id).subscribe(
      data => {
        this.userEventRegistration = data;
        if (data.registration_status.name === ERegistrationStatuses.CANCELLED) {
          this.eventSimpleRegistration.current_user_registered = false;
        } else {
          this.eventSimpleRegistration.current_user_registered = true;
        }
      }
    );
  }

  getUserEventRegistration() {
    this.userEventRegistrationsService.pShow(this.event.id).subscribe(
      data => {
        this.userEventRegistration = data;
      }
    );
  }

}
