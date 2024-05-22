import { Component, Input, OnInit } from '@angular/core';
import { faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons';
import { ICaseStudy } from 'apps/shared-models/case-study.model';
import { CmsService } from 'apps/shared-services/cms.service';

@Component({
  selector: 'commudle-case-studies-card',
  templateUrl: './case-studies-card.component.html',
  styleUrls: ['./case-studies-card.component.scss'],
})
export class CaseStudiesCardComponent implements OnInit {
  @Input() caseStudy: ICaseStudy;
  faSquareArrowUpRight = faSquareArrowUpRight;

  constructor(private cmsService: CmsService) {}

  ngOnInit(): void {}

  imageUrl(source: any) {
    return this.cmsService.getImageUrl(source);
  }
}
