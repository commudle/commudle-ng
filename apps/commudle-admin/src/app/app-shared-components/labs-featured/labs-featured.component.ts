import { Component, Input, OnInit } from '@angular/core';
import { FeaturedItemsService } from 'apps/commudle-admin/src/app/services/featured-items.service';
import { IFeaturedItems } from 'apps/shared-models/featured-items.model';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';
// import { CommonModule } from '@angular/common';
// import { NbCardModule } from '@commudle/theme';
// import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
// import { SkeletonCardsComponent } from '../../feature-modules/skeleton-screens/components/skeleton-cards/skeleton-cards.component';

@Component({
  selector: 'commudle-labs-featured',
  templateUrl: './labs-featured.component.html',
  styleUrls: ['./labs-featured.component.scss'],
})
export class LabsFeaturedComponent implements OnInit {
  @Input() showCardsHorizontal = false;
  featuredCommunities: IFeaturedItems[] = [];
  showSpinner = false;
  isMobileView: boolean;

  constructor(private featuredItemsService: FeaturedItemsService) {}

  ngOnInit(): void {
    this.isMobileView = window.innerWidth <= 1024;
    this.getFeaturedCommunities();
  }

  getFeaturedCommunities(): void {
    // this.showSpinner = true;
    this.featuredItemsService.getFeaturedItems('Labs').subscribe((data) => {
      this.featuredCommunities = this.featuredCommunities.concat(
        data.page.reduce((acc, value) => [...acc, value.data], []),
      );
      this.showSpinner = false;
    });
  }
}
