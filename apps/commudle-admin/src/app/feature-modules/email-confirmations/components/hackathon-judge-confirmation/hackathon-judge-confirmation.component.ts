import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from '@commudle/shared-services';
import { NbDialogService } from '@commudle/theme';
import { UserConsentsComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-consents/user-consents.component';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { ConsentTypesEnum } from 'apps/shared-models/enums/consent-types.enum';
import { IHackathonJudge, EInvitationStatus } from 'apps/shared-models/hackathon-judge.model';
import { IHackathon } from 'apps/shared-models/hackathon.model';

@Component({
  selector: 'commudle-hackathon-judge-confirmation',
  templateUrl: './hackathon-judge-confirmation.component.html',
  styleUrls: ['./hackathon-judge-confirmation.component.scss'],
})
export class HackathonJudgeConfirmationComponent implements OnInit {
  token: string;
  hackathon: IHackathon;
  judge: IHackathonJudge;
  roleName = 'Hackathon Judge Invitation';
  EInvitationStatus = EInvitationStatus;
  showPageDetails = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private hackathonService: HackathonService,
    private nbDialogService: NbDialogService,
    private router: Router,
    private seoService: SeoService,
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.token = params.token;
      this.hackathonService.verifyInvitationTokenJudge(this.token).subscribe((data) => {
        this.hackathon = data.hackathon;
        this.judge = data.judge;
        if (this.judge.invite_status === EInvitationStatus.INVITED || Number(params.status) === 1) {
          this.onAcceptRoleButton();
        }
        if (Number(params.status) === 2) {
          this.activateRole(this.token, EInvitationStatus.REJECTED);
        }
      });
    });
    this.seoService.setTitle('Confirm Role');
    this.seoService.noIndex(true);
  }

  onAcceptRoleButton() {
    const dialogRef = this.nbDialogService.open(UserConsentsComponent, {
      context: {
        component: 'hackathon_judge_invitation',
        consentType: ConsentTypesEnum.HACKATHON_JUDGE_INVITATION,
      },
    });
    dialogRef.componentRef.instance.consentOutput.subscribe((result) => {
      dialogRef.close();
      if (result === 'rejected') {
        const queryParams = { token: this.token, decline: true };
        this.router.navigate([], { queryParams });
        this.activateRole(this.token);
      } else {
        this.activateRole(this.token, EInvitationStatus.ACCEPTED);
      }
    });
  }
  activateRole(token, inviteStatus?: EInvitationStatus) {
    this.hackathonService.updateInvitationTokenJudge(token, inviteStatus).subscribe((data) => {
      this.showPageDetails = true;
      if (data) {
        this.judge = data;
      }
    });
  }
}
