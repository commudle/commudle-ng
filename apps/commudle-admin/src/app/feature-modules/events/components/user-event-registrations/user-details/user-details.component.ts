import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { faGithub, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { ICommunity } from '@commudle/shared-models';
import { IEvent } from '@commudle/shared-models';
import { IRegistrationStatus } from '@commudle/shared-models';
import { IUserEventRegistration } from '@commudle/shared-models';
import { IUser } from '@commudle/shared-models';
import { LibToastLogService } from '@commudle/shared-services';
import { NbWindowService } from '@nebular/theme';
import { EventEntryPassesService } from 'apps/commudle-admin/src/app/services/event-entry-passes.service';
import { UserEventRegistrationsService } from 'apps/commudle-admin/src/app/services/user-event-registrations.service';
import { EemailTypes } from '@commudle/shared-models';
import { EmailerComponent } from 'apps/commudle-admin/src/app/app-shared-components/emailer/emailer.component';

@Component({
  selector: 'commudle-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnChanges {
  faGithub = faGithub;
  faTwitter = faTwitter;
  faLinkedin = faLinkedin;
  faInfo = faInfo;

  @Input() community: ICommunity;
  @Input() event: IEvent;
  @Input() registrationStatuses: IRegistrationStatus[];
  @Input() userResponse: IUserEventRegistration;
  user: IUser;


  @Output() updatedRegistrationStatus = new EventEmitter();
  @Output() updateEntryPass = new EventEmitter();


  constructor(
    private userEventRegistrationsService: UserEventRegistrationsService,
    private toastLogService: LibToastLogService,
    private eventEntryPassesService: EventEntryPassesService,
    private windowService: NbWindowService
  ) { }

  ngOnInit() {
    this.user = this.userResponse.user;
  }

  ngOnChanges() {
    this.user = this.userResponse.user;
  }


  updateRegistrationStatus(registrationStatusId) {
    this.userEventRegistrationsService.updateRegistrationStatus(
      this.userResponse.id, registrationStatusId
    ).subscribe(data => {
      this.updatedRegistrationStatus.emit(data);
      this.toastLogService.successDialog("Updated!");

    });
  }


  generateEntryPass() {
    this.eventEntryPassesService.createUserEventRegistrationEntryPass(this.userResponse.id).subscribe(
      data => {
        this.updateEntryPass.emit(data);
        this.toastLogService.successDialog('Entry Pass Added!');
      }
    );
  }

  toggleAttendance() {
    this.eventEntryPassesService.toggleAttendance(this.userResponse.entry_pass.id).subscribe(
      data => {
        this.updateEntryPass.emit(data);
        this.toastLogService.successDialog('Attendance Updated!');
      }
    );
  }


  toggleUninvited() {
    this.eventEntryPassesService.toggleUninvited(this.userResponse.entry_pass.id).subscribe(
      data => {
        this.updateEntryPass.emit(data);
        this.toastLogService.successDialog('Uninvited Status Updated!');
      }
    );
  }


  openEntryPassEmailWindow() {
    this.windowService.open(
      EmailerComponent,
      {
        title: `Send Entry Pass To ${this.user.name}`,
        context: {
          community: this.community,
          event: this.event,
          mailType: EemailTypes.ENTRY_PASS,
          recipientEmail: this.user.email
        }
      }
    );

  }


}
