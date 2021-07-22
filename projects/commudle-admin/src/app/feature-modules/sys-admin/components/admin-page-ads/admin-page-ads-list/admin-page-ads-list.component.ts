import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { SysAdminPageAdsService } from 'projects/commudle-admin/src/app/feature-modules/sys-admin/services/sys-admin-page-ads.service';
import { IPageAd } from 'projects/shared-models/page-ad.model';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';

@Component({
  selector: 'app-admin-page-ads-list',
  templateUrl: './admin-page-ads-list.component.html',
  styleUrls: ['./admin-page-ads-list.component.scss'],
})
export class AdminPageAdsListComponent implements OnInit {
  currentAdId;
  ads: IPageAd[] = [];
  page = 1;
  count = 5;
  total = -1;

  @ViewChild('confirmDeleteAd') confirmDeleteAdDialogue: TemplateRef<any>;

  constructor(
    private sysAdminPageAdsService: SysAdminPageAdsService,
    private dialogService: NbDialogService,
    private toastLogService: LibToastLogService,
  ) {}

  ngOnInit(): void {
    this.getAds();
  }

  getAds(): void {
    if (this.ads.length !== this.total) {
      this.sysAdminPageAdsService.getAllAds(this.page, this.count).subscribe((value) => {
        this.ads = this.ads.concat(value.page_ads);
        this.page = +value.page;
        this.total = +value.total;
        this.page += 1;
      });
    }
  }

  confirmDeleteAdOpen(adId: number): void {
    this.currentAdId = adId;
    this.dialogService.open(this.confirmDeleteAdDialogue);
  }

  deleteAd(): void {
    if (this.currentAdId) {
      this.sysAdminPageAdsService.deleteAd(this.currentAdId).subscribe((data) => {
        if (data) {
          this.toastLogService.successDialog('Successfully deleted ad!');
          this.getAds();
        }
      });
    }
  }
}
