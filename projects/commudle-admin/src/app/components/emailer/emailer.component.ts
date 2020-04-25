import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ICommunity } from 'projects/shared-models/community.model';
import { IEvent } from 'projects/shared-models/event.model';
import { IEventDataFormEntityGroup } from 'projects/shared-models/event_data_form_enity_group.model';
import { EventsService } from '../../services/events.service';
import { NbWindowRef } from '@nebular/theme';
import { EventDataFormEntityGroupsService } from '../../services/event-data-form-entity-groups.service';
import { EemailTypes } from '../../../../../shared-models/enums/email_types.enum';
import { EmailsService } from '../../services/emails.service';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';

@Component({
  selector: 'app-emailer',
  templateUrl: './emailer.component.html',
  styleUrls: ['./emailer.component.scss']
})
export class EmailerComponent implements OnInit {

  EemailTypes = EemailTypes;

  // external properties received via windowRef
  community: ICommunity;
  event: IEvent;
  eventDataFormEntityGroupId: number;
  mailType: string;

  prefillCompleted = false;


  selectedEvent: IEvent;
  selectedEventDataFormEntityGroup: IEventDataFormEntityGroup;
  isEventSpecificEmail = false;
  selectedFormRegistrationType = [];
  selectedEmailType;

  events: IEvent[];
  eventDataFormEntityGroups: IEventDataFormEntityGroup[] = [];

  eMailForm = this.fb.group({
    members: ['', Validators.required],
    event_id: [''],
    event_data_form_entity_group_id: [''],
    registration_selection_type: [''],
    resend: [false],
    recipient_email: [''],
    subject: ['', Validators.required],
    body: ['']
  });


  registrationSelectionType = {
    attendee: [
      {
        value: EemailTypes.SEND_LINK,
        display: 'Send Link (Pre-formatted email)',
        preformatted_email: true
      },
      {
        value: EemailTypes.ALL,
        display: 'All Who Filled the Form'
      },
      {
        value: EemailTypes.REGISTERED,
        display: 'Status: Registered'
      },
      {
        value: EemailTypes.WAITING,
        display: 'Status: Waiting'
      },
      {
        value: EemailTypes.RSVP,
        display: 'RSVP (Pre-formatted email)',
        preformatted_email: true
      },
      {
        value: EemailTypes.ENTRY_PASS,
        display: 'Entry Pass (Pre-formatted email)',
        preformatted_email: true
      },
      {
        value: EemailTypes.CANCELED,
        display: 'Status: Canceled'
      },
      {
        value: EemailTypes.ATTENDED,
        display: 'All Who Attended'
      },
      {
        value: EemailTypes.UNINVITED,
        display: 'Uninvited Attendees'
      },
      {
        value: EemailTypes.NO_SHOW,
        display: 'Invited But No Show'
      }
    ],
    speaker: [
      {
        value: EemailTypes.SEND_LINK,
        display: 'Send Link (Pre-formatted email)',
        preformatted_email: true
      },
      {
        value: EemailTypes.RSVP,
        display: 'RSVP (Pre-formatted email)',
        preformatted_email: true
      },
      {
        value: EemailTypes.ENTRY_PASS,
        display: 'Entry Pass (Pre-formatted email)',
        preformatted_email: true
      },
      {
        value: EemailTypes.CANCELED,
        display: 'Status: Canceled'
      },
      {
        value: EemailTypes.ATTENDED,
        display: 'All Who Attended'
      }
    ],
    feedback: [
      {
        value: EemailTypes.SEND_LINK,
        display: 'Send Link To Attendees (Pre-formatted email)',
        preformatted_email: true
      },
      {
        value: EemailTypes.ALL,
        display: 'All Who Filled the Form'
      },
      {
        value: EemailTypes.NOT_FILLED,
        display: 'Did Not Fill'
      },
    ],
    communication: [
      {
        value: EemailTypes.SEND_LINK,
        display: 'Send Link To Those Who Filled Any Form For Selected Event ((Pre-formatted email)',
        preformatted_email: true
      }
    ]
  };

  constructor(
    private fb: FormBuilder,
    private eventsService: EventsService,
    private eventDataFormEntityGroupsService: EventDataFormEntityGroupsService,
    private emailsService: EmailsService,
    private toastLogService: LibToastLogService,
    protected windowRef: NbWindowRef
  ) { }

  ngOnInit() {

    this.eventsService.community_events_for_email(this.community.id).subscribe(data => {
      this.events = data.events;
      this.prefillForm('event_id');
    });

  }

  getEventDataFormEntityGroups(eventId) {
    this.eventDataFormEntityGroups = [];
    this.selectedFormRegistrationType = [];
    this.eMailForm.controls.registration_selection_type.reset();


    this.eventDataFormEntityGroupsService.getEventDataFormEntityGroups(eventId).subscribe(data => {
      this.eventDataFormEntityGroups = data.event_data_form_entity_groups;
      this.prefillForm('event_data_form_entity_group_id');
    });
  }

  close() {
    this.windowRef.close();
  }

  toggleEventSpecificEmail($event) {
    // if not, then reset the form below the event select
    switch ($event) {
      case 'all':
        this.isEventSpecificEmail = false;
        this.eMailForm.reset();

        this.eventDataFormEntityGroups = [];
        this.selectedEvent = undefined;
        this.selectedEventDataFormEntityGroup = undefined;
        this.selectedEmailType = undefined;
        this.eMailForm.controls['body'].setValidators([Validators.required]);
        console.log('here');
        break;
      case 'event':
        this.isEventSpecificEmail = true;
        this.eMailForm.controls['body'].clearValidators();
        break;
      default:
        this.isEventSpecificEmail = false;
        break;
    }
  }


  toggleEventDataFormEntityGroupType($event) {
    this.selectedFormRegistrationType = [];
    this.selectedEventDataFormEntityGroup = this.eventDataFormEntityGroups.find(k => k.id === $event);
    this.eventDataFormEntityGroupId = this.selectedEventDataFormEntityGroup.id;
    this.selectedFormRegistrationType = this.registrationSelectionType[this.selectedEventDataFormEntityGroup.registration_type.name];

    if (this.mailType && !this.prefillCompleted) {
      this.eMailForm.patchValue({
        registration_selection_type: this.mailType
      });
      this.toggleEmailBodyValidation(this.mailType);
      this.prefillCompleted = true;
    }
  }


  toggleEmailBodyValidation($event) {
    this.selectedEmailType = $event;
    if (!([EemailTypes.ENTRY_PASS, EemailTypes.SEND_LINK, EemailTypes.RSVP].includes($event))) {
      this.eMailForm.controls['body'].setValidators([Validators.required]);
    } else {
      this.eMailForm.controls['body'].clearValidators();

    }
    this.setEmailSubject($event);
  }


  setEmailSubject(emailType) {
    let subjectLine = '';
    switch (emailType) {
      case EemailTypes.ENTRY_PASS:
        subjectLine = `ENTRY PASS :: [${this.community.name}] :: ${this.event.name}`;
        break;
      case EemailTypes.SEND_LINK:
        subjectLine = `${this.selectedEventDataFormEntityGroup.name}  :: [${this.community.name}] :: ${this.event.name}`
        break;
      case EemailTypes.RSVP:
        subjectLine = `RSVP :: [${this.community.name}] :: ${this.event.name}`;
        break;
      default:
        subjectLine = '';
        break;
    }
    console.log(emailType);
    this.eMailForm.patchValue({
      subject: subjectLine
    });
  }



  prefillForm(fieldToFill) {

    if (!this.prefillCompleted) {
      switch (fieldToFill) {
        case 'event_id':
          if (this.event) {
            this.isEventSpecificEmail = true;

            this.eMailForm.patchValue({
              members: 'event',
              event_id: this.event.id
            });
          }
          this.getEventDataFormEntityGroups(this.event.id);
          break;

        case 'event_data_form_entity_group_id':
          if (this.eventDataFormEntityGroupId && !this.prefillCompleted) {
            this.selectedEventDataFormEntityGroup = this.eventDataFormEntityGroups.find(k => k.id == this.eventDataFormEntityGroupId);
            this.eMailForm.patchValue({
              event_data_form_entity_group_id: this.eventDataFormEntityGroupId
            });
            this.toggleEventDataFormEntityGroupType(this.selectedEventDataFormEntityGroup.id);
          }
        default:
          break;
      }
    }
  }

  submitForm() {
    this.emailsService.sendEmail(this.eMailForm.value, this.community.id).subscribe(data => {
      this.toastLogService.successDialog('Emails are being delivered!');
    });
  }




}
