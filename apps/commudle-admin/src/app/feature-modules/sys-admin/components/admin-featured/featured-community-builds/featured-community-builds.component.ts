import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@commudle/theme';
import { CreateFeaturedItemComponent } from 'apps/commudle-admin/src/app/feature-modules/sys-admin/components/admin-featured/create-featured-item/create-featured-item.component';
import { DeleteFeaturedItemComponent } from 'apps/commudle-admin/src/app/feature-modules/sys-admin/components/admin-featured/delete-featured-item/delete-featured-item.component';
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

  openCreateFeaturedDialog(): void {
    const dialogRef = this.nbDialogService
      .open(CreateFeaturedItemComponent, {
        closeOnEsc: false,
        closeOnBackdropClick: false,
        context: {
          entityType: 'CommunityBuild',
        },
      })
      .onClose.subscribe((data) => {
        if (data) this.communityBuilds.unshift(data);
      });
  }

  openDeleteFeaturedDialog(featuredBuildId: number, index): void {
    const dialogRef = this.nbDialogService
      .open(DeleteFeaturedItemComponent, {
        closeOnEsc: false,
        closeOnBackdropClick: false,
        context: {
          featuredItemId: featuredBuildId,
        },
      })
      .onClose.subscribe((value) => {
        if (value) this.communityBuilds.splice(index, 1);
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
}
