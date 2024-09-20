import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '@commudle/shared-services';
import { NbDialogService } from '@commudle/theme';
import { UserConsentsComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-consents/user-consents.component';
import { HackathonUserResponsesService } from 'apps/commudle-admin/src/app/services/hackathon-user-responses.service';
import { IHackathonUserResponse, EInvitationStatus } from 'apps/shared-models/hackathon-user-response.model';
import { IHackathon } from 'apps/shared-models/hackathon.model';
import { ConsentTypesEnum } from 'apps/shared-models/enums/consent-types.enum';

@Component({
  selector: 'commudle-hackathon-team-confirmation',
  templateUrl: './hackathon-team-confirmation.component.html',
  styleUrls: ['./hackathon-team-confirmation.component.scss'],
})
export class HackathonTeamConfirmationComponent implements OnInit {
  roleName = 'Hackathon Teammate Invitation';
  showPageDetails = false;
  hackathon: IHackathon;
  hur: IHackathonUserResponse;
  token: string;
  EInvitationStatus = EInvitationStatus;

  constructor(
    private activatedRoute: ActivatedRoute,
    private hurService: HackathonUserResponsesService,
    private seoService: SeoService,
    private nbDialogService: NbDialogService,
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.token = params.token;
      this.hurService.verifyInvitationTokenHur(this.token).subscribe((data) => {
        this.hackathon = data.hackathon;
        this.hur = data.hackathon_user_response;
        if (this.hur.invite_status === EInvitationStatus.INVITED || Number(params.status) === 1) {
          this.onAcceptRoleButton();
        } else if (Number(params.status) === 2) {
          this.activateRole(this.token, EInvitationStatus.REJECTED);
        } else {
          this.onAcceptRoleButton();
        }
      });
    });
    this.seoService.setTitle('Confirm Role');
    this.seoService.noIndex(true);
  }

  onAcceptRoleButton() {
    const dialogRef = this.nbDialogService.open(UserConsentsComponent, {
      context: {
        component: ConsentTypesEnum.HACKATHON_TEAMMATE_INVITATION,
        consentType: ConsentTypesEnum.HACKATHON_TEAMMATE_INVITATION,
      },
    });
    dialogRef.componentRef.instance.consentOutput.subscribe((result) => {
      dialogRef.close();
      if (result === 'rejected') {
        this.activateRole(this.token, EInvitationStatus.REJECTED);
      } else {
        this.activateRole(this.token, EInvitationStatus.ACCEPTED);
      }
    });
  }
  activateRole(token, inviteStatus?: EInvitationStatus) {
    this.hurService.updateInvitationTokenHur(token, inviteStatus).subscribe((data) => {
      this.showPageDetails = true;
      if (data) {
        this.hur = data;
      }
    });
  }
}
