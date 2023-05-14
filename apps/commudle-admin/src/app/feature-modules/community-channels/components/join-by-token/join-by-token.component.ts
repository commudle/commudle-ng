// TODO to be deprecated, move this to a popup which appears on the channel page itself
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityChannelsService } from '../../services/community-channels.service';
import { NbDialogService } from '@commudle/theme';
import { UserConsentsComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-consents/user-consents.component';

@Component({
  selector: 'app-join-by-token',
  templateUrl: './join-by-token.component.html',
  styleUrls: ['./join-by-token.component.scss'],
})
export class JoinByTokenComponent implements OnInit {
  joined = false;
  joinChannelToken = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private communityChannelsService: CommunityChannelsService,
    private router: Router,
    private nbDialogService: NbDialogService,
  ) {}

  ngOnInit(): void {
    this.onAcceptRoleButton();
    // this.verifyToken();
  }

  verifyToken() {
    this.communityChannelsService.joinByToken(this.activatedRoute.snapshot.params.token).subscribe((data) => {
      this.joined = true;
      this.router.navigate(['/communities', this.activatedRoute.snapshot.params.community_id, 'channels', data]);
    });
  }

  onAcceptRoleButton() {
    this.joinChannelToken = true;
    const dialogRef = this.nbDialogService.open(UserConsentsComponent, {
      context: {
        joinChannelToken: this.joinChannelToken,
      },
    });
    dialogRef.componentRef.instance.consentOutput.subscribe((result) => {
      dialogRef.close();
      this.verifyToken();
    });
  }
}
