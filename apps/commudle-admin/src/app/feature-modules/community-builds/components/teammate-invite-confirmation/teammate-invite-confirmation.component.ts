import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@commudle/theme';
import { UserConsentsComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-consents/user-consents.component';
import { CommunityBuildsService } from 'apps/commudle-admin/src/app/services/community-builds.service';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';

@Component({
  selector: 'app-teammate-invite-confirmation',
  templateUrl: './teammate-invite-confirmation.component.html',
  styleUrls: ['./teammate-invite-confirmation.component.scss'],
})
export class TeammateInviteConfirmationComponent implements OnInit {
  confirmation: boolean;
  joinBuild = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private communityBuildsService: CommunityBuildsService,
    private toastLogService: LibToastLogService,
    private dialogService: NbDialogService,
  ) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.onAcceptBuildButton(params.community_build_id);
    // this.verifyInvitation();
  }

  verifyInvitation(decline?: boolean) {
    const params = this.activatedRoute.snapshot.params;

    this.communityBuildsService
      .confirmTeammateInvite(params.community_build_id, params.token, decline)
      .subscribe((data) => {
        this.confirmation = data;
        if (data) {
          if (decline) {
            this.toastLogService.warningDialog('You have declined the invitation!', 3500);
          } else {
            this.toastLogService.successDialog('Thank You for confirming!', 3500);
          }
          this.router.navigate(['/builds', params.community_build_id]);
        } else {
          this.toastLogService.warningDialog('Invalid Link', 3500);
        }
      });
  }

  onAcceptBuildButton(buildName) {
    this.joinBuild = true;
    const dialogRef = this.dialogService.open(UserConsentsComponent, {
      context: {
        joinBuild: this.joinBuild,
        buildName: buildName,
      },
    });
    dialogRef.componentRef.instance.consentOutput.subscribe((result) => {
      dialogRef.close();
      if (result === 'rejected') {
        const queryParams = { decline: true };
        this.router.navigate([], { queryParams });
        this.verifyInvitation(true);
        return;
      } else {
        this.verifyInvitation();
      }
    });
  }
}
