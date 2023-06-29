import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICommunity } from '@commudle/shared-models';
import { NbDialogService } from '@commudle/theme';
import { NewCommunityChannelComponent } from 'apps/commudle-admin/src/app/feature-modules/community-channels/components/new-community-channel/new-community-channel.component';
import { EDiscussionType } from 'apps/commudle-admin/src/app/feature-modules/community-channels/model/discussion-type.enum';
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
  discussionType = EDiscussionType;
  forumName: string;

  @Output() updateSelectedForum = new EventEmitter<number>();

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
    });
  }

  openChat(forumId) {
    this.updateSelectedForum.emit(forumId);
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge', // remove to replace all query params by provided
      queryParams: { 'discussion-id': forumId },
    });
  }

  newChannelDialogBox(groupName?) {
    this.dialogService.open(NewCommunityChannelComponent, {
      closeOnBackdropClick: false,
      hasBackdrop: false,
      context: {
        groupName: groupName,
        discussionType: this.discussionType.FORUM,
      },
    });
  }
}
