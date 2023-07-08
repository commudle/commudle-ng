/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ICommunity } from '@commudle/shared-models';
import { NbDialogService } from '@commudle/theme';
import { NewCommunityChannelComponent } from 'apps/commudle-admin/src/app/feature-modules/community-channels/components/new-community-channel/new-community-channel.component';
import { EDiscussionType } from 'apps/commudle-admin/src/app/feature-modules/community-channels/model/discussion-type.enum';
import { CommunityChannelManagerService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channel-manager.service';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { IDiscussion } from 'apps/shared-models/discussion.model';
import { EUserRoles } from 'apps/shared-models/enums/user_roles.enum';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { faEye, faLock, faPen, faTrash, faUserPlus, faThumbTack } from '@fortawesome/free-solid-svg-icons';
import { ArchiveChannelComponent } from 'apps/commudle-admin/src/app/feature-modules/community-channels/components/channel-settings/archive-channel/archive-channel.component';
import { InviteFormComponent } from 'apps/commudle-admin/src/app/feature-modules/community-channels/components/channel-settings/invite-form/invite-form.component';
import { EditChannelComponent } from 'apps/commudle-admin/src/app/feature-modules/community-channels/components/channel-settings/edit-channel/edit-channel.component';

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
  faEye = faEye;
  faLock = faLock;
  faPen = faPen;
  faTrash = faTrash;
  faUserPlus = faUserPlus;
  faThumbTack = faThumbTack;

  @Output() updateSelectedForum = new EventEmitter<number>();

  constructor(
    private communityChannelManagerService: CommunityChannelManagerService,
    private dialogService: NbDialogService,
    private router: Router,
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
    this.router.navigate(['communities', this.selectedCommunity.slug, 'forums', forumId]);
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

  openDeleteDialogeBox(channelId) {
    const dialogRef = this.dialogService.open(ArchiveChannelComponent, {
      closeOnBackdropClick: true,
      hasBackdrop: true,
      context: {
        channelId: channelId,
        // discussionType: this.discussionType.CHANNEL,
      },
    });
    // dialogRef.componentRef.instance.updateForm.subscribe(() => {
    //   dialogRef.close();
    // });
  }

  openInviteDialogeBox(forum) {
    const dialogRef = this.dialogService.open(InviteFormComponent, {
      closeOnBackdropClick: true,
      hasBackdrop: true,
      context: {
        forum: forum,
        // invite: true,
      },
    });
    // dialogRef.componentRef.instance.updateForm.subscribe(() => {
    //   dialogRef.close();
    // });
  }

  pin() {}

  openEditDialogeBox(forum) {
    const dialogRef = this.dialogService.open(EditChannelComponent, {
      closeOnBackdropClick: true,
      hasBackdrop: true,
      context: {
        forum: forum,
        discussionType: this.discussionType.FORUM,
      },
    });
    dialogRef.componentRef.instance.updateForm.subscribe(() => {
      dialogRef.close();
    });
  }
}
