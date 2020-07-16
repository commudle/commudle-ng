import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { IDataFormEntityResponseGroup } from 'projects/shared-models/data_form_entity_response_group.model';
import { IUser } from 'projects/shared-models/user.model';
import { IRegistrationStatus } from 'projects/shared-models/registration_status.model';
import { faGithub, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { IRegistrationType } from 'projects/shared-models/registration_type.model';
import { DataFormEntityResponseGroupsService } from 'projects/commudle-admin/src/app/services/data-form-entity-response-groups.service';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { EventEntryPassesService } from 'projects/commudle-admin/src/app/services/event-entry-passes.service';
import { NbWindowService } from '@nebular/theme';
import { EemailTypes } from 'projects/shared-models/enums/email_types.enum';
import { ICommunity } from 'projects/shared-models/community.model';
import { IEvent } from 'projects/shared-models/event.model';
import { EmailerComponent } from 'projects/commudle-admin/src/app/app-shared-components/emailer/emailer.component';

@Component({
  selector: 'app-user-details-cell',
  templateUrl: './user-details-cell.component.html',
  styleUrls: ['./user-details-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
    private windowService: NbWindowService
  ) { }

  ngOnInit() {
    this.user = this.userResponse.user;
  }

  ngOnChanges() {
    this.user = this.userResponse.user;
  }

  updateRegistrationStatus(registrationStatusId) {
    this.dataFormEntityResponseGroupsService.updateEventRegistrationStatus(
      registrationStatusId, this.userResponse.id
    ).subscribe(data => {
      this.updatedRegistrationStatus.emit(data);
      this.toastLogService.successDialog("Updated!");

    });
  }

  generateEntryPass() {
    this.eventEntryPassesService.createEntryPass(this.userResponse.id).subscribe(
      data => {
        this.updateEntryPass.emit(data);
        this.toastLogService.successDialog("Entry Pass Added!");
      }
    );
  }

  toggleAttendance() {
    this.eventEntryPassesService.toggleAttendance(this.userResponse.entry_pass.id).subscribe(
      data => {
        this.updateEntryPass.emit(data);
        this.toastLogService.successDialog("Attendance Updated!");
      }
    );
  }


  toggleUninvited() {
    this.eventEntryPassesService.toggleUninvited(this.userResponse.entry_pass.id).subscribe(
      data => {
        this.updateEntryPass.emit(data);
        this.toastLogService.successDialog("Uninvited Status Updated!");
      }
    );

  }


  openGeneralEmailWindow() {
    this.windowService.open(
      EmailerComponent,
      {
        title: `Send Email To ${this.user.name}`,
        context: {
          community: this.community,
          mailType: EemailTypes.GENERAL_ALL,
          recipientEmail: this.user.email
        }
      }
    );
  }


  openRSVPEmailWindow() {
    this.windowService.open(
      EmailerComponent,
      {
        title: `Send RSVP To ${this.user.name}`,
        context: {
          community: this.community,
          event: this.event,
          eventDataFormEntityGroupId: this.eventDataFormEntityGroupId,
          mailType: EemailTypes.RSVP,
          recipientEmail: this.user.email
        }
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
          eventDataFormEntityGroupId: this.eventDataFormEntityGroupId,
          mailType: EemailTypes.ENTRY_PASS,
          recipientEmail: this.user.email
        }
      }
    );

  }

}
