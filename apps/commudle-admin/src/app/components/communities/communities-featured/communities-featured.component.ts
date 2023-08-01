import { Component, OnInit } from '@angular/core';
import { FeaturedItemsService } from 'apps/commudle-admin/src/app/services/featured-items.service';
// import { FeaturedCommunitiesService } from 'apps/commudle-admin/src/app/services/featured-communities.service';
import { environment } from 'apps/commudle-admin/src/environments/environment';
// import { IFeaturedCommunity } from 'apps/shared-models/featured-community.model';
import { IFeaturedItems } from 'apps/shared-models/featured-items.model';

@Component({
  selector: 'app-communities-featured',
  templateUrl: './communities-featured.component.html',
  styleUrls: ['./communities-featured.component.scss'],
})
export class CommunitiesFeaturedComponent implements OnInit {
  featuredCommunities: IFeaturedItems[] = [];
  environment = environment;
  communityTagsLength: number;
  tags: string[] = [];
  skeletonLoaderCard = true;

  // constructor(private featuredCommunitiesService: FeaturedCommunitiesService) {}
  constructor(private featuredItemsService: FeaturedItemsService) {}

  ngOnInit(): void {
    // this.communityTagsLength = Object.keys(this.featuredCommunities.tags).length;
    this.getFeaturedCommunities();
  }

  // getFeaturedCommunities(): void {
  //   this.featuredCommunitiesService.getLatestFeaturedCommunities().subscribe((value) => {
  //     this.featuredCommunities = value.featured_communities;
  //     this.skeletonLoaderCard = false;
  //   });
  // }

  getFeaturedCommunities(): void {
    this.featuredItemsService.getFeaturedItems('Kommunity').subscribe((data) => {
      this.featuredCommunities = this.featuredCommunities.concat(
        data.page.reduce((acc, value) => [...acc, value.data], []),
      );
      console.log(this.featuredCommunities);
      this.skeletonLoaderCard = false;
    });
  }

  // getTagNames() {
  //   this.tags = Object.values(this.featuredCommunities.tags).map((tag) => tag.name);
  //   return this.tags;
  // }
}
