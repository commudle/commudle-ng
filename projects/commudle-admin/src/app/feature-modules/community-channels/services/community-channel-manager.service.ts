import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { ICommunity } from 'projects/shared-models/community.model';
import { ICommunityChannel } from 'projects/shared-models/community-channel.model';
import { CommunityChannelsService } from './community-channels.service';
import * as _ from 'lodash';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';


@Injectable({
  providedIn: 'root'
})
export class CommunityChannelManagerService {
  // community
  private selectedCommunity: BehaviorSubject<ICommunity> = new BehaviorSubject(null);
  public selectedCommunity$ = this.selectedCommunity.asObservable();

  // communityChannels
  private communityChannels: BehaviorSubject<any> = new BehaviorSubject(null);
  public communityChannels$ = this.communityChannels.asObservable();

  // channel
  private selectedChannel: BehaviorSubject<ICommunityChannel> = new BehaviorSubject(null);
  public selectedChannel$ = this.selectedChannel.asObservable();


  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService,
    private communityChannelsService: CommunityChannelsService,
    private toastLogService: LibToastLogService
  ) { }


  setCommunity(community: ICommunity) {
    this.selectedCommunity.next(community);
    this.getChannels();
  }

  setChannel(channel: ICommunityChannel) {
    this.selectedChannel.next(channel);
  }

  getChannels() {
    this.communityChannelsService.index(this.selectedCommunity.value.slug).subscribe(
      data => {
        this.communityChannels.next(_.groupBy(data.community_channels, ch => ch.group_name));
      }
    );
  }

  createChannel(channelData) {
    this.communityChannelsService.create(this.selectedCommunity.value.slug, channelData).subscribe(
      data => {
        // select this channel
        this.selectedChannel.next(data);

        // add this channel to the group in the list of channels
        let allChannels = this.communityChannels.value;
        allChannels[data.group_name] ? (allChannels[data.group_name].push(data)) : (allChannels[data.group_name] = [data])
        this.communityChannels.next(allChannels);

        this.toastLogService.successDialog(`${data.name} Created!`);
      }
    );
  }

}
