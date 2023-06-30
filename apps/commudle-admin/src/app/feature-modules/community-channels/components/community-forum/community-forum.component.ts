import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICommunity } from '@commudle/shared-models';
import { NbDialogService } from '@commudle/theme';
import { ChannelSettingsComponent } from 'apps/commudle-admin/src/app/feature-modules/community-channels/components/channel-settings/channel-settings.component';
import { NewCommunityChannelComponent } from 'apps/commudle-admin/src/app/feature-modules/community-channels/components/new-community-channel/new-community-channel.component';
import { EDiscussionType } from 'apps/commudle-admin/src/app/feature-modules/community-channels/model/discussion-type.enum';
import { CommunityChannelManagerService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channel-manager.service';
import { DiscussionsService } from 'apps/commudle-admin/src/app/services/discussions.service';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { IDiscussion } from 'apps/shared-models/discussion.model';
import { EUserRoles } from 'apps/shared-models/enums/user_roles.enum';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';

@Component({
  selector: 'commudle-community-forum',
  templateUrl: './community-forum.component.html',
  styleUrls: ['./community-forum.component.scss'],
})
export class CommunityForumComponent implements OnInit {
  @Input() selectedCommunity: ICommunity;
  @Input() isCommunityOrganizer = false;
  selectedForum: ICommunityChannel[];
  discussion: IDiscussion;
  currentUser: ICurrentUser;
  discussionType = EDiscussionType;
  forumName: string;
  channelsRoles = {};
  EUserRoles = EUserRoles;

  @Output() updateSelectedForum = new EventEmitter<number>();

  constructor(
    private communityChannelManagerService: CommunityChannelManagerService,
    private discussionsService: DiscussionsService,
    private dialogService: NbDialogService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authWatchService: LibAuthwatchService,
  ) {}

  ngOnInit(): void {
    this.communityChannelManagerService.selectedForum$.subscribe((data) => {
      this.selectedForum = data;
    });
    this.authWatchService.currentUser$.subscribe((data) => {
      this.currentUser = data;
    });
    this.communityChannelManagerService.allForumRoles$.subscribe((data) => {
      this.channelsRoles = data;
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

  editDialogBox(channelId) {
    const dialogRef = this.dialogService.open(ChannelSettingsComponent, {
      closeOnBackdropClick: false,
      hasBackdrop: false,
      context: {
        channelId: channelId,
        discussionType: this.discussionType.CHANNEL,
      },
    });
    dialogRef.componentRef.instance.updateForm.subscribe(() => {
      dialogRef.close();
    });
  }
}
