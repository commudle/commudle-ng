import { Component, Input, OnInit } from '@angular/core';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FeaturedCommunitiesService } from 'apps/commudle-admin/src/app/services/featured-communities.service';
import { IFeaturedCommunity } from 'apps/shared-models/featured-community.model';

@Component({
  selector: 'commudle-public-home-list-events-featured-communities',
  templateUrl: './public-home-list-events-featured-communities.component.html',
  styleUrls: ['./public-home-list-events-featured-communities.component.scss'],
})
export class PublicHomeListEventsFeaturedCommunitiesComponent implements OnInit {
  @Input() showCardsHorizontal = false;
  @Input() showIconsOnHeading = false;
  featuredCommunities: IFeaturedCommunity[] = [];
  showSpinner = false;
  isMobileView: boolean;
  faUserGroup = faUserGroup;

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
