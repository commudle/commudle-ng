import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { CommunityChannelManagerService } from '../../../services/community-channel-manager.service';

@Component({
  selector: 'app-edit-channel',
  templateUrl: './edit-channel.component.html',
  styleUrls: ['./edit-channel.component.scss'],
})
export class EditChannelComponent implements OnInit {
  @Input() channelId: string;
  @Input() forum: ICommunityChannel;
  @Input() discussionType;
  @Output() updateForm = new EventEmitter<string>();

  subscriptions = [];
  channel: ICommunityChannel;

  constructor(private communityChannelManagerService: CommunityChannelManagerService) {}

  ngOnInit(): void {
    this.getChannel();
  }

  getChannel() {
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
