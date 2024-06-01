/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EDbModels, ICommunity } from '@commudle/shared-models';
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
import { DeleteChannelComponent } from 'apps/commudle-admin/src/app/feature-modules/community-channels/components/channel-settings/delete-channel/delete-channel.component';
import { InviteFormComponent } from 'apps/commudle-admin/src/app/feature-modules/community-channels/components/channel-settings/invite-form/invite-form.component';
import { EditChannelComponent } from 'apps/commudle-admin/src/app/feature-modules/community-channels/components/channel-settings/edit-channel/edit-channel.component';
import { Subscription } from 'rxjs';
import { SeoService } from '@commudle/shared-services';
import { ICommunityGroup } from 'apps/shared-models/community-group.model';

@Component({
  selector: 'commudle-community-forum',
  templateUrl: './community-forum.component.html',
  styleUrls: ['./community-forum.component.scss'],
})
export class CommunityForumComponent implements OnInit {
  @Input() isCommunityOrganizer = false;
  parent: ICommunity | ICommunityGroup;
  parentType: EDbModels;
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
  subscriptions: Subscription[] = [];

  @Output() updateSelectedForum = new EventEmitter<number>();

  constructor(
    private communityChannelManagerService: CommunityChannelManagerService,
    private dialogService: NbDialogService,
    private router: Router,
    private authWatchService: LibAuthwatchService,
    private seoService: SeoService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getCurrentUser;
    this.getParent();
    this.subscriptions.push(
      this.communityChannelManagerService.selectedForum$.subscribe((data) => {
        this.selectedForum = data;
      }),
      this.communityChannelManagerService.allForumRoles$.subscribe((data) => {
        this.channelsRoles = data;
      }),
    );
  }
  getParent() {
    this.communityChannelManagerService.parent$.subscribe((data) => {
      this.parent = data;
    });
    this.communityChannelManagerService.parentType$.subscribe((data) => {
      this.parentType = data;
    });
  }

  openChat(forumId) {
    this.updateSelectedForum.emit(forumId);
    let urlSegments = [];
    switch (this.parentType) {
      case EDbModels.KOMMUNITY:
        urlSegments = ['communities', this.parent.slug, 'forums', forumId];
        break;
      case EDbModels.COMMUNITY_GROUP:
        urlSegments = ['orgs', this.parent.slug, 'forums', forumId];
        break;
      default:
        console.error('Invalid Parent Type:', this.parentType);
        break;
    }

    if (this.router.url.startsWith('/admin')) {
      urlSegments.unshift('admin');
    }

    this.router.navigate(urlSegments);
  }

  getCurrentUser() {
    this.subscriptions.push(
      this.authWatchService.currentUser$.subscribe((data) => {
        this.currentUser = data;
      }),
    );
  }

  newChannelDialogBox(groupName?) {
    this.dialogService.open(NewCommunityChannelComponent, {
      closeOnBackdropClick: false,
      hasBackdrop: false,
      hasScroll: true,
      context: {
        groupName: groupName,
        discussionType: this.discussionType.FORUM,
      },
    });
  }

  openDeleteDialogBox(channelId) {
    const dialogRef = this.dialogService.open(DeleteChannelComponent, {
      closeOnBackdropClick: true,
      hasBackdrop: true,
      hasScroll: true,
      context: {
        channelId: channelId,
        currentUrl: 'communities/' + this.parent.slug + '/forums',
        // discussionType: this.discussionType.CHANNEL,
      },
    });
    dialogRef.componentRef.instance.updateForm.subscribe(() => {
      dialogRef.close();
    });
  }

  openInviteDialogBox(forum) {
    const dialogRef = this.dialogService.open(InviteFormComponent, {
      closeOnBackdropClick: true,
      hasBackdrop: true,
      hasScroll: true,
      context: {
        forum: forum,
        // invite: true,
      },
    });
    dialogRef.componentRef.instance.updateForm.subscribe(() => {
      dialogRef.close();
    });
  }

  openEditDialogBox(forum) {
    const dialogRef = this.dialogService.open(EditChannelComponent, {
      closeOnBackdropClick: true,
      hasBackdrop: true,
      hasScroll: true,
      context: {
        forum: forum,
        discussionType: this.discussionType.FORUM,
      },
    });
    dialogRef.componentRef.instance.updateForm.subscribe(() => {
      dialogRef.close();
    });
  }

  pin() {
    // TODO need in future
  }
}
