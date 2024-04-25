import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFeatures } from 'apps/shared-models/features.model';
import { CmsService } from 'apps/shared-services/cms.service';
import { SeoService } from 'apps/shared-services/seo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit {
  features: IFeatures[];
  isLoading = true;
  featureData: IFeatures;
  isMobileView: boolean;
  subscriptions: Subscription[] = [];

  constructor(private cmsService: CmsService, private activatedRoute: ActivatedRoute, private seoService: SeoService) {
    activatedRoute.params.subscribe(() => {
      this.getFeaturesData();
    });
  }

  ngOnInit(): void {
    this.isMobileView = window.innerWidth <= 640;
    this.getIndex();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getIndex() {
    this.cmsService.getDataByType('featuredPage').subscribe((data) => {
      if (data) {
        this.features = data;
      }
    });
  }

  getFeaturesData() {
    this.isLoading = true;
    this.featureData = null;
    const slug: string = this.activatedRoute.snapshot.params.slug;
    this.subscriptions.push(
      this.cmsService.getDataBySlug(slug).subscribe((value) => {
        if (value) {
          this.featureData = value;
          // this.setMeta(value.chapter_name, value?.meta_description);
        }
        this.isLoading = false;
      }),
    );
  }

  // setMeta(chapter_name, description) {
  //   this.seoService.setTags(
  //     chapter_name,
  //     description ? description : '',
  //     'https://commudle.com/assets/images/commudle-logo192.png',
  //   );
  // }
}