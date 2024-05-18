import { Component, Input, OnInit } from '@angular/core';
import { faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons';
import { CmsService } from 'apps/shared-services/cms.service';

@Component({
  selector: 'commudle-case-studies-card',
  templateUrl: './case-studies-card.component.html',
  styleUrls: ['./case-studies-card.component.scss'],
})
export class CaseStudiesCardComponent implements OnInit {
  @Input() caseStudy: any;
  richTextTagline: string;
  faSquareArrowUpRight = faSquareArrowUpRight;

  constructor(private cmsService: CmsService) {}

  ngOnInit(): void {
    this.richTextTagline = this.cmsService.getHtmlFromBlock(this.caseStudy, 'tagline');
  }

  imageUrl(source: any) {
    return this.cmsService.getImageUrl(source);
  }
}
