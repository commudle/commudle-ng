import { DomSanitizer } from '@angular/platform-browser';
import { NbWindowService } from '@nebular/theme';
import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { StatsCommunitiesService } from 'apps/commudle-admin/src/app/services/stats/stats-communities.service';
import { IFixedEmail } from '@commudle/shared-models';
import * as moment from 'moment';

@Component({
  selector: 'commudle-community-emails-list',
  templateUrl: './community-emails-list.component.html',
  styleUrls: ['./community-emails-list.component.scss']
})
export class CommunityEmailsListComponent implements OnInit {
  @ViewChild('emailMessageTemplate') emailMessageTemplate: TemplateRef<any>;
  @Input() communityId;
  moment = moment;
  emails: IFixedEmail[] = [];
  constructor(
    private statsCommunitiesService: StatsCommunitiesService,
    private windowService: NbWindowService,
  ) { }

  ngOnInit() {
    this.getEmails();
  }

  getEmails() {
    this.emails = [];
    this.statsCommunitiesService.emails(this.communityId).subscribe(
      data => {
        this.emails = data.fixed_emails;
      }
    );
  }

  openEmailPreview(email: IFixedEmail) {
    this.windowService.open(
      this.emailMessageTemplate,
      {
        title: email.subject,
        context: {
          message: email.message
        }
      }
    );
  }

}
