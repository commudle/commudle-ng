import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IGuideline } from 'projects/commudle-admin/src/app/feature-modules/public-pages/models/guideline.model';
import { CmsService } from 'projects/shared-services/cms.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-public-page-guidelines',
  templateUrl: './public-page-guidelines.component.html',
  styleUrls: ['./public-page-guidelines.component.scss'],
})
export class PublicPageGuidelinesComponent implements OnInit {
  guideline: IGuideline;
  richText;

  constructor(private cmsService: CmsService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.activatedRoute.params.pipe(map((value: Params) => value.name)).subscribe((slug) => {
      this.cmsService.getData(slug).subscribe((value: IGuideline) => {
        this.guideline = value;
        this.richText = this.cmsService.getHtmlFromBlock(value);
      });
    });
  }
}
