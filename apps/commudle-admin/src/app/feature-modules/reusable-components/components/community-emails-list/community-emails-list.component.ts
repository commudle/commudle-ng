import { NbWindowService } from '@commudle/theme';
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  TemplateRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { StatsCommunitiesService } from 'apps/commudle-admin/src/app/services/stats/stats-communities.service';
import { IFixedEmail } from 'apps/shared-models/fixed-email.model';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-community-emails-list',
  templateUrl: './community-emails-list.component.html',
  styleUrls: ['./community-emails-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityEmailsListComponent implements OnInit {
  @ViewChild('emailMessageTemplate') emailMessageTemplate: TemplateRef<any>;
  @Input() communityId;
  moment = moment;
  emails: IFixedEmail[] = [];
  isLoading = true;
  constructor(
    private statsCommunitiesService: StatsCommunitiesService,
    private windowService: NbWindowService,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.activatedRoute.parent.data.subscribe((data) => {
      this.communityId = data.community.id;
      this.getEmails();
    });
  }

  getEmails() {
    this.isLoading = true;
    this.emails = [];
    this.statsCommunitiesService.emails(this.communityId).subscribe((data) => {
      this.emails = data.fixed_emails;
      this.isLoading = false;
      this.changeDetectorRef.markForCheck();
    });
  }

  openEmailPreview(email: IFixedEmail) {
    this.windowService.open(this.emailMessageTemplate, {
      title: email.subject,
      context: {
        message: email.message,
      },
    });
  }
}
