/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommunityChannelsService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channels.service';
import { DiscussionsService } from 'apps/commudle-admin/src/app/services/discussions.service';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { IDiscussion } from 'apps/shared-models/discussion.model';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { ICommunity } from '@commudle/shared-models';
import { Location } from '@angular/common';
import { ICommunityGroup } from 'apps/shared-models/community-group.model';

@Component({
  selector: 'commudle-community-forum-message',
  templateUrl: './community-forum-message.component.html',
  styleUrls: ['./community-forum-message.component.scss'],
})
export class CommunityForumMessageComponent implements OnInit, OnDestroy {
  @Input() forumId;
  @Output() updateSelectedForum = new EventEmitter<ICommunityChannel>();
  discussion: IDiscussion;
  forum: ICommunityChannel;
  faArrowLeftLong = faArrowLeftLong;
  subscriptions: Subscription[] = [];
  showMembersList = false;
  faUsers = faUsers;

  constructor(
    private discussionsService: DiscussionsService,
    private communityChannelsService: CommunityChannelsService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
  ) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params.community_channel_id) {
      this.forumId = this.activatedRoute.snapshot.params.community_channel_id;
    }
    this.subscriptions.push(
      this.communityChannelsService.showChannelForm(this.forumId).subscribe((data) => {
        this.forum = data;
      }),

      this.discussionsService.pGetOrCreateForCommunityChannel(this.forumId).subscribe((data) => {
        this.discussion = data;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  selectedCommunityForum() {
    this.updateSelectedForum.emit(this.forum);
    this.location.back();
  }

  toggleMembersList() {
    this.showMembersList = !this.showMembersList;
  }
}
