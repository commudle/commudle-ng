import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IPageAd } from 'projects/shared-models/page-ad.model';
import { SysAdminPageAdsService } from '../../../services/sys-admin-page-ads.service';
import * as moment from 'moment';
import { NbDialogService } from '@nebular/theme';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';

@Component({
  selector: 'app-admin-page-ads-list',
  templateUrl: './admin-page-ads-list.component.html',
  styleUrls: ['./admin-page-ads-list.component.scss']
})
export class AdminPageAdsListComponent implements OnInit {

  @ViewChild('confirmDeleteAd') confirmDeleteAdDialogue: TemplateRef<any>;

  ads: IPageAd[];
  moment = moment;
  currentAdId;

  constructor(
    private adService: SysAdminPageAdsService,
    private dialogService: NbDialogService,
    private toastLogService: LibToastLogService
  ) { }

  ngOnInit(): void {
    this.adService.getAllAds().subscribe((data) => {
      this.ads = data.page_ads;
    })
  }

  confirmDeleteAdOpen(adId) {
    this.currentAdId = adId;
    this.dialogService.open(this.confirmDeleteAdDialogue);
  }

  deleteAd() {
    if(this.currentAdId) {
      this.adService.deleteAd(this.currentAdId).subscribe((data) => {
        if(data) {
          this.toastLogService.successDialog('Deleted!');
        }
      });
    }
  }
}
