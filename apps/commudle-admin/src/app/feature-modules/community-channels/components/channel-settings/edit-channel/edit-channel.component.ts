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
  @Input() discussionType;
  @Output() updateForm = new EventEmitter<string>();

  subscriptions = [];
  channel: ICommunityChannel;

  constructor(private communityChannelManagerService: CommunityChannelManagerService) {}

  ngOnInit(): void {
    this.getChannel();
  }

  getChannel() {
    this.channel = this.communityChannelManagerService.findChannel(this.channelId);
  }

  formUpdate() {
    this.updateForm.emit('updated');
  }
}
