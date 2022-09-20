import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { NbWindowService } from '@nebular/theme';
import { EmailerComponent } from 'apps/commudle-admin/src/app/app-shared-components/emailer/emailer.component';
import { DataFormEntityResponseGroupsService } from 'apps/commudle-admin/src/app/services/data-form-entity-response-groups.service';
import { EventEntryPassesService } from 'apps/commudle-admin/src/app/services/event-entry-passes.service';
import { ICommunity } from '@commudle/shared-models';
import { IDataFormEntityResponseGroup } from '@commudle/shared-models';
import { EemailTypes } from '@commudle/shared-models';
import { IEvent } from '@commudle/shared-models';
import { IRegistrationStatus } from '@commudle/shared-models';
import { IRegistrationType } from '@commudle/shared-models';
import { IUser } from '@commudle/shared-models';
import { LibToastLogService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-user-details-cell',
  templateUrl: './user-details-cell.component.html',
  styleUrls: ['./user-details-cell.component.scss'],
})
export class UserDetailsCellComponent implements OnInit, OnChanges {
  faGithub = faGithub;
  faTwitter = faTwitter;
  faLinkedin = faLinkedin;
  faInfo = faInfo;

  @Input() community: ICommunity;
  @Input() event: IEvent;
  @Input() registrationType: IRegistrationType;
  @Input() registrationStatuses: IRegistrationStatus[];
  @Input() userResponse: IDataFormEntityResponseGroup;
  @Input() eventDataFormEntityGroupId;
  user: IUser;

  @Output() updatedRegistrationStatus = new EventEmitter();
  @Output() updateEntryPass = new EventEmitter();

  constructor(
    private dataFormEntityResponseGroupsService: DataFormEntityResponseGroupsService,
    private toastLogService: LibToastLogService,
    private eventEntryPassesService: EventEntryPassesService,
    private windowService: NbWindowService,
  ) {}

  ngOnInit() {
    this.user = this.userResponse.user;
  }

  ngOnChanges() {
    this.user = this.userResponse.user;
  }

  updateRegistrationStatus(registrationStatusId) {
    this.dataFormEntityResponseGroupsService
      .updateEventRegistrationStatus(registrationStatusId, this.userResponse.id)
      .subscribe((data) => {
        this.updatedRegistrationStatus.emit(data);
        this.toastLogService.successDialog('Updated!');
      });
  }

  generateEntryPass() {
    this.eventEntryPassesService.createEntryPass(this.userResponse.id).subscribe((data) => {
      this.updateEntryPass.emit(data);
      this.toastLogService.successDialog('Entry Pass Added!');
    });
  }

  toggleAttendance() {
    this.eventEntryPassesService.toggleAttendance(this.userResponse.entry_pass.id).subscribe((data) => {
      this.updateEntryPass.emit(data);
      this.toastLogService.successDialog('Attendance Updated!');
    });
  }

  toggleUninvited() {
    this.eventEntryPassesService.toggleUninvited(this.userResponse.entry_pass.id).subscribe((data) => {
      this.updateEntryPass.emit(data);
      this.toastLogService.successDialog('Uninvited Status Updated!');
    });
  }

  openGeneralEmailWindow() {
    this.windowService.open(EmailerComponent, {
      title: `Send Email To ${this.user.name}`,
      context: {
        community: this.community,
        mailType: EemailTypes.GENERAL_ALL,
        recipientEmail: this.user.email,
      },
    });
  }

  openRSVPEmailWindow() {
    this.windowService.open(EmailerComponent, {
      title: `Send RSVP To ${this.user.name}`,
      context: {
        community: this.community,
        event: this.event,
        eventDataFormEntityGroupId: this.eventDataFormEntityGroupId,
        mailType: EemailTypes.RSVP,
        recipientEmail: this.user.email,
      },
    });
  }

  openEntryPassEmailWindow() {
    this.windowService.open(EmailerComponent, {
      title: `Send Entry Pass To ${this.user.name}`,
      context: {
        community: this.community,
        event: this.event,
        eventDataFormEntityGroupId: this.eventDataFormEntityGroupId,
        mailType: EemailTypes.ENTRY_PASS,
        recipientEmail: this.user.email,
      },
    });
  }
}
