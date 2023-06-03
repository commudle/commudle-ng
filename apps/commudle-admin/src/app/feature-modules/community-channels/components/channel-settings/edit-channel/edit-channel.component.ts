import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { CommunityChannelManagerService } from '../../../services/community-channel-manager.service';

@Component({
  selector: 'app-edit-channel',
  templateUrl: './edit-channel.component.html',
  styleUrls: ['./edit-channel.component.scss'],
})
export class EditChannelComponent implements OnInit, OnDestroy {
  @Input() channelId: string;
  subscriptions = [];
  channel: ICommunityChannel;

  constructor(
    private communityChannelManagerService: CommunityChannelManagerService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getChannel();
  }

  ngOnDestroy() {
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }

  getChannel() {
    this.channel = this.communityChannelManagerService.findChannel(this.channelId);
  }
}
