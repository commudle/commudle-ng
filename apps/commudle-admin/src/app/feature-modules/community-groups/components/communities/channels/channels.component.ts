import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunityGroupsService } from 'apps/commudle-admin/src/app/services/community-groups.service';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';

@Component({
  selector: 'commudle-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss'],
})
export class ChannelsComponent implements OnInit {
  channels: ICommunityChannel[] = [];
  isLoading = true;

  constructor(private communityGroupsService: CommunityGroupsService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe((data) => {
      this.getChannels(data.community_group_id);
    });
  }

  getChannels(slug) {
    this.communityGroupsService.communityChannels(slug).subscribe((data) => {
      this.channels = this.channels.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
      this.isLoading = false;
    });
  }
}
