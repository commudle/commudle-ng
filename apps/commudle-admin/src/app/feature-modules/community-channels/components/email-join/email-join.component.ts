/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { Component, OnInit } from '@angular/core';
import { CommunityChannelsService } from '../../services/community-channels.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { faShieldHeart } from '@fortawesome/free-solid-svg-icons';
import { NbDialogService } from '@commudle/theme';
import { UserConsentsComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-consents/user-consents.component';
import { ConsentTypesEnum } from 'apps/shared-models/enums/consent-types.enum';

@Component({
  selector: 'app-email-join',
  templateUrl: './email-join.component.html',
  styleUrls: ['./email-join.component.scss'],
})
export class EmailJoinComponent implements OnInit {
  verified = false;
  communityChannel: ICommunityChannel;
  channelId;
  joinToken;
  communityName;
  channelName;
  faShieldHeart = faShieldHeart;

  constructor(
    private communityChannelsService: CommunityChannelsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private libToasLogService: LibToastLogService,
    private nbDialogService: NbDialogService,
  ) {}

  ngOnInit(): void {
    this.channelId = this.activatedRoute.snapshot.queryParams.ch;
    this.getChannelInfo();
    this.joinToken = this.activatedRoute.snapshot.params.token;
  }

  // get channel details
  getChannelInfo() {
    this.communityChannelsService.getChannelInfo(this.channelId).subscribe((data) => {
      this.communityChannel = data;
      this.channelName = data.name;
      this.communityName = data.kommunity.name;
      this.onAcceptRoleButton();
    });
  }

  joinChannel(decline?: boolean) {
    this.communityChannelsService.joinChannel(this.channelId, this.joinToken, decline).subscribe((data) => {
      if (data) {
        this.libToasLogService.successDialog('Taking you to the channel!', 2500);
        void this.router.navigate([
          '/communities',
          this.activatedRoute.snapshot.params.community_id,
          'channels',
          this.channelId,
        ]);
      }
    });
  }

  reject() {
    const queryParams = { ch: this.channelId, decline: true };
    this.router.navigate([], { queryParams });
    this.joinChannel(true);
  }

  onAcceptRoleButton() {
    const dialogRef = this.nbDialogService.open(UserConsentsComponent, {
      context: {
        consentType: ConsentTypesEnum.joinChannelEmail,
        communityNameEmail: this.communityName,
        channelNameEmail: this.channelName,
      },
    });
    dialogRef.componentRef.instance.consentOutput.subscribe((result) => {
      dialogRef.close();
      if (result === 'rejected') {
        this.reject();
      } else {
        this.joinChannel();
      }
    });
  }
}
