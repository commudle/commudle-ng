import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IFeature } from 'apps/shared-models/features.model';
import { CmsService } from 'apps/shared-services/cms.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit, OnDestroy {
  @Input() categoryName: string;
  @Input() showHeading = true;
  @Input() showSubHeading = true;
  features: IFeature[];
  isLoading = true;
  featureData: IFeature;
  isMobileView: boolean;
  subscriptions: Subscription[] = [];

  constructor(private cmsService: CmsService) {}

  ngOnInit(): void {
    this.isMobileView = window.innerWidth <= 640;
    this.getIndex();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getIndex() {
    if (this.categoryName) {
      this.subscriptions.push(
        this.cmsService
          .getDataByTypeWithFilter('featuredPage', 'category', this.categoryName, 100)
          .subscribe((value) => {
            if (value) {
              this.features = value;
            }
          }),
      );
    } else {
      this.subscriptions.push(
        this.cmsService.getDataByType('featuredPage').subscribe((value) => {
          if (value) {
            this.features = value;
          }
          this.isLoading = false;
        }),
      );
    }
  }

  getFeaturesData(slug) {
    this.isLoading = true;
    this.featureData = null;
    this.subscriptions.push(
      this.cmsService.getDataBySlug(slug).subscribe((value) => {
        if (value) {
          this.featureData = value;
        }
        this.isLoading = false;
      }),
    );
  }
}
