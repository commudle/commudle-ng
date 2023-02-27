import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserEventRegistrationsService } from 'apps/commudle-admin/src/app/services/user-event-registrations.service';
import { IEvent } from 'apps/shared-models/event.model';
import { IUserEventRegistration } from 'apps/shared-models/user_event_registration.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';

// this component holds the speakers when we have simple event agenda

@Component({
  selector: 'app-event-speakers',
  templateUrl: './event-speakers.component.html',
  styleUrls: ['./event-speakers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventSpeakersComponent implements OnInit {
  @Input() event: IEvent;

  speakers: IUserEventRegistration[];

  speakerForm;

  constructor(
    private fb: FormBuilder,
    private userEventRegistrationsService: UserEventRegistrationsService,
    private toastLogService: LibToastLogService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.speakerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.getSpeakers();
  }

  getSpeakers() {
    this.userEventRegistrationsService.speakers(this.event.id).subscribe((data) => {
      this.speakers = data.user_event_registrations;
      this.changeDetectorRef.markForCheck();
    });
  }

  addSpeaker() {
    this.userEventRegistrationsService
      .inviteAsSpeaker(this.event.id, this.speakerForm.get('email').value)
      .subscribe((data) => {
        this.speakers.push(data);
        this.speakerForm.reset();
        this.toastLogService.successDialog('Invitation sent by email');
        this.changeDetectorRef.markForCheck();
      });
  }

  resendRequest(speakerId) {
    this.userEventRegistrationsService.resendSpeakerInvitation(speakerId).subscribe((data) => {
      this.toastLogService.successDialog('Invite Sent Again');
      this.changeDetectorRef.markForCheck();
    });
  }

  removeSpeaker(speakerId, index) {
    this.userEventRegistrationsService.removeSpeaker(speakerId).subscribe((data) => {
      this.speakers.splice(index, 1);
      this.toastLogService.successDialog('Removed');
      this.changeDetectorRef.markForCheck();
    });
  }
}
