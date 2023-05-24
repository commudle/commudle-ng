import { Component, OnInit } from '@angular/core';
import { FeaturedCommunitiesService } from 'apps/commudle-admin/src/app/services/featured-communities.service';
import { IFeaturedCommunity } from 'apps/shared-models/featured-community.model';

@Component({
  selector: 'commudle-public-home-list-events-featured-communities',
  templateUrl: './public-home-list-events-featured-communities.component.html',
  styleUrls: ['./public-home-list-events-featured-communities.component.scss'],
})
export class PublicHomeListEventsFeaturedCommunitiesComponent implements OnInit {
  featuredCommunities: IFeaturedCommunity[] = [];

  constructor(private featuredCommunitiesService: FeaturedCommunitiesService) {}

  ngOnInit(): void {
    this.getFeaturedCommunities();
  }

  getFeaturedCommunities(): void {
    this.featuredCommunitiesService.getLatestFeaturedCommunities().subscribe((value) => {
      console.log(value);
      this.featuredCommunities = value.featured_communities;
    });
  }
}
