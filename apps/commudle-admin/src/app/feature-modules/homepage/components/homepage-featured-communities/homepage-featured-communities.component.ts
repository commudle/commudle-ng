import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
// import getImagePalette from 'image-palette-core';
import { FeaturedCommunitiesService } from 'apps/commudle-admin/src/app/services/featured-communities.service';
import { environment } from 'apps/commudle-admin/src/environments/environment';
import { IFeaturedCommunity } from 'apps/shared-models/featured-community.model';

@Component({
  selector: 'app-homepage-featured-communities',
  templateUrl: './homepage-featured-communities.component.html',
  styleUrls: ['./homepage-featured-communities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageFeaturedCommunitiesComponent implements OnInit {
  featuredCommunities: IFeaturedCommunity[] = [];

  environment = environment;

  constructor(
    private featuredCommunitiesService: FeaturedCommunitiesService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getFeaturedCommunities();
  }

  getFeaturedCommunities(): void {
    this.featuredCommunitiesService.getLatestFeaturedCommunities().subscribe((value) => {
      this.featuredCommunities = value.featured_communities.slice(0, 4);
      console.log(this.featuredCommunities);
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
}
