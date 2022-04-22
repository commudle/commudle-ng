import { Component, OnInit } from '@angular/core';
import { FeaturedCommunitiesService } from 'projects/commudle-admin/src/app/services/featured-communities.service';
import { environment } from 'projects/commudle-admin/src/environments/environment';
import { IFeaturedCommunity } from 'projects/shared-models/featured-community.model';

@Component({
  selector: 'app-communities-featured',
  templateUrl: './communities-featured.component.html',
  styleUrls: ['./communities-featured.component.scss'],
})
export class CommunitiesFeaturedComponent implements OnInit {
  featuredCommunities: IFeaturedCommunity[] = [];
  environment = environment;

  constructor(private featuredCommunitiesService: FeaturedCommunitiesService) {}

  ngOnInit(): void {
    this.getFeaturedCommunities();
  }

  getFeaturedCommunities(): void {
    this.featuredCommunitiesService.getLatestFeaturedCommunities().subscribe((value) => {
      this.featuredCommunities = value.featured_communities.slice(0, 4);
    });
  }
}
