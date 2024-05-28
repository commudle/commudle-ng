import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IFeature } from 'apps/shared-models/features.model';
import { CmsService } from 'apps/shared-services/cms.service';
import { ResponsiveService } from 'apps/shared-services/responsive.service';
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
  selectedFeature: IFeature;
  isMobileView: boolean;
  subscriptions: Subscription[] = [];

  constructor(private cmsService: CmsService, private responsiveService: ResponsiveService) {}

  ngOnInit(): void {
    this.isMobileView = this.responsiveService.isMobileView();
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
    this.selectedFeature = null;
    this.subscriptions.push(
      this.cmsService.getDataBySlug(slug).subscribe((value) => {
        if (value) {
          this.selectedFeature = value;
        }
        this.isLoading = false;
      }),
    );
  }
}
