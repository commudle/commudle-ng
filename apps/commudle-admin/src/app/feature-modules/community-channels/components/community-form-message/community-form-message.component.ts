import { Component, Input, OnInit } from '@angular/core';
import { CommunityChannelManagerService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channel-manager.service';
import { CommunityChannelsService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channels.service';
import { DiscussionsService } from 'apps/commudle-admin/src/app/services/discussions.service';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { IDiscussion } from 'apps/shared-models/discussion.model';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'commudle-community-form-message',
  templateUrl: './community-form-message.component.html',
  styleUrls: ['./community-form-message.component.scss'],
})
export class CommunityFormMessageComponent implements OnInit {
  @Input() forumId;
  discussion: IDiscussion;
  forum: ICommunityChannel;
  faArrowLeftLong = faArrowLeftLong;

  constructor(
    private discussionsService: DiscussionsService,
    private communityChannelsService: CommunityChannelsService,
  ) {}

  ngOnInit(): void {
    this.communityChannelsService.getChannelInfo(this.forumId).subscribe((data) => {
      this.forum = data;
    });
    this.discussionsService.pGetOrCreateForCommunityChannel(this.forumId).subscribe((data) => {
      this.discussion = data;
    });
  }
}

// export class CommunityChannelsService {
//   constructor(private http: HttpClient, private apiRoutesService: ApiRoutesService) {}

//   getChannelInfo(id): Observable<ICommunityChannel> {
//     const params = new HttpParams().set('community_channel_id', id);
//     return this.http.get<any>(this.apiRoutesService.getRoute(API_ROUTES.COMMUNITY_CHANNELS.SHOW), { params });
//   }
