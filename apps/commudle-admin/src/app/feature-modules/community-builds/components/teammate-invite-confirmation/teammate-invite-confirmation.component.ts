import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityBuildsService } from 'apps/commudle-admin/src/app/services/community-builds.service';
import { LibToastLogService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-teammate-invite-confirmation',
  templateUrl: './teammate-invite-confirmation.component.html',
  styleUrls: ['./teammate-invite-confirmation.component.scss']
})
export class TeammateInviteConfirmationComponent implements OnInit {

  confirmation: boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private communityBuildsService: CommunityBuildsService,
    private toastLogService: LibToastLogService
  ) { }

  ngOnInit(): void {
    this.verifyInvitation();
  }

  verifyInvitation() {
    const params = this.activatedRoute.snapshot.params;

    this.communityBuildsService.confirmTeammateInvite(params.community_build_id, params.token).subscribe(
      data => {
        this.confirmation = data;
        if (data) {
          this.toastLogService.successDialog('Thank You for confirming!', 3500);
          this.router.navigate(['/builds', params.community_build_id]);
        } else {
          this.toastLogService.warningDialog('Invalid Link', 3500);
        }
      }
    )
  }




}
