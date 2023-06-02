import { Component, Input, OnInit } from '@angular/core';
import { NbButtonModule, NbIconModule } from '@commudle/theme';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { IFeaturedCommunity } from 'apps/shared-models/featured-community.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { PublicCommunityModule } from 'apps/commudle-admin/src/app/feature-modules/public-community/public-community.module';
@Component({
  selector: 'commudle-featured-communities-card',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    NbButtonModule,
    SharedComponentsModule,
    PublicCommunityModule,
    NbIconModule,
  ],
  templateUrl: './featured-communities-card.component.html',
  styleUrls: ['./featured-communities-card.component.scss'],
})
export class FeaturedCommunitiesCardComponent implements OnInit {
  @Input() featuredCommunity: IFeaturedCommunity;
  @Input() horizontalScroll = false;
  faCheck = faCheck;
  faPlus = faPlus;
  constructor() {}

  ngOnInit(): void {}
}
