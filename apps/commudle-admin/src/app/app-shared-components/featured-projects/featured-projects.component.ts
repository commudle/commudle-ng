import { Component, Input, OnInit } from '@angular/core';
import { FeaturedItemsService } from 'apps/commudle-admin/src/app/services/featured-items.service';
import { IFeaturedItems } from 'apps/shared-models/featured-items.model';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';
import { CommonModule } from '@angular/common';
import { NbCardModule } from '@commudle/theme';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { FeaturedProjectsCardComponent } from '../featured-projects-card/featured-projects-card.component';
import { SkeletonCardsComponent } from '../../feature-modules/skeleton-screens/components/skeleton-cards/skeleton-cards.component';

@Component({
  selector: 'commudle-featured-projects',
  standalone: true,
  templateUrl: './featured-projects.component.html',
  styleUrls: ['./featured-projects.component.scss'],
  imports: [CommonModule, NbCardModule, SharedComponentsModule, FeaturedProjectsCardComponent, SkeletonCardsComponent],
})
export class FeaturedProjectsComponent implements OnInit {
  @Input() showCardsHorizontal = false;
  @Input() showTag = true;
  featuredProjects: IFeaturedItems[] = [];
  staticAssets = staticAssets;
  showSpinner = true;
  isMobileView: boolean;

  constructor(private featuredItemsService: FeaturedItemsService) {}

  ngOnInit(): void {
    this.isMobileView = window.innerWidth <= 1024;
    this.getFeaturedProjects();
  }

  getFeaturedProjects() {
    this.featuredItemsService.getFeaturedItems('CommunityBuild').subscribe((data) => {
      this.featuredProjects = this.featuredProjects.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
      this.showSpinner = false;
    });
  }
}
