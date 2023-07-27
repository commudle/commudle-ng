import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService } from '@commudle/theme';
import { SearchService } from 'apps/commudle-admin/src/app/feature-modules/search/services/search.service';
import { SysAdminFeaturedItemsService } from 'apps/commudle-admin/src/app/feature-modules/sys-admin/services/sys-admin-featured-items.service';
import { IFeaturedItems } from 'apps/shared-models/featured-items.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';

@Component({
  selector: 'commudle-featured-community-builds',
  templateUrl: './featured-community-builds.component.html',
  styleUrls: ['./featured-community-builds.component.scss'],
})
export class FeaturedCommunityBuildsComponent implements OnInit {
  communityBuilds: IFeaturedItems[] = [];
  isLoading = false;
  reason: string;
  searchQuery: string;
  entityId: number;
  searchResult = [];
  constructor(
    private featuredService: SysAdminFeaturedItemsService,
    private nbDialogService: NbDialogService,
    private libToastLogService: LibToastLogService,
    private searchService: SearchService,
  ) {}

  ngOnInit(): void {
    this.getFeaturedItems();
  }

  getFeaturedItems() {
    this.isLoading = true;
    this.featuredService.getAllFeaturedItems('CommunityBuild').subscribe((data) => {
      this.communityBuilds = this.communityBuilds.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
      this.isLoading = false;
    });
  }

  openDialog(templateRef: TemplateRef<any>, featuredBuildId: number = null, index?): void {
    this.nbDialogService.open(templateRef, {
      closeOnEsc: false,
      closeOnBackdropClick: false,
      context: {
        id: featuredBuildId,
        index: index,
      },
    });
  }
  updateFeaturedCommunity(featuredBuildId: number, newStatus, index): void {
    this.featuredService
      .updateFeaturedItems(featuredBuildId, { featured_item: { active: newStatus } })
      .subscribe((data) => {
        if (data) {
          this.libToastLogService.successDialog('Updated featured community successfully');
          this.communityBuilds[index] = data;
        }
      });
  }

  deleteFeaturedCommunity(featuredBuildId: number, index): void {
    this.featuredService.deleteFeaturedItems(featuredBuildId).subscribe((value) => {
      if (value) {
        this.libToastLogService.successDialog('Deleted featured community successfully');
        this.communityBuilds.splice(index, 1);
      }
    });
  }
  createFeaturedItems() {
    this.featuredService
      .createFeaturedItems({
        featured_item: { entity_type: 'CommunityBuild', entity_id: this.entityId, reason: this.reason },
      })
      .subscribe((data) => {
        this.communityBuilds.unshift(data);
      });
  }

  changeInput() {
    if (this.searchQuery.length >= 3) {
      this.searchService.getSearchResultsByScope(this.searchQuery, 1, 10, 'CommunityBuild').subscribe((data) => {
        this.searchResult = data.results;
      });
    }
  }
}
