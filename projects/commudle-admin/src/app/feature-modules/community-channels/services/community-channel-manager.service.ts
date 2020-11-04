import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { ICommunity } from 'projects/shared-models/community.model';
import { ICommunityChannel } from 'projects/shared-models/community-channel.model';


@Injectable({
  providedIn: 'root'
})
export class CommunityChannelManagerService {
  // community
  private selectedCommunity: BehaviorSubject<ICommunity> = new BehaviorSubject(null);
  public selectedCommunity$ = this.selectedCommunity.asObservable();

  // channel
  private selectedChannel: BehaviorSubject<ICommunityChannel> = new BehaviorSubject(null);
  public selectedChannel$ = this.selectedChannel.asObservable();


  constructor(
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService,
  ) { }


  setCommunity(community: ICommunity) {
    this.selectedCommunity.next(community);
  }

  setChannel(channel: ICommunityChannel) {
    this.selectedChannel.next(channel);
  }

}
