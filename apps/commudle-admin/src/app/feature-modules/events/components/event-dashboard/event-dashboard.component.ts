import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunity } from 'apps/shared-models/community.model';
import { EEventStatuses } from 'apps/shared-models/enums/event_statuses.enum';
import { IEvent } from 'apps/shared-models/event.model';
import { SeoService } from 'apps/shared-services/seo.service';
import * as moment from 'moment';
import {
  faUpRightFromSquare,
  faShareNodes,
  faCircleInfo,
  faChartLine,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { faClipboard, faEnvelopeOpen, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { NavigatorShareService } from 'apps/shared-services/navigator-share.service';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { environment } from 'apps/commudle-admin/src/environments/environment';
import { NbWindowService } from '@commudle/theme';
import { EmailerComponent } from 'apps/commudle-admin/src/app/app-shared-components/emailer/emailer.component';
import { EemailTypes } from 'apps/shared-models/enums/email_types.enum';
import { FooterService } from 'apps/commudle-admin/src/app/services/footer.service';
import { ESidebarWidth } from 'apps/shared-models/enums/sidebar.enum';

@Component({
  selector: 'app-event-dashboard',
  templateUrl: './event-dashboard.component.html',
  styleUrls: ['./event-dashboard.component.scss'],
})
export class EventDashboardComponent implements OnInit, OnDestroy {
  event: IEvent;
  community: ICommunity;

  moment = moment;
  EEventStatuses = EEventStatuses;

  isLoading = false;

  icons = {
    faUpRightFromSquare,
    faClipboard,
    faChartLine,
    faShareNodes,
    faCircleInfo,
    faArrowLeft,
    faEnvelopeOpen,
    faEnvelope,
  };

  ESidebarWidth = ESidebarWidth;
  constructor(
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
    private navigatorShareService: NavigatorShareService,
    private libToastLogService: LibToastLogService,
    private clipboard: Clipboard,
    private windowService: NbWindowService,
    private footerService: FooterService,
  ) {}

  ngOnInit() {
    this.seoService.noIndex(true);
    this.footerService.changeMiniFooterStatus(false);

    this.activatedRoute.data.subscribe((value) => {
      this.event = value.event;
      this.community = value.community;
      this.seoService.setTitle(`Admin - ${this.event.name} - ${this.community.name}`);
    });
  }

  ngOnDestroy() {
    this.seoService.noIndex(false);
    this.footerService.changeMiniFooterStatus(true);
  }

  copyTextToClipboard(): void {
    const content = environment.app_url + '/communities/' + this.community.slug + '/events/' + this.event.slug;
    if (!this.navigatorShareService.canShare()) {
      if (this.clipboard.copy(content)) {
        this.libToastLogService.successDialog('Copied the message successfully!');
        return;
      }
    }

    this.navigatorShareService
      .share({
        title: this.community.name,
        url: content,
      })
      .then(() => {
        this.libToastLogService.successDialog('Shared Successfully!');
      });
  }

  sendEmails() {
    this.windowService.open(EmailerComponent, {
      title: `Send RSVP To All Shortlisted`,
      context: {
        community: this.community,
        event: this.event,

        mailType: EemailTypes.RSVP,
      },
    });
  }
}
