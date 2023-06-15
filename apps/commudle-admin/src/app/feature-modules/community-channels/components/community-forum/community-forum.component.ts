import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@commudle/theme';
import { NewCommunityChannelComponent } from 'apps/commudle-admin/src/app/feature-modules/community-channels/components/new-community-channel/new-community-channel.component';
import { DiscussionType } from 'apps/commudle-admin/src/app/feature-modules/community-channels/model/discussion-type.enum';
import { CommunityChannelManagerService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channel-manager.service';
import { DiscussionsService } from 'apps/commudle-admin/src/app/services/discussions.service';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { IDiscussion } from 'apps/shared-models/discussion.model';

@Component({
  selector: 'commudle-community-forum',
  templateUrl: './community-forum.component.html',
  styleUrls: ['./community-forum.component.scss'],
})
export class CommunityForumComponent implements OnInit {
  selectedForum: ICommunityChannel[];
  discussion: IDiscussion;
  showDiscussion = false;
  discussionType = DiscussionType;
  constructor(
    private communityChannelManagerService: CommunityChannelManagerService,
    private discussionsService: DiscussionsService,
    private dialogService: NbDialogService,
  ) {}

  ngOnInit(): void {
    this.communityChannelManagerService.selectedForum$.subscribe((data) => {
      this.selectedForum = data;
      console.log(data);
    });
  }
  openChat(forumId) {
    this.discussionsService.pGetOrCreateForCommunityChannel(forumId).subscribe((data) => {
      console.log(data);
      this.showDiscussion = true;
      this.discussion = data;
      // this.communityChannelManagerService.setCommunityListview(false);
    });
  }

  newChannelDialogBox(groupName?) {
    this.dialogService.open(NewCommunityChannelComponent, {
      context: {
        groupName: groupName,
        discussionType: this.discussionType.FORUM,
      },
    });
  }
}
