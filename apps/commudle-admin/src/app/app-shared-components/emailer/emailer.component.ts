import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  EemailTypes,
  ICommunity,
  IEvent,
  IEventDataFormEntityGroup,
  IEventSimpleRegistration,
} from '@commudle/shared-models';
import { EventsService, LibToastLogService } from '@commudle/shared-services';
import { NbWindowRef } from '@nebular/theme';
import { EmailsService } from 'apps/commudle-admin/src/app/services/emails.service';
import { EventDataFormEntityGroupsService } from 'apps/commudle-admin/src/app/services/event-data-form-entity-groups.service';
import { EventSimpleRegistrationsService } from 'apps/commudle-admin/src/app/services/event-simple-registrations.service';

@Component({
  selector: 'commudle-emailer',
  templateUrl: './emailer.component.html',
  styleUrls: ['./emailer.component.scss'],
})
export class EmailerComponent implements OnInit {
  EemailTypes = EemailTypes;

  // external properties received via windowRef
  community: ICommunity;
  event: IEvent;
  eventDataFormEntityGroupId: number;
  mailType: string;
  recipientEmail: string;

  prefillCompleted = false;

  selectedEvent: IEvent;
  selectedEventDataFormEntityGroup: IEventDataFormEntityGroup;
  eventSimpleRegistration: IEventSimpleRegistration;
  isEventSpecificEmail = false;
  selectedFormRegistrationType = [];
  selectedEmailType;

  events: IEvent[];
  eventDataFormEntityGroups: IEventDataFormEntityGroup[] = [];

  eMailForm = this.fb.group({
    members: ['', Validators.required],
    event_id: [''],
    event_data_form_entity_group_id: [''],
    event_simple_registration_id: [''],
    registration_selection_type: [''],
    resend: [false],
    recipient_email: [''],
    subject: ['', Validators.required],
    body: [''],
  });

  registrationSelectionType = {
    one_click_registration: [
      {
        value: EemailTypes.SEND_LINK,
        display: 'Send Form Link To All Members (Pre-formatted email)',
        preformatted_email: true,
      },
      {
        value: EemailTypes.ALL,
        display: 'All Who Registered',
      },
      {
        value: EemailTypes.ENTRY_PASS,
        display: 'Entry Pass (Pre-formatted email)',
        preformatted_email: true,
      },
      {
        value: EemailTypes.REGISTERED,
        display: 'Status: Registered',
      },
      {
        value: EemailTypes.WAITING,
        display: 'Status: Waiting',
      },
      {
        value: EemailTypes.SHORTLISTED,
        display: 'Status: Shortlisted',
      },
      {
        value: EemailTypes.CONFIRMED,
        display: 'Status: Confirmed',
      },
      {
        value: EemailTypes.CANCELED,
        display: 'Status: Canceled',
      },
      {
        value: EemailTypes.ATTENDED,
        display: 'All Who Attended',
      },
      {
        value: EemailTypes.NO_SHOW,
        display: 'Invited But No Show',
      },
    ],
    attendee: [
      {
        value: EemailTypes.SEND_LINK,
        display: 'Send Form Link To All Members (Pre-formatted email)',
        preformatted_email: true,
      },
      {
        value: EemailTypes.ALL,
        display: 'All Who Filled the Form',
      },
      {
        value: EemailTypes.REGISTERED,
        display: 'Status: Registered',
      },
      {
        value: EemailTypes.WAITING,
        display: 'Status: Waiting',
      },
      {
        value: EemailTypes.RSVP,
        display: 'RSVP (Pre-formatted email)',
        preformatted_email: true,
      },
      {
        value: EemailTypes.ENTRY_PASS,
        display: 'Entry Pass (Pre-formatted email)',
        preformatted_email: true,
      },
      {
        value: EemailTypes.CANCELED,
        display: 'Status: Canceled',
      },
      {
        value: EemailTypes.ATTENDED,
        display: 'All Who Attended',
      },
      {
        value: EemailTypes.UNINVITED,
        display: 'Uninvited Attendees',
      },
      {
        value: EemailTypes.NO_SHOW,
        display: 'Invited But No Show',
      },
    ],
    speaker: [
      {
        value: EemailTypes.SEND_LINK,
        display: 'Send Form Link To All Members (Pre-formatted email)',
        preformatted_email: true,
      },
      {
        value: EemailTypes.RSVP,
        display: 'RSVP (Pre-formatted email)',
        preformatted_email: true,
      },
      {
        value: EemailTypes.ENTRY_PASS,
        display: 'Entry Pass (Pre-formatted email)',
        preformatted_email: true,
      },
      {
        value: EemailTypes.CANCELED,
        display: 'Status: Canceled',
      },
      {
        value: EemailTypes.ATTENDED,
        display: 'All Who Attended',
      },
    ],
    feedback: [
      {
        value: EemailTypes.SEND_LINK,
        display: 'Send Link To Attendees (Pre-formatted email)',
        preformatted_email: true,
      },
      {
        value: EemailTypes.ALL,
        display: 'All Who Filled the Form',
      },
      // {
      //   value: EemailTypes.NOT_FILLED,
      //   display: 'Did Not Fill'
      // },
    ],
    communication: [
      {
        value: EemailTypes.SEND_LINK,
        display: 'Send Link To Those Who Filled Any Form For Selected Event ((Pre-formatted email)',
        preformatted_email: true,
      },
    ],
  };

  constructor(
    private fb: FormBuilder,
    private eventsService: EventsService,
    private eventDataFormEntityGroupsService: EventDataFormEntityGroupsService,
    private eventSimpleRegistrationsService: EventSimpleRegistrationsService,
    private emailsService: EmailsService,
    private toastLogService: LibToastLogService,
    protected windowRef: NbWindowRef,
  ) {}

  ngOnInit() {
    this.eventsService.communityEventsForEmail(this.community.id).subscribe((data) => {
      this.events = data.events;

      if (this.event) {
        this.prefillForm('event_id');
      } else {
        this.prefillForm('general_all');
      }

      if (this.recipientEmail) {
        this.prefillForm('recipient_email');
      }
    });
  }

  getEventDataFormEntityGroups(eventId) {
    this.eventDataFormEntityGroups = [];
    this.selectedFormRegistrationType = [];
    this.eMailForm.controls.registration_selection_type.reset();

    this.eventDataFormEntityGroupsService.getEventDataFormEntityGroups(eventId).subscribe((data) => {
      this.eventDataFormEntityGroups = data.event_data_form_entity_groups;
      this.prefillForm('event_data_form_entity_group_id');
    });
  }

  getEventSimpleRegistration(eventId) {
    this.eventDataFormEntityGroups = [];
    this.selectedFormRegistrationType = [];
    this.eMailForm.controls.registration_selection_type.reset();

    this.eventSimpleRegistrationsService.pGet(eventId).subscribe((data) => {
      this.eventSimpleRegistration = data;
      this.prefillForm('event_simple_registration');
      this.selectedFormRegistrationType = this.registrationSelectionType.one_click_registration;
      if (this.mailType && !this.prefillCompleted) {
        this.eMailForm.patchValue({
          registration_selection_type: this.mailType,
        });
        this.toggleEmailBodyValidation(this.mailType);
        this.prefillCompleted = true;
      }
    });
  }

  close() {
    this.windowRef.close();
  }

  toggleEventSpecificEmail($event) {
    // if not, then reset the form below the event select
    switch ($event) {
      case EemailTypes.GENERAL_ALL:
        this.selectedEmailType = EemailTypes.GENERAL_ALL;
        this.isEventSpecificEmail = false;

        this.eMailForm.get('body').setValidators(Validators.required);
        this.eMailForm.get('body').updateValueAndValidity();
        this.eventDataFormEntityGroups = [];
        this.selectedEvent = undefined;
        this.selectedEventDataFormEntityGroup = undefined;
        break;
      case 'event':
        this.isEventSpecificEmail = true;
        this.eMailForm.get('body').clearValidators();
        this.eMailForm.get('body').updateValueAndValidity();

        break;
      default:
        this.isEventSpecificEmail = false;
        break;
    }
  }

  toggleEventDataFormEntityGroupType($event) {
    this.selectedFormRegistrationType = [];
    this.selectedEventDataFormEntityGroup = this.eventDataFormEntityGroups.find((k) => k.id === $event);
    this.eventDataFormEntityGroupId = this.selectedEventDataFormEntityGroup.id;
    this.selectedFormRegistrationType =
      this.registrationSelectionType[this.selectedEventDataFormEntityGroup.registration_type.name];

    if (this.mailType && !this.prefillCompleted) {
      this.eMailForm.patchValue({
        registration_selection_type: this.mailType,
      });
      this.toggleEmailBodyValidation(this.mailType);
      this.prefillCompleted = true;
    }
  }

  toggleEmailBodyValidation($event) {
    this.selectedEmailType = $event;
    if (![EemailTypes.ENTRY_PASS, EemailTypes.SEND_LINK, EemailTypes.RSVP].includes($event)) {
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
        subjectLine = `ENTRY PASS :: ${this.event.name}`;
        break;
      case EemailTypes.SEND_LINK:
        if (this.selectedEventDataFormEntityGroup) {
          subjectLine = `${this.selectedEventDataFormEntityGroup.name} :: ${this.event.name}`;
        } else {
          subjectLine = `${this.event.name}  :: [${this.community.name}]`;
        }
        break;
      case EemailTypes.RSVP:
        subjectLine = `RSVP :: ${this.event.name} :: Reserve your seat`;
        break;
      default:
        subjectLine = '';
        break;
    }
    this.eMailForm.patchValue({
      subject: subjectLine,
    });
  }

  prefillForm(fieldToFill) {
    if (!this.prefillCompleted) {
      switch (fieldToFill) {
        case EemailTypes.GENERAL_ALL:
          this.eMailForm.patchValue({
            members: EemailTypes.GENERAL_ALL,
          });
          this.toggleEventSpecificEmail(EemailTypes.GENERAL_ALL);
          break;

        case 'event_id':
          if (this.event) {
            this.isEventSpecificEmail = true;

            this.eMailForm.patchValue({
              members: 'event',
              event_id: this.event.id,
            });

            if (this.event.custom_registration) {
              this.getEventDataFormEntityGroups(this.event.id);
            } else {
              this.getEventSimpleRegistration(this.event.id);
            }
          }

          break;

        case 'event_data_form_entity_group_id':
          if (this.eventDataFormEntityGroupId && !this.prefillCompleted) {
            this.selectedEventDataFormEntityGroup = this.eventDataFormEntityGroups.find(
              (k) => k.id === this.eventDataFormEntityGroupId,
            );
            this.eventSimpleRegistration = null;
            this.eMailForm.patchValue({
              event_data_form_entity_group_id: this.eventDataFormEntityGroupId,
            });
            this.toggleEventDataFormEntityGroupType(this.selectedEventDataFormEntityGroup.id);
          }
          break;

        case 'event_simple_registration':
          if (this.eventSimpleRegistration && !this.prefillCompleted) {
            this.selectedEventDataFormEntityGroup = null;
            this.eMailForm.patchValue({
              event_simple_registration_id: this.eventSimpleRegistration.id,
            });
          }
          break;
        case 'recipient_email':
          if (this.recipientEmail) {
            this.eMailForm.patchValue({
              recipient_email: this.recipientEmail,
            });
          }
          break;
        default:
          break;
      }
    }
  }

  submitForm() {
    this.emailsService.sendEmail(this.eMailForm.value, this.community.id).subscribe((data) => {
      this.close();
      this.toastLogService.successDialog('Emails are being delivered!');
    });
  }
}
