import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faAdd, faMinus } from '@fortawesome/free-solid-svg-icons';
import { IFeature } from 'apps/shared-models/features.model';
import { CmsService } from 'apps/shared-services/cms.service';

@Component({
  selector: 'commudle-features-index',
  templateUrl: './features-index.component.html',
  styleUrls: ['./features-index.component.scss'],
})
export class FeaturesIndexComponent implements OnInit {
  @Input() features: IFeature[];
  @Input() selectedFeature: IFeature;
  @Output() featureSlug: EventEmitter<string> = new EventEmitter<string>();
  showSubHeading = [];
  faAdd = faAdd;
  faMinus = faMinus;
  isMobileView: boolean;
  selectedFeatureSlug: string;

  constructor(private cmsService: CmsService) {}

  ngOnInit(): void {
    this.isMobileView = window.innerWidth <= 640;
    this.featureSlug.emit(this.features[0].slug.current);
    this.selectedFeatureSlug = this.features[0].slug.current;
  }

  imageUrl(source: any) {
    return this.cmsService.getImageUrl(source);
  }

  toggleShowAnswers(slug, index?: number) {
    if (slug) {
      this.selectedFeatureSlug = slug;
      this.featureSlug.emit(slug);
    }
    for (let i = 0; i < this.showSubHeading.length; i++) {
      if (i !== index) {
        this.showSubHeading[i] = false;
      }
    }
    this.showSubHeading[index] = !this.showSubHeading[index];
  }
}
