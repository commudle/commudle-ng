import { Component, Input, OnInit } from '@angular/core';
import { FeaturedItemsService } from 'apps/commudle-admin/src/app/services/featured-items.service';
import { IFeaturedItems } from 'apps/shared-models/featured-items.model';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';
import { CommonModule } from '@angular/common';
import { NbCardModule } from '@commudle/theme';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { FeaturedProjectsCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/featured-projects-card/featured-projects-card.component';
import { SkeletonCardsComponent } from 'apps/commudle-admin/src/app/feature-modules/skeleton-screens/components/skeleton-cards/skeleton-cards.component';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'commudle-featured-projects',
  standalone: true,
  templateUrl: './featured-projects.component.html',
  styleUrls: ['./featured-projects.component.scss'],
  imports: [
    CommonModule,
    NbCardModule,
    SharedComponentsModule,
    FeaturedProjectsCardComponent,
    SkeletonCardsComponent,
    FontAwesomeModule,
  ],
})
export class FeaturedProjectsComponent implements OnInit {
  @Input() showCardsHorizontal = false;
  @Input() showTag = true;
  @Input() showStarsEmojiOnHeading = true;
  @Input() showBulbEmojiOnHeading = false;
  featuredProjects: IFeaturedItems[] = [];
  staticAssets = staticAssets;
  showSpinner = true;
  isMobileView: boolean;
  faLightbulb = faLightbulb;

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
