import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedComponentsModule } from '../../../../../shared-components/shared-components.module';
import { NbIconModule } from '@commudle/theme';
import { PublicCommunityModule } from '../../feature-modules/public-community/public-community.module';
import { IFeaturedItems } from 'apps/shared-models/featured-items.model';

@Component({
  selector: 'commudle-featured-community-card-medium',
  standalone: true,
  templateUrl: './featured-community-card-medium.component.html',
  styleUrls: ['./featured-community-card-medium.component.scss'],
  imports: [CommonModule, RouterModule, SharedComponentsModule, NbIconModule, PublicCommunityModule],
})
export class FeaturedCommunityCardMediumComponent implements OnInit {
  @Input() featuredItems: IFeaturedItems;
  tags: string[] = [];

  constructor() {}

  ngOnInit(): void {}

  getTagNames(community) {
    this.tags = community.tags.map((tag) => tag.name);
    return this.tags;
  }
}
