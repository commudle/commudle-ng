import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ICommunity } from 'projects/shared-models/community.model';
import { CommunityChannelsService } from 'projects/commudle-admin/src/app/feature-modules/community-channels/services/community-channels.service';
import { ICommunityChannel } from 'projects/shared-models/community-channel.model';
import { EUserRoles } from 'projects/shared-models/enums/user_roles.enum';
import { CommunityChannelManagerService } from 'projects/commudle-admin/src/app/feature-modules/community-channels/services/community-channel-manager.service';
import { AppUsersService } from 'projects/commudle-admin/src/app/services/app-users.service';

@Component({
  selector: 'app-community-channels-list',
  templateUrl: './community-channels-list.component.html',
  styleUrls: ['./community-channels-list.component.scss'],
})
export class CommunityChannelsListComponent implements OnInit {
  community: ICommunity;
  channels: ICommunityChannel[] = [];
  channelRoles = {};
  EUserRoles = EUserRoles;
  subscriptions = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private meta: Meta,
    private title: Title,
    private communityChannelsService: CommunityChannelsService,
    private communityChannelManagerService: CommunityChannelManagerService,
    private usersService: AppUsersService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.community = data.community;
        this.getChannels();
        this.setMeta();
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getChannels() {
    this.subscriptions.push(
      this.communityChannelsService.index(this.community.id).subscribe((data) => {
        this.channels = data.community_channels;
        this.getChannelRoles();
      }),
    );
  }

  getChannelRoles() {
    for (const ch of this.channels) {
      this.usersService.getMyRoles('CommunityChannel', ch.id).subscribe((data) => {
        this.channelRoles[`${ch.id}`] = data;
      });
    }
  }

  setMeta() {
    this.title.setTitle(`Public Channels | ${this.community.name}`);
    this.meta.updateTag({ name: 'og:title', content: `Public Channels | ${this.community.name}` });
    this.meta.updateTag({ name: 'twitter:title', content: `Public Channels | ${this.community.name}` });
  }
}
