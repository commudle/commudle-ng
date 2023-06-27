import { Component, Input, OnInit } from '@angular/core';
import { CommunityChannelManagerService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channel-manager.service';
import { CommunityChannelsService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channels.service';
import { DiscussionsService } from 'apps/commudle-admin/src/app/services/discussions.service';
import { IDiscussion } from 'apps/shared-models/discussion.model';

@Component({
  selector: 'commudle-community-form-message',
  templateUrl: './community-form-message.component.html',
  styleUrls: ['./community-form-message.component.scss'],
})
export class CommunityFormMessageComponent implements OnInit {
  @Input() forumId;
  discussion: IDiscussion;

  constructor(
    private discussionsService: DiscussionsService,
    private communityChannelService: CommunityChannelsService,
  ) {}

  ngOnInit(): void {
    this.discussionsService.pGetOrCreateForCommunityChannel(this.forumId).subscribe((data) => {
      this.discussion = data;
    });
  }
}
