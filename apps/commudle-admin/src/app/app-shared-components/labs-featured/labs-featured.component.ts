import { Component, Input, OnInit } from '@angular/core';
import { FeaturedCommunitiesService } from 'apps/commudle-admin/src/app/services/featured-communities.service';
import { IFeaturedItems } from 'apps/shared-models/featured-items.model';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';
import { CommonModule } from '@angular/common';
import { NbCardModule } from '@commudle/theme';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { SkeletonCardsComponent } from '../../feature-modules/skeleton-screens/components/skeleton-cards/skeleton-cards.component';

@Component({
  selector: 'commudle-labs-featured',
  standalone: true,
  templateUrl: './labs-featured.component.html',
  styleUrls: ['./labs-featured.component.scss'],
  imports: [CommonModule, NbCardModule, SharedComponentsModule, SkeletonCardsComponent],
})
export class LabsFeaturedComponent implements OnInit {
  @Input() showCardsHorizontal = false;
  featuredCommunities: IFeaturedItems[] = [];
  showSpinner = false;
  isMobileView: boolean;

  // constructor(private featuredItemsService: FeaturedItemsService) {}

  ngOnInit(): void {
    this.isMobileView = window.innerWidth <= 1024;
    this.getFeaturedCommunities();
  }

  getFeaturedCommunities(): void {
    // this.showSpinner = true;
    // this.featuredCommunitiesService.getLatestFeaturedCommunities().subscribe((value) => {
    //   // this.featuredCommunities = value.featured_communities;
    //   this.showSpinner = false;
    // });
  }
}
