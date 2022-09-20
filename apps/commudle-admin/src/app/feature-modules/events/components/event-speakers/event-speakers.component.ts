import { Component, OnInit, Input } from '@angular/core';
import { IEvent } from '@commudle/shared-models';
import { ISpeakerResources } from '@commudle/shared-models';
import { FormBuilder, Validators } from '@angular/forms';
import { UserEventRegistrationsService } from 'apps/commudle-admin/src/app/services/user-event-registrations.service';
import { IUserEventRegistration } from '@commudle/shared-models';
import { LibToastLogService } from '@commudle/shared-services';
// this component holds the speakers when we have simple event agenda

@Component({
  selector: 'commudle-event-speakers',
  templateUrl: './event-speakers.component.html',
  styleUrls: ['./event-speakers.component.scss']
})
export class EventSpeakersComponent implements OnInit {
  @Input() event: IEvent;

  speakers: IUserEventRegistration[];

  speakerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(
    private fb: FormBuilder,
    private userEventRegistrationsService: UserEventRegistrationsService,
    private toastLogService: LibToastLogService
  ) { }

  ngOnInit() {
    this.getSpeakers();
  }

  getSpeakers() {
    this.userEventRegistrationsService.speakers(this.event.id).subscribe(
      data => {
        this.speakers = data.user_event_registrations;
      }
    );
  }

  addSpeaker() {
    this.userEventRegistrationsService.inviteAsSpeaker(this.event.id, this.speakerForm.get('email').value).subscribe(
      data => {
        this.speakers.push(data);
        this.speakerForm.reset();
        this.toastLogService.successDialog('Invitation sent by email');
      }
    );
  }

  resendRequest(speakerId) {
    this.userEventRegistrationsService.resendSpeakerInvitation(speakerId).subscribe(data => {
      this.toastLogService.successDialog('Invite Sent Again');
    });
  }

  removeSpeaker(speakerId, index) {
    this.userEventRegistrationsService.removeSpeaker(speakerId).subscribe(
      data => {
        this.speakers.splice(index, 1);
        this.toastLogService.successDialog('Removed');
      }
    );
  }

}
