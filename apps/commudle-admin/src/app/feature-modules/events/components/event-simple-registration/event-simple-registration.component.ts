import { Component, OnInit, Input } from '@angular/core';
import { IEvent } from '@commudle/shared-models';
import { EventSimpleRegistrationsService } from 'apps/commudle-admin/src/app/services/event-simple-registrations.service';
import { IEventSimpleRegistration, EEventSimpleRegistrationStatuses } from '@commudle/shared-models';
import { NbWindowService } from '@nebular/theme';
import { EemailTypes } from '@commudle/shared-models';
import { ICommunity } from '@commudle/shared-models';
import { EmailerComponent } from 'apps/commudle-admin/src/app/app-shared-components/emailer/emailer.component';

@Component({
  selector: 'commudle-event-simple-registration',
  templateUrl: './event-simple-registration.component.html',
  styleUrls: ['./event-simple-registration.component.scss']
})
export class EventSimpleRegistrationComponent implements OnInit {
  @Input() community: ICommunity;
  @Input() event: IEvent;
  EEventSimpleRegistrationStatuses = EEventSimpleRegistrationStatuses;


  eventSimpleRegistration: IEventSimpleRegistration;

  constructor(
    private eventSimpleRegistrationService: EventSimpleRegistrationsService,
    private windowService: NbWindowService
  ) { }

  ngOnInit() {
    this.getEventSimpleRegistration();
  }


  getEventSimpleRegistration() {
    this.eventSimpleRegistrationService.findOrCreate(this.event.id).subscribe(data => {
      this.eventSimpleRegistration = data;
    });
  }

  toggleRegistration() {
    this.eventSimpleRegistrationService.toggleStatus(this.eventSimpleRegistration.id).subscribe(data => {
      this.eventSimpleRegistration = data;
    });
  }

  openEmailWindow() {
    this.windowService.open(
      EmailerComponent,
      {
        title: `Send Registration Link`,
        context: {
          community: this.community,
          event: this.event,
          mailType: (this.event.editable ? EemailTypes.SEND_LINK : '')
        }
      }
    );
  }

}
