import { Component, OnDestroy, OnInit } from '@angular/core';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';
import { SeoService } from 'apps/shared-services/seo.service';
import { CmsService } from 'apps/shared-services/cms.service';
import { IListingPageHeader } from 'apps/shared-models/listing-page-header.model';
import { FooterService } from 'apps/commudle-admin/src/app/services/footer.service';

@Component({
  selector: 'commudle-experts-program',
  templateUrl: './experts-program.component.html',
  styleUrls: ['./experts-program.component.scss'],
})
export class ExpertsProgramComponent implements OnInit, OnDestroy {
  staticAssets = staticAssets;
  expertsProgramPageHeader: IListingPageHeader;
  richText: string;

  questions = [
    'Can I apply for more than one expert badge?',
    'How much time does it take to get onboarded as an expert?',
    'Does filling the application form guarantee that I will get selected as an expert?',
    'Is my blue tick or expert badge permanent?',
    'Is this a paid program?',
  ];

  answers = [
    'Yes, you can apply based on your expertise skillset',
    'On submission of Expert Application Form, we will analyse it on multiple criteria including verification of the links and other details shared with us, this could take 1-2 weeks. ',
    'The application form is your nomination for the Expert Program. Basis your input we will evaluate your profile. Make sure you keep your Commudle Profile updated even after submission.',
    'A blue tick or an expert badge is subject to your activity on the platform. We have an activity criteria to meet which ensures that the expert badge and blue tick are present on your Commudle Profile.',
    'Commudle does not charge any fee participating in this program. This program is designed to support and recognize techies enthusiastic to build and share their skills with the developer community.',
  ];
  constructor(private seoService: SeoService, private cmsService: CmsService, private footerService: FooterService) {}

  ngOnInit(): void {
    this.footerService.changeFooterStatus(true);
    this.setMeta();
    this.getHeaderText();
  }

  setMeta() {
    this.seoService.setTags(
      'Experts Program',
      'Help software developers, designers and developer communities across the world by joining our experts program. Get recognized with a badge and a blue tick.',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }

  imageUrl(source: any) {
    return this.cmsService.getImageUrl(source);
  }

  getHeaderText() {
    this.cmsService.getDataBySlug('expert-program').subscribe((data) => {
      if (data) {
        this.expertsProgramPageHeader = data;
        this.richText = this.cmsService.getHtmlFromBlock(data);
      }
    });
  }

  ngOnDestroy(): void {
    this.footerService.changeFooterStatus(false);
  }
}
