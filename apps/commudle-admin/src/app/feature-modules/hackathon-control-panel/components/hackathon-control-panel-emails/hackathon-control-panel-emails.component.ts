/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@commudle/theme';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { HackathonWinnerAnnouncementEmailerComponent } from 'apps/commudle-admin/src/app/feature-modules/hackathon-control-panel/components/hackathon-control-panel-emails/hackathon-winner-announcement-emailer/hackathon-winner-announcement-emailer.component';
import { HackathonStatusFilterGeneralEmailsComponent } from 'apps/commudle-admin/src/app/feature-modules/hackathon-control-panel/components/hackathon-control-panel-emails/hackathon-status-filter-general-emails/hackathon-status-filter-general-emails.component';
import { HackathonOverallRoundSelectionUpdateEmailComponent } from 'apps/commudle-admin/src/app/feature-modules/hackathon-control-panel/components/hackathon-control-panel-emails/hackathon-overall-round-selection-update-email/hackathon-overall-round-selection-update-email.component';
@Component({
  selector: 'commudle-hackathon-control-panel-emails',
  templateUrl: './hackathon-control-panel-emails.component.html',
  styleUrls: ['./hackathon-control-panel-emails.component.scss'],
})
export class HackathonControlPanelEmailsComponent implements OnInit {
  hackathonId: number | string;
  message: string;
  dialogRef: NbDialogRef<any>;

  constructor(
    private nbDialogService: NbDialogService,
    private hackathonService: HackathonService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activatedRoute.parent.paramMap.subscribe((params) => {
      this.hackathonId = params.get('hackathon_id');
    });
  }

  openDialogBox(dialog) {
    this.dialogRef = this.nbDialogService.open(dialog);
  }

  openDialogBoxForWinnerAnnouncement(hackathonId) {
    this.dialogRef = this.nbDialogService.open(HackathonWinnerAnnouncementEmailerComponent, {
      context: { hackathonId },
    });
  }

  openDialogBoxForStatusFilterGeneralEmail(hackathonId) {
    this.dialogRef = this.nbDialogService.open(HackathonStatusFilterGeneralEmailsComponent, {
      context: { hackathonId },
    });
  }

  SendRegistrationsMailer() {
    this.hackathonService.inviteUserByEmail(this.hackathonId, this.message).subscribe((data) => {
      if (data) {
        this.dialogRef.close();
      }
    });
  }

  openRoundSelectionUpdateEmailDialogBox() {
    this.dialogRef = this.nbDialogService.open(HackathonOverallRoundSelectionUpdateEmailComponent, {
      context: {
        hackathonId: this.hackathonId,
      },
    });
  }
}
