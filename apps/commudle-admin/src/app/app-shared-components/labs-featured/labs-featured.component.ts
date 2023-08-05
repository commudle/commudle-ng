import { Component, Input, OnInit } from '@angular/core';
import { FeaturedItemsService } from 'apps/commudle-admin/src/app/services/featured-items.service';
import { IFeaturedItems } from 'apps/shared-models/featured-items.model';
import { CommonModule } from '@angular/common';
import { NbCardModule } from '@commudle/theme';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { SkeletonCardsComponent } from '../../feature-modules/skeleton-screens/components/skeleton-cards/skeleton-cards.component';
import { LabsFeaturedCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/labs-featured-card/labs-featured-card.component';

@Component({
  selector: 'commudle-labs-featured',
  standalone: true,
  templateUrl: './labs-featured.component.html',
  styleUrls: ['./labs-featured.component.scss'],
  imports: [CommonModule, NbCardModule, SharedComponentsModule, SkeletonCardsComponent, LabsFeaturedCardComponent],
})
export class LabsFeaturedComponent implements OnInit {
  @Input() showCardsHorizontal = false;
  featuredItems: IFeaturedItems[] = [];
  showSpinner = false;
  isMobileView: boolean;

  constructor(private featuredItemsService: FeaturedItemsService) {}

  ngOnInit(): void {
    this.isMobileView = window.innerWidth <= 1024;
    this.getFeaturedCommunities();
  }

  getFeaturedCommunities(): void {
    this.showSpinner = true;
    this.featuredItemsService.getFeaturedItems('Lab').subscribe((data) => {
      this.featuredItems = this.featuredItems.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
      console.log(data);
      this.showSpinner = false;
    });
  }
}
