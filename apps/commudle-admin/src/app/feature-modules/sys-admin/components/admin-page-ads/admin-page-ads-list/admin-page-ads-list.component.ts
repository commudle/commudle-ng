import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { SysAdminPageAdsService } from 'apps/commudle-admin/src/app/feature-modules/sys-admin/services/sys-admin-page-ads.service';
import { IPageAd } from '@commudle/shared-models';
import { LibToastLogService } from '@commudle/shared-services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-admin-pa-slots-list',
  templateUrl: './admin-page-ads-list.component.html',
  styleUrls: ['./admin-page-ads-list.component.scss'],
})
export class AdminPageAdsListComponent implements OnInit, OnDestroy {
  currentAdId;
  ads: IPageAd[] = [];
  page = 1;
  count = 5;
  total = -1;
  subscriptions: Subscription[] = [];

  @ViewChild('confirmDeleteAd') confirmDeleteAdDialogue: TemplateRef<any>;

  constructor(
    private sysAdminPageAdsService: SysAdminPageAdsService,
    private dialogService: NbDialogService,
    private toastLogService: LibToastLogService,
  ) {}

  ngOnInit(): void {
    this.getAds();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((value) => value.unsubscribe());
  }

  getAds(): void {
    if (this.ads.length !== this.total) {
      this.subscriptions.push(
        this.sysAdminPageAdsService.getAllAds(this.page, this.count).subscribe((value) => {
          this.ads = this.ads.concat(value.page_ads);
          this.page = +value.page;
          this.total = +value.total;
          this.page += 1;
        }),
      );
    }
  }

  confirmDeleteAdOpen(adId: number): void {
    this.currentAdId = adId;
    this.dialogService.open(this.confirmDeleteAdDialogue);
  }

  deleteAd(): void {
    if (this.currentAdId) {
      this.subscriptions.push(
        this.sysAdminPageAdsService.deleteAd(this.currentAdId).subscribe((data) => {
          if (data) {
            this.toastLogService.successDialog('Successfully deleted ad!');
            this.ads = [];
            this.page = 1;
            this.total = -1;
            this.getAds();
          }
        }),
      );
    }
  }
}
