import { Component, OnInit } from '@angular/core';
import { CommunityChannelManagerService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channel-manager.service';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';

@Component({
  selector: 'commudle-community-forum',
  templateUrl: './community-forum.component.html',
  styleUrls: ['./community-forum.component.scss'],
})
export class CommunityForumComponent implements OnInit {
  selectedForum: ICommunityChannel[];
  constructor(private communityChannelManagerService: CommunityChannelManagerService) {}

  ngOnInit(): void {
    this.communityChannelManagerService.selectedForum$.subscribe((data) => {
      this.selectedForum = data;
    });
  }
}
