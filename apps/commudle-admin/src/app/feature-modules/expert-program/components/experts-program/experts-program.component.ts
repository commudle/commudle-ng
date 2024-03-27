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

  questions = [
    'Is this a paid program?',
    'How much time does it take to get onboarded as an expert?',
    'Does filling the application form guarantee that I will get selected as an expert?',
    'Is my blue tick or expert badge permanent?',
    'Can I apply for more than one expert badge?',
  ];

  answers = [
    'No, neither does Commudle charge any fee nor pay for participating in this program. It is a voluntary engagement',
    'It takes about 15 working days or 3 weeks for you to be onboarded as an expert with a blue tick on your profile',
    'No, filling the form is a show of your interest. We cannot measure your expertise, but we do follow certain criteria to find and enlist experts. We keep on improving it.',
    'A blue tick or an expert badge is subject to your activity on the platform. We will set an activity criteria to complete which will help you retain the expert status on Commudle.',
    'Yes, but the selection depends on not only the experience and contributions but also the available slots for that domain.',
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
      }
    });
  }

  ngOnDestroy(): void {
    this.footerService.changeFooterStatus(false);
  }
}
