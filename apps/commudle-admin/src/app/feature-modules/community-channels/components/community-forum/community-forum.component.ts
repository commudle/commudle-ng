import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICommunity } from '@commudle/shared-models';
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
  @Input() selectedCommunity: ICommunity;
  selectedForum: ICommunityChannel[];
  discussion: IDiscussion;
  showDiscussion = false;
  discussionType = DiscussionType;
  forumName: string;
  constructor(
    private communityChannelManagerService: CommunityChannelManagerService,
    private discussionsService: DiscussionsService,
    private dialogService: NbDialogService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.communityChannelManagerService.selectedForum$.subscribe((data) => {
      this.selectedForum = data;
      console.log(this.selectedForum);
    });

    this.forumName = this.activatedRoute.snapshot.queryParamMap.get('forum-name');
    console.log(this.forumName);
  }

  openChat(forumId) {
    this.discussionsService.pGetOrCreateForCommunityChannel(forumId).subscribe((data) => {
      this.showDiscussion = true;
      this.discussion = data;
      // this.router.navigate([`communities/${this.selectedCommunity.slug}/channels/${forumId}`], {
      //   queryParams: { 'discussion-type': 'forum' },
      // });
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
