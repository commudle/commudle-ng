import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IDataFormEntityResponseGroup } from 'projects/shared-models/data_form_entity_response_group.model';
import { IUser } from 'projects/shared-models/user.model';
import { IRegistrationStatus } from 'projects/shared-models/registration_status.model';
import { faGithub, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { IRegistrationType } from 'projects/shared-models/registration_type.model';
import { DataFormEntityResponseGroupsService } from 'projects/commudle-admin/src/app/services/data-form-entity-response-groups.service';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { EventEntryPassesService } from 'projects/commudle-admin/src/app/services/event-entry-passes.service';

@Component({
  selector: 'app-user-details-cell',
  templateUrl: './user-details-cell.component.html',
  styleUrls: ['./user-details-cell.component.scss']
})
export class UserDetailsCellComponent implements OnInit {
  faGithub = faGithub;
  faTwitter = faTwitter;
  faLinkedin = faLinkedin;
  faInfo = faInfo;

  @Input() registrationType: IRegistrationType;
  @Input() registrationStatuses: IRegistrationStatus[];
  @Input() userResponse: IDataFormEntityResponseGroup;
  user: IUser;

  @Output() updatedRegistrationStatus = new EventEmitter();
  @Output() updateEntryPass = new EventEmitter();

  constructor(
    private dataFormEntityResponseGroupsService: DataFormEntityResponseGroupsService,
    private toastLogService: LibToastLogService,
    private eventEntryPassesService: EventEntryPassesService
  ) { }

  ngOnInit() {
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

}
