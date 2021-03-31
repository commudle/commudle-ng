import { UsersService } from './../../../../../../../shared-services/users.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ICommunity } from 'projects/shared-models/community.model';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { ActivatedRoute } from '@angular/router';
import { CommunityChannelManagerService } from '../../services/community-channel-manager.service';
import { NbWindowService } from '@nebular/theme';
import { ICommunityChannel } from 'projects/shared-models/community-channel.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-community-channels-dashboard',
  templateUrl: './community-channels-dashboard.component.html',
  styleUrls: ['./community-channels-dashboard.component.scss']
})
export class CommunityChannelsDashboardComponent implements OnInit, OnDestroy {
  subscriptions = [];

  currentUser: ICurrentUser;
  selectedCommunity: ICommunity;
  communityChannels;
  channelsQueried = false;
  showCommunityList = false;

  constructor(
    private authWatchService: LibAuthwatchService,
    private activatedRoute: ActivatedRoute,
    private communityChannelManagerService: CommunityChannelManagerService,
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.authWatchService.currentUser$.subscribe(
        data => {
          this.communityChannelManagerService.setCurrentUser(data);
        }
      ),
      this.activatedRoute.params.subscribe(
        data => {
          if (!this.selectedCommunity || data.community_id !== this.selectedCommunity.slug) {
            this.selectedCommunity = this.activatedRoute.snapshot.data.community;
            this.setMeta();
            this.communityChannelManagerService.setCommunity(this.selectedCommunity);
          }
        }
      ),
      this.communityChannelManagerService.communityChannels$.subscribe(
        data => {
          this.communityChannels = data;
          if (data) {
            this.channelsQueried = true;
          }
        }
      ),
      this.communityChannelManagerService.showCommunityList$.subscribe(
        data => {
          this.showCommunityList = data;
        }
      )
    )
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }



  setMeta() {
    this.title.setTitle(`${this.selectedCommunity.name} | Channels`)
    this.meta.updateTag({ name: 'description', content: `Interact with members in channels for ${this.selectedCommunity.name}! Share knowledge, network & grow together!`});


    this.meta.updateTag({ name: 'og:image', content: this.selectedCommunity.logo_path });
    this.meta.updateTag({ name: 'og:image:secure_url', content: this.selectedCommunity.logo_path });
    this.meta.updateTag({ name: 'og:title', content: `${this.selectedCommunity.name} | Channels` });
    this.meta.updateTag({ name: 'og:description', content: `Interact with members in channels for ${this.selectedCommunity.name}! Share knowledge, network & grow together!`});
    this.meta.updateTag( { name: 'og:type', content: 'website'});

    this.meta.updateTag({ name: 'twitter:image', content: this.selectedCommunity.logo_path });
    this.meta.updateTag({ name: 'twitter:title', content: `${this.selectedCommunity.name} | Channels` });
    this.meta.updateTag({ name: 'twitter:description', content: `Interact with members in channels for ${this.selectedCommunity.name}! Share knowledge, network & grow together!`});
  }

}
