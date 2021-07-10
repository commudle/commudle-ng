/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ICommunityChannel } from 'projects/shared-models/community-channel.model';
import { Component, OnInit } from '@angular/core';
import { CommunityChannelsService } from '../../services/community-channels.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  ) {}

  ngOnInit(): void {
    this.getChannelInfo();
    const qParams = this.activatedRoute.snapshot.queryParams;
    this.channelId = qParams.community_channel_id;
    this.joinToken = qParams.ch;
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
        this.router.navigate([
          '/communities',
          this.activatedRoute.snapshot.params.community_id,
          'channels',
          this.channelId,
        ]);
      }
    });
  }

}
