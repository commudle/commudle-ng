import { Component, OnInit } from '@angular/core';
import { ICaseStudy } from 'apps/shared-models/case-study.model';
import { CmsService } from 'apps/shared-services/cms.service';

@Component({
  selector: 'commudle-case-studies-header',
  templateUrl: './case-studies-header.component.html',
  styleUrls: ['./case-studies-header.component.scss'],
})
export class CaseStudiesHeaderComponent implements OnInit {
  communitiesPageHeader: ICaseStudy;

  constructor(private cmsService: CmsService) {}

  ngOnInit(): void {
    this.getHeaderText();
  }

  imageUrl(source: any) {
    return this.cmsService.getImageUrl(source);
  }

  getHeaderText() {
    this.cmsService.getDataBySlug('case-study').subscribe((data) => {
      this.communitiesPageHeader = data;
    });
  }
}
