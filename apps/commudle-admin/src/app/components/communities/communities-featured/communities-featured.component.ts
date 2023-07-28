import { Component, OnInit } from '@angular/core';
import { FeaturedCommunitiesService } from 'apps/commudle-admin/src/app/services/featured-communities.service';
import { environment } from 'apps/commudle-admin/src/environments/environment';
import { IFeaturedCommunity } from 'apps/shared-models/featured-community.model';

@Component({
  selector: 'app-communities-featured',
  templateUrl: './communities-featured.component.html',
  styleUrls: ['./communities-featured.component.scss'],
})
export class CommunitiesFeaturedComponent implements OnInit {
  featuredCommunities: IFeaturedCommunity[] = [];
  environment = environment;
  communityTagsLength: number;
  tags: string[] = [];
  skeletonLoaderCard = true;

  constructor(private featuredCommunitiesService: FeaturedCommunitiesService) {}

  ngOnInit(): void {
    // this.communityTagsLength = Object.keys(this.featuredCommunities.tags).length;
    this.getFeaturedCommunities();
  }

  getFeaturedCommunities(): void {
    this.featuredCommunitiesService.getLatestFeaturedCommunities().subscribe((value) => {
      this.featuredCommunities = value.featured_communities;
      this.skeletonLoaderCard = false;
    });
  }

  // getTagNames() {
  //   this.tags = Object.values(this.featuredCommunities.tags).map((tag) => tag.name);
  //   return this.tags;
  // }
}
