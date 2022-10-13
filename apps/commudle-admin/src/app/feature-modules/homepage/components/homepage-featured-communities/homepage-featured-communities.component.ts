import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit } from '@angular/core';
import { environment } from '@commudle/shared-environments';
import { IFeaturedCommunity } from '@commudle/shared-models';
import { LibToastLogService, NavigatorShareService } from '@commudle/shared-services';
// import getImagePalette from 'image-palette-core';
import { FeaturedCommunitiesService } from 'apps/commudle-admin/src/app/services/featured-communities.service';

@Component({
  selector: 'commudle-homepage-featured-communities',
  templateUrl: './homepage-featured-communities.component.html',
  styleUrls: ['./homepage-featured-communities.component.scss'],
})
export class HomepageFeaturedCommunitiesComponent implements OnInit {
  featuredCommunities: IFeaturedCommunity[] = [];

  constructor(
    private featuredCommunitiesService: FeaturedCommunitiesService,
    private navigatorShareService: NavigatorShareService,
    private libToastLogService: LibToastLogService,
    private clipboard: Clipboard,
  ) {}

  ngOnInit(): void {
    this.getFeaturedCommunities();
  }

  getFeaturedCommunities(): void {
    this.featuredCommunitiesService.getLatestFeaturedCommunities().subscribe((value) => {
      this.featuredCommunities = value.featured_communities.slice(0, 4);
      this.extractPalette();
    });
  }

  extractPalette(): void {
    // this.featuredCommunities.forEach((community) => {
    //   const img = new Image();
    //   img.src = community.kommunity.logo_image.url;
    //   img.onload = () => (community.palette = getImagePalette(img));
    // });
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
