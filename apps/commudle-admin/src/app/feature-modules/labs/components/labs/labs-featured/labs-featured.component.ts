import { Component, Input, OnInit } from '@angular/core';
import { FeaturedCommunitiesService } from 'apps/commudle-admin/src/app/services/featured-communities.service';
import { IFeaturedCommunity } from 'apps/shared-models/featured-community.model';

@Component({
  selector: 'commudle-labs-featured',
  templateUrl: './labs-featured.component.html',
  styleUrls: ['./labs-featured.component.scss'],
})
export class LabsFeaturedComponent implements OnInit {
  @Input() showCardsHorizontal = false;
  featuredCommunities: IFeaturedCommunity[] = [];
  showSpinner = false;
  isMobileView: boolean;

  constructor(private featuredCommunitiesService: FeaturedCommunitiesService) {}

  ngOnInit(): void {
    this.isMobileView = window.innerWidth <= 1024;
    this.getFeaturedCommunities();
  }

  getFeaturedCommunities(): void {
    this.showSpinner = true;
    this.featuredCommunitiesService.getLatestFeaturedCommunities().subscribe((value) => {
      this.featuredCommunities = value.featured_communities;
      this.showSpinner = false;
    });
  }
}
