// TODO to be deprecated, move this to a popup which appears on the channel page itself
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityChannelsService } from '../../services/community-channels.service';
import { NbDialogService } from '@commudle/theme';
import { UserConsentsComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-consents/user-consents.component';
import { UserRolesUsersService } from 'apps/commudle-admin/src/app/services/user_roles_users.service';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { ConsentTypesEnum } from 'apps/shared-models/enums/consent-types.enum';

@Component({
  selector: 'app-join-by-token',
  templateUrl: './join-by-token.component.html',
  styleUrls: ['./join-by-token.component.scss'],
})
export class JoinByTokenComponent implements OnInit {
  joined = false;
  communityName;
  channelId;
  channelName: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private communityChannelsService: CommunityChannelsService,
    private router: Router,
    private nbDialogService: NbDialogService,
    private userRolesUsersService: UserRolesUsersService,
    private libToasLogService: LibToastLogService,
  ) {}

  ngOnInit(): void {
    this.communityChannelsService.showByToken(this.activatedRoute.snapshot.params.token).subscribe((data) => {
      this.communityName = data.kommunity.name;
      this.channelId = data.id;
      this.channelName = data.name;
      this.onAcceptRoleButton();
    });
    // this.verifyToken();
    // });
  }

  verifyToken(decline?: boolean) {
    this.communityChannelsService.joinByToken(this.activatedRoute.snapshot.params.token, decline).subscribe((data) => {
      this.libToasLogService.successDialog('Taking you to the channel!', 2500);
      if (decline) {
        this.router.navigate(
          ['/communities', this.activatedRoute.snapshot.params.community_id, 'channels', this.channelId],
          { queryParams: { decline: true } },
        );
      } else {
        this.joined = true;
        this.router.navigate(['/communities', this.activatedRoute.snapshot.params.community_id, 'channels', data]);
      }
    });
  }

  onAcceptRoleButton() {
    const dialogRef = this.nbDialogService.open(UserConsentsComponent, {
      context: {
        consentType: ConsentTypesEnum.JoinChannelToken,
        communityNameToken: this.communityName,
        channelNameToken: this.channelName,
      },
    });
    dialogRef.componentRef.instance.consentOutput.subscribe((result) => {
      dialogRef.close();
      if (result === 'rejected') {
        this.verifyToken(true);
      } else {
        this.verifyToken();
      }
    });
  }
}
