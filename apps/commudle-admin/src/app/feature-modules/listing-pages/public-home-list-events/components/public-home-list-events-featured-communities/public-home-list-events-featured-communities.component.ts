import { Component, Input, OnInit } from '@angular/core';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FeaturedItemsService } from 'apps/commudle-admin/src/app/services/featured-items.service';
import { IFeaturedItems } from 'apps/shared-models/featured-items.model';

@Component({
  selector: 'commudle-public-home-list-events-featured-communities',
  templateUrl: './public-home-list-events-featured-communities.component.html',
  styleUrls: ['./public-home-list-events-featured-communities.component.scss'],
})
export class PublicHomeListEventsFeaturedCommunitiesComponent implements OnInit {
  @Input() showCardsHorizontal = false;
  @Input() showIconsOnHeading = false;
  featuredCommunities: IFeaturedItems[] = [];
  showSpinner = false;
  isMobileView: boolean;
  faUserGroup = faUserGroup;

  constructor(private featuredItemsService: FeaturedItemsService) {}

  ngOnInit(): void {
    this.isMobileView = window.innerWidth <= 1024;
    this.getFeaturedCommunities();
  }

  getFeaturedCommunities(): void {
    this.showSpinner = true;
    this.featuredItemsService.getFeaturedItems('Kommunity').subscribe((data) => {
      this.featuredCommunities = this.featuredCommunities.concat(
        data.page.reduce((acc, value) => [...acc, value.data], []),
      );
      this.showSpinner = false;
    });
  }
}
