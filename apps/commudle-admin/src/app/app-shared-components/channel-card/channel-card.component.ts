import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { RouterModule } from '@angular/router';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule, NbIconModule } from '@commudle/theme';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { ICommunity } from 'apps/shared-models/community.model';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'commudle-channel-card',
  standalone: true,
  imports: [CommonModule, RouterModule, NbCardModule, NbButtonModule, SharedComponentsModule, NbIconModule],
  templateUrl: './channel-card.component.html',
  styleUrls: ['./channel-card.component.scss'],
})
export class ChannelCardComponent implements OnInit, AfterViewInit {
  @Input() channel: ICommunityChannel;
  @Input() community: ICommunity;
  @Input() horizontalScroll = false;
  private showDescriptioninterval: Subscription;
  showDescription = true;

  constructor(private communitiesService: CommunitiesService) {
    this.showDescriptioninterval = interval(3000).subscribe(() => {
      this.showDescription = !this.showDescription;
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.getCommunity();
  }

  ngOnDestroy() {
    if (this.showDescriptioninterval) {
      this.showDescriptioninterval.unsubscribe();
    }
  }

  getCommunity() {
    this.communitiesService.getCommunityDetails(this.channel.kommunity_id).subscribe((data) => {
      this.community = data;
    });
  }
}
