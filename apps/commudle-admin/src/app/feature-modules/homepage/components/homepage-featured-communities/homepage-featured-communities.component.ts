import { Clipboard } from '@angular/cdk/clipboard';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
// import getImagePalette from 'image-palette-core';
import { FeaturedCommunitiesService } from 'apps/commudle-admin/src/app/services/featured-communities.service';
import { environment } from 'apps/commudle-admin/src/environments/environment';
import { IFeaturedCommunity } from 'apps/shared-models/featured-community.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { NavigatorShareService } from 'apps/shared-services/navigator-share.service';

@Component({
  selector: 'app-homepage-featured-communities',
  templateUrl: './homepage-featured-communities.component.html',
  styleUrls: ['./homepage-featured-communities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageFeaturedCommunitiesComponent implements OnInit {
  featuredCommunities: IFeaturedCommunity[] = [];

  constructor(
    private featuredCommunitiesService: FeaturedCommunitiesService,
    private navigatorShareService: NavigatorShareService,
    private libToastLogService: LibToastLogService,
    private clipboard: Clipboard,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getFeaturedCommunities();
  }

  getFeaturedCommunities(): void {
    this.featuredCommunitiesService.getLatestFeaturedCommunities().subscribe((value) => {
      this.featuredCommunities = value.featured_communities.slice(0, 4);
      this.extractPalette();
      this.changeDetectorRef.markForCheck();
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
