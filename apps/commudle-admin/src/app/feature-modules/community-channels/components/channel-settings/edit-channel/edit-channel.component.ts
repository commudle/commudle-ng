/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { CommunityChannelManagerService } from '../../../services/community-channel-manager.service';

@Component({
  selector: 'commudle-edit-channel',
  templateUrl: './edit-channel.component.html',
  styleUrls: ['./edit-channel.component.scss'],
})
export class EditChannelComponent implements OnInit {
  @Input() channelId: number;
  @Input() forum: ICommunityChannel;
  @Input() discussionType;
  @Output() updateForm = new EventEmitter<string>();

  subscriptions = [];
  channel: ICommunityChannel;

  constructor(private communityChannelManagerService: CommunityChannelManagerService) {}

  ngOnInit(): void {
    this.getChannelOrForum();
  }

  getChannelOrForum() {
    if (this.channelId) {
      this.channel = this.communityChannelManagerService.findChannel(this.channelId);
    } else {
      this.channel = this.forum;
    }
  }

  formUpdate() {
    this.updateForm.emit('updated');
  }
}
