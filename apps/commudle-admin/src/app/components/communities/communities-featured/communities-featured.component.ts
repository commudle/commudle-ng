import { Component, OnInit } from '@angular/core';
import { FeaturedItemsService } from 'apps/commudle-admin/src/app/services/featured-items.service';
import { environment } from 'apps/commudle-admin/src/environments/environment';
import { IFeaturedItems } from 'apps/shared-models/featured-items.model';

@Component({
  selector: 'app-communities-featured',
  templateUrl: './communities-featured.component.html',
  styleUrls: ['./communities-featured.component.scss'],
})
export class CommunitiesFeaturedComponent implements OnInit {
  featuredCommunities: IFeaturedItems[] = [];
  environment = environment;
  communityTagsLength: number;
  tags: string[] = [];
  skeletonLoaderCard = true;

  constructor(private featuredItemsService: FeaturedItemsService) {}

  ngOnInit(): void {
    this.getFeaturedCommunities();
  }

  getFeaturedCommunities(): void {
    this.featuredItemsService.getFeaturedItems('Kommunity').subscribe((data) => {
      this.featuredCommunities = this.featuredCommunities.concat(
        data.page.reduce((acc, value) => [...acc, value.data], []),
      );
      this.skeletonLoaderCard = false;
    });
  }

  getTagNames(community) {
    this.tags = community.tags.map((tag) => tag.name);
    return this.tags;
  }
}
