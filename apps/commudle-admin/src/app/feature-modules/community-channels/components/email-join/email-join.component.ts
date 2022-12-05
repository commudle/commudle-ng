/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { Component, OnInit } from '@angular/core';
import { CommunityChannelsService } from '../../services/community-channels.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';

@Component({
  selector: 'app-email-join',
  templateUrl: './email-join.component.html',
  styleUrls: ['./email-join.component.scss']
})
export class EmailJoinComponent implements OnInit {
  verified = false;
  loading = false;
  communityChannel: ICommunityChannel;
  channelId;
  joinToken;

  constructor(
    private communityChannelsService: CommunityChannelsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private libToasLogService: LibToastLogService
  ) {}

  ngOnInit(): void {
    this.channelId = this.activatedRoute.snapshot.queryParams.ch;
    this.joinToken = this.activatedRoute.snapshot.params.token;
    this.getChannelInfo();
  }

  // get channel details
  getChannelInfo() {
    this.loading = true;
    this.communityChannelsService.getChannelInfo(this.channelId).subscribe((data) => {
      this.communityChannel = data;
      this.loading = false;
    });
  }

  joinChannel() {
    this.loading = true;
    this.communityChannelsService.joinChannel(this.channelId, this.joinToken).subscribe((data) => {
      if (data) {
        this.libToasLogService.successDialog('Taking you to the channel!', 2500);
        void this.router.navigate([
          '/communities',
          this.activatedRoute.snapshot.params.community_id,
          'channels',
          this.channelId,
        ]);
      }
      this.loading = false;
    });
  }

}
