import { Component, Input, OnInit } from '@angular/core';
import { faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';
import { ICaseStudy } from 'apps/shared-models/case-study.model';
import { CmsService } from 'apps/shared-services/cms.service';

@Component({
  selector: 'commudle-case-study-card',
  templateUrl: './case-study-card.component.html',
  styleUrls: ['./case-study-card.component.scss'],
})
export class CaseStudyCardComponent implements OnInit {
  @Input() caseStudy: ICaseStudy;
  faSquareArrowUpRight = faSquareArrowUpRight;
  staticAssets = staticAssets;

  constructor(private cmsService: CmsService) {}

  ngOnInit(): void {}

  imageUrl(source: any) {
    return this.cmsService.getImageUrl(source);
  }
}
