import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IHomepageAction } from 'projects/commudle-admin/src/app/feature-modules/homepage/models/homepage-action.model';
import { SearchStatusService } from 'projects/commudle-admin/src/app/feature-modules/search/services/search-status.service';
import { CmsService } from 'projects/shared-services/cms.service';
import { IsBrowserService } from 'projects/shared-services/is-browser.service';
import { SeoService } from 'projects/shared-services/seo.service';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, OnDestroy, AfterViewInit {
  timer$: Observable<number>;

  @ViewChild('homepageAnimation', { static: false }) homepageAnimationContainer: ElementRef<HTMLDivElement>;

  homepageActions: IHomepageAction[] = [];
  homepageCallouts: { subtitle: string; title: string }[] = [
    {
      title: 'Are you a Student?',
      subtitle: 'Start a Developer community for Free!',
    },
    {
      title: 'Are you a DevRel?',
      subtitle: 'Build your Developer Ecosystem',
    },
    {
      title: 'Are you a Startup?',
      subtitle: 'Build your brand with communities & network',
    },
  ];

  constructor(
    private seoService: SeoService,
    private searchStatusService: SearchStatusService,
    private cmsService: CmsService,
    public isBrowserService: IsBrowserService,
  ) {
    if (this.isBrowserService.isBrowser()) {
      this.timer$ = timer(0, 3000);
    }
  }

  ngOnInit(): void {
    this.searchStatusService.setSearchStatus(false);

    this.getHomepageActions();

    this.seoService.setTags(
      'Commudle - Connect & Learn With Software Developers',
      'A community platform for software developers to connect over online events, channels, share knowledge & find jobs. Join now to build your "Developer Network".',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }

  ngOnDestroy(): void {
    this.searchStatusService.setSearchStatus(true);
  }

  ngAfterViewInit(): void {
    if (this.isBrowserService.isBrowser()) {
      import('lottie-web').then((l) => {
        l.default.loadAnimation({
          container: this.homepageAnimationContainer.nativeElement,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: 'https://assets7.lottiefiles.com/packages/lf20_3lol1shu/json files/json file.json',
        });
      });
    }
  }

  getHomepageActions() {
    this.cmsService.getDataByType('homepageActions').subscribe((value: IHomepageAction[]) => {
      this.homepageActions = value.sort((a, b) => a.order - b.order);
    });
  }
}
