import { Component, Input, OnInit } from '@angular/core';
import { FeaturedItemsService } from 'apps/commudle-admin/src/app/services/featured-items.service';
import { IFeaturedItems } from 'apps/shared-models/featured-items.model';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';
import { faFlask } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'commudle-labs-featured',
  templateUrl: './labs-featured.component.html',
  styleUrls: ['./labs-featured.component.scss'],
})
export class LabsFeaturedComponent implements OnInit {
  @Input() showCardsHorizontal = false;
  @Input() showStarsEmojiOnHeading = true;
  @Input() showFlaskEmojiOnHeading = false;
  staticAssets = staticAssets;
  featuredItems: IFeaturedItems[] = [];
  showSpinner = false;
  isMobileView: boolean;
  faFlask = faFlask;

  constructor(private featuredItemsService: FeaturedItemsService) {}

  ngOnInit(): void {
    this.isMobileView = window.innerWidth <= 1024;
    this.getFeaturedCommunities();
  }

  getFeaturedCommunities(): void {
    this.showSpinner = true;
    this.featuredItemsService.getFeaturedItems('Lab').subscribe((data) => {
      this.featuredItems = this.featuredItems.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
      this.showSpinner = false;
    });
  }
}
