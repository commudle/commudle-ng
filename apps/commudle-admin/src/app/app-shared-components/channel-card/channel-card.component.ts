import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { RouterModule } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule, NbIconModule } from '@commudle/theme';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { ICommunity } from 'apps/shared-models/community.model';

@Component({
  selector: 'commudle-channel-card',
  standalone: true,
  imports: [CommonModule, RouterModule, NbCardModule, NbButtonModule, SharedComponentsModule, NbIconModule],
  templateUrl: './channel-card.component.html',
  styleUrls: ['./channel-card.component.scss'],
})
export class ChannelCardComponent implements OnInit {
  @Input() channel: ICommunityChannel;
  @Input() community: ICommunity;
  constructor(private communitiesService: CommunitiesService) {}

  ngOnInit(): void {
    this.getCommunity();
  }

  getCommunity() {
    this.communitiesService.getCommunityDetails(this.channel.kommunity_id).subscribe((data) => {
      this.community = data;
    });
  }
}
