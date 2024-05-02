import { Component, Input, OnInit } from '@angular/core';
import { IFeature } from 'apps/shared-models/features.model';
import { CmsService } from 'apps/shared-services/cms.service';

@Component({
  selector: 'commudle-features-content',
  templateUrl: './features-content.component.html',
  styleUrls: ['./features-content.component.scss'],
})
export class FeaturesContentComponent implements OnInit {
  @Input() featureData: IFeature;
  constructor(private cmsService: CmsService) {}

  ngOnInit(): void {}

  imageUrl(source: any) {
    return this.cmsService.getImageUrl(source);
  }
}
