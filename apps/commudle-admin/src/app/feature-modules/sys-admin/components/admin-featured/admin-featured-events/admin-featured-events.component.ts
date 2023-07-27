import { Component, OnInit } from '@angular/core';
import { IPageInfo } from '@commudle/shared-models';
import { NbDialogService } from '@commudle/theme';
import { CreateFeaturedItemComponent } from 'apps/commudle-admin/src/app/feature-modules/sys-admin/components/admin-featured/create-featured-item/create-featured-item.component';
import { DeleteFeaturedItemComponent } from 'apps/commudle-admin/src/app/feature-modules/sys-admin/components/admin-featured/delete-featured-item/delete-featured-item.component';
import { SysAdminFeaturedItemsService } from 'apps/commudle-admin/src/app/feature-modules/sys-admin/services/sys-admin-featured-items.service';
import { IFeaturedItems } from 'apps/shared-models/featured-items.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';

@Component({
  selector: 'commudle-admin-featured-events',
  templateUrl: './admin-featured-events.component.html',
  styleUrls: ['./admin-featured-events.component.scss'],
})
export class AdminFeaturedEventsComponent implements OnInit {
  featuredItems: IFeaturedItems[] = [];
  isLoading = true;
  pageInfo: IPageInfo;
  constructor(
    private featuredService: SysAdminFeaturedItemsService,
    private nbDialogService: NbDialogService,
    private libToastLogService: LibToastLogService,
  ) {}

  ngOnInit(): void {
    this.getFeaturedItems();
  }
  getFeaturedItems() {
    this.featuredService.getAllFeaturedItems('Event', this.pageInfo?.end_cursor).subscribe((data) => {
      this.featuredItems = this.featuredItems.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
      this.pageInfo = data.page_info;
      this.isLoading = false;
    });
  }

  openCreateFeaturedDialog(): void {
    const dialogRef = this.nbDialogService
      .open(CreateFeaturedItemComponent, {
        closeOnEsc: false,
        closeOnBackdropClick: false,
        context: {
          entityType: 'Event',
        },
      })
      .onClose.subscribe((data) => {
        if (data) this.featuredItems.unshift(data);
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
        if (value) this.featuredItems.splice(index, 1);
      });
  }

  updateFeaturedCommunity(featuredBuildId: number, newStatus, index): void {
    this.featuredService
      .updateFeaturedItems(featuredBuildId, { featured_item: { active: newStatus } })
      .subscribe((data) => {
        if (data) {
          this.libToastLogService.successDialog('Updated featured Event successfully');
          this.featuredItems[index] = data;
        }
      });
  }
}
