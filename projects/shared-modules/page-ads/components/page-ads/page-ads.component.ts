import { Component, Input, OnInit } from '@angular/core';
import { IPageAd } from 'projects/shared-models/page-ad.model';
import { PageAdsService } from 'projects/shared-modules/page-ads/services/page-ads.service';

@Component({
  selector: 'app-pa-slots',
  templateUrl: './page-ads.component.html',
  styleUrls: ['./page-ads.component.scss'],
})
export class PageAdsComponent implements OnInit {
  @Input() showTitle: boolean;
  @Input() showContent: boolean;
  @Input() adHeight: number;
  @Input() adWidth: number;
  @Input() slot: string;

  pageAd: IPageAd;

  constructor(private pageAdsService: PageAdsService) {}

  ngOnInit(): void {
    this.getAd();
  }

  getAd(defaultAd: boolean = false, forceStop: boolean = true): void {
    this.pageAdsService.getActiveAd(this.slot, defaultAd).subscribe((value) => {
      this.pageAd = value;
      if (value == null && forceStop) {
        this.getAd(true, false);
      }
    });
  }
}
