import { ToastrService } from '@commudle/shared-services';
import { Component, Input } from '@angular/core';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { NbDialogRef } from '@commudle/theme';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'commudle-hackathon-winner-announcement-emailer',
  templateUrl: './hackathon-winner-announcement-emailer.component.html',
  styleUrls: ['./hackathon-winner-announcement-emailer.component.scss'],
})
export class HackathonWinnerAnnouncementEmailerComponent {
  @Input() hackathonId: number;
  message = '';
  faXmark = faXmark;
  isLoading = false;
  constructor(
    private hackathonService: HackathonService,
    private toastrService: ToastrService,
    protected dialogRef: NbDialogRef<HackathonWinnerAnnouncementEmailerComponent>,
  ) {}

  SendWinnerAnnouncementMailer() {
    this.isLoading = true;
    this.hackathonService.WinnerAnnouncementEmail(this.hackathonId, this.message).subscribe((data) => {
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
