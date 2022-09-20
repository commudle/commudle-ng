import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunityChannel } from '@commudle/shared-models';
import { CommunityChannelManagerService } from '../../../services/community-channel-manager.service';

@Component({
  selector: 'commudle-edit-channel',
  templateUrl: './edit-channel.component.html',
  styleUrls: ['./edit-channel.component.scss']
})
export class EditChannelComponent implements OnInit, OnDestroy {
  subscriptions = [];
  channel: ICommunityChannel;

  constructor(
    private communityChannelManagerService: CommunityChannelManagerService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getChannel();
  }


  ngOnDestroy() {
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }

  getChannel() {
    this.subscriptions.push(
      this.activatedRoute.parent.params.subscribe(
        data => {
          this.channel = this.communityChannelManagerService.findChannel(data.community_channel_id);
        }
      )
    )
  }

}
