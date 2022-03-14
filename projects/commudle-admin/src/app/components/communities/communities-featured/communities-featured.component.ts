import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit } from '@angular/core';
import { FeaturedCommunitiesService } from 'projects/commudle-admin/src/app/services/featured-communities.service';
import { environment } from 'projects/commudle-admin/src/environments/environment';
import { IFeaturedCommunity } from 'projects/shared-models/featured-community.model';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { NavigatorShareService } from 'projects/shared-services/navigator-share.service';

@Component({
  selector: 'app-communities-featured',
  templateUrl: './communities-featured.component.html',
  styleUrls: ['./communities-featured.component.scss'],
})
export class CommunitiesFeaturedComponent implements OnInit {
  featuredCommunities: IFeaturedCommunity[] = [];
  environment = environment;

  constructor(
    private featuredCommunitiesService: FeaturedCommunitiesService,
    private navigatorShareService: NavigatorShareService,
    private libToastLogService: LibToastLogService,
    private clipboard: Clipboard,
  ) {
    // do nothing
  }

  ngOnInit(): void {
    this.getFeaturedCommunities();
  }

  getFeaturedCommunities(): void {
    this.featuredCommunitiesService.getLatestFeaturedCommunities().subscribe((value) => {
      this.featuredCommunities = value.featured_communities.slice(0, 4);
    });
  }

  copyTextToClipboard(featuredCommunity: IFeaturedCommunity): void {
    if (!this.navigatorShareService.canShare()) {
      if (
        this.clipboard.copy(
          `${featuredCommunity.kommunity.name} | ${featuredCommunity.reason} | ${environment.app_url}/communities/${featuredCommunity.kommunity.slug}`,
        )
      ) {
        this.libToastLogService.successDialog('Copied the message successfully!');
      }
      return;
    }

    this.navigatorShareService
      .share({
        title: `${featuredCommunity.kommunity.name}`,
        text: `${featuredCommunity.reason}`,
        url: `${environment.app_url}/communities/${featuredCommunity.kommunity.slug}`,
      })
      .then(() => {
        this.libToastLogService.successDialog('Shared successfully!');
      });
  }
}
