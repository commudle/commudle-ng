/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommunityChannelsService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channels.service';
import { DiscussionsService } from 'apps/commudle-admin/src/app/services/discussions.service';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { IDiscussion } from 'apps/shared-models/discussion.model';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'commudle-community-form-message',
  templateUrl: './community-form-message.component.html',
  styleUrls: ['./community-form-message.component.scss'],
})
export class CommunityFormMessageComponent implements OnInit, OnDestroy {
  @Input() forumId;
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
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params.community_channel_id) {
      this.forumId = this.activatedRoute.snapshot.params.community_channel_id;
    }
    this.subscriptions.push(
      this.communityChannelsService.getChannelInfo(this.forumId).subscribe((data) => {
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
    this.router.navigate(['communities', this.forum.kommunity.id, 'forums'], {
      queryParams: { category: this.forum.group_name ? this.forum.group_name : 'General' },
    });
  }

  toggleMembersList() {
    this.showMembersList = !this.showMembersList;
  }
}
