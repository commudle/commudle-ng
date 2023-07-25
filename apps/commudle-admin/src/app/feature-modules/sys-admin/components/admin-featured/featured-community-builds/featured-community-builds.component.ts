import { Component, OnInit } from '@angular/core';
import { SysAdminFeaturedItemsService } from 'apps/commudle-admin/src/app/feature-modules/sys-admin/services/sys-admin-featured-items.service';
import { IFeaturedItems } from 'apps/shared-models/featured-items.model';

@Component({
  selector: 'commudle-featured-community-builds',
  templateUrl: './featured-community-builds.component.html',
  styleUrls: ['./featured-community-builds.component.scss'],
})
export class FeaturedCommunityBuildsComponent implements OnInit {
  communityBuilds: IFeaturedItems[] = [];
  constructor(private featuredService: SysAdminFeaturedItemsService) {}

  ngOnInit(): void {
    this.getFeaturedItems();
  }

  getFeaturedItems() {
    this.featuredService.getAllFeaturedItems('CommunityBuild').subscribe((data) => {
      this.communityBuilds = this.communityBuilds.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
    });
  }
}
