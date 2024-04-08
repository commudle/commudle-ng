import { Component, Input } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from '@commudle/shared-services';
import { NbDialogRef } from '@commudle/theme';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { EInvitationStatus } from 'apps/shared-models/hackathon-user-response.model';

@Component({
  selector: 'commudle-hackathon-status-filter-general-emails',
  templateUrl: './hackathon-status-filter-general-emails.component.html',
  styleUrls: ['./hackathon-status-filter-general-emails.component.scss'],
})
export class HackathonStatusFilterGeneralEmailsComponent {
  @Input() hackathonId: number;
  message = '';
  emailReason = '';
  faXmark = faXmark;
  isLoading = false;
  selectedRecipient = 'all';
  EInvitationStatus = EInvitationStatus;
  selectedStatus = '';

  constructor(
    private hackathonService: HackathonService,
    private toastrService: ToastrService,
    protected dialogRef: NbDialogRef<HackathonStatusFilterGeneralEmailsComponent>,
  ) {}

  SendStatusFilterGeneralMailer() {
    this.isLoading = true;
    this.hackathonService
      .StatusFilterGeneralEmail(this.hackathonId, this.message, this.emailReason, this.selectedStatus)
      .subscribe((data) => {
        if (data) {
          this.toastrService.successDialog('Emails sent');
          this.closeDialogBox();
          this.isLoading = false;
        }
      });
  }

  closeDialogBox() {
    this.dialogRef.close();
  }
}
