import { Component, Input, OnInit } from '@angular/core';
import { ICommunity } from 'apps/shared-models/community.model';
import { RouterModule } from '@angular/router';
import { PublicCommunityModule } from 'apps/commudle-admin/src/app/feature-modules/public-community/public-community.module';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';

@Component({
  selector: 'app-communities-card',
  templateUrl: './communities-card.component.html',
  styleUrls: ['./communities-card.component.scss'],
  standalone: true,
  imports: [RouterModule, PublicCommunityModule, CommonModule, SharedComponentsModule],
})
export class CommunitiesCardComponent implements OnInit {
  @Input() community: ICommunity;
  @Input() horizontalScroll = false;

  count = 4;
  page = 1;
  communityTagsLength: number;
  tags: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.communityTagsLength = Object.keys(this.community.tags).length;
  }

  getTagNames() {
    this.tags = Object.values(this.community.tags).map((tag) => tag.name);
    return this.tags;
  }
}
