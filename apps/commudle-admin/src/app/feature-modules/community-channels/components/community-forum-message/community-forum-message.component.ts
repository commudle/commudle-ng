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
import { SeoService } from '@commudle/shared-services';
import { ICommunity } from '@commudle/shared-models';
import { Location } from '@angular/common';

@Component({
  selector: 'commudle-community-forum-message',
  templateUrl: './community-forum-message.component.html',
  styleUrls: ['./community-forum-message.component.scss'],
})
export class CommunityForumMessageComponent implements OnInit, OnDestroy {
  @Input() forumId;
  @Input() selectedCommunity: ICommunity;
  discussion: IDiscussion;
  forum: ICommunityChannel;
  faArrowLeftLong = faArrowLeftLong;
  subscriptions: Subscription[] = [];
  showMembersList = false;
  faUsers = faUsers;

  @Output() updateSelectedForum = new EventEmitter<ICommunityChannel>();

  constructor(
    private discussionsService: DiscussionsService,
    private communityChannelsService: CommunityChannelsService,
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params.community_channel_id) {
      this.forumId = this.activatedRoute.snapshot.params.community_channel_id;
    }
    this.subscriptions.push(
      this.communityChannelsService.getChannelInfo(this.forumId).subscribe((data) => {
        this.forum = data;
        this.setMeta();
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

  setMeta() {
    this.seoService.setTags(
      `${this.forum.name} - ${this.selectedCommunity.name}`,
      `Interact with members in forum for ${this.selectedCommunity.name}! Share knowledge, network & grow together!`,
      this.selectedCommunity.logo_path,
    );
  }
}
