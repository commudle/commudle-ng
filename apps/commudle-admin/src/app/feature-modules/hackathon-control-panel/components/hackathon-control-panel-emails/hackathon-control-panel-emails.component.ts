import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@commudle/theme';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';

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

  SendRegistrationsMailer() {
    this.hackathonService.inviteUserByEmail(this.hackathonId, this.message).subscribe((data) => {
      if (data) {
        this.dialogRef.close();
      }
    });
  }
}
