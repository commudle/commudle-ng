import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ToastrService } from '@commudle/shared-services';
import { NbDialogService } from '@commudle/theme';
import { NewsletterService } from 'apps/commudle-admin/src/app/services/newsletter.service';
import { INewsletter } from 'apps/shared-models/newsletter.model';
import { Subscription } from 'rxjs';
import { faPlus, faClock, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { FormBuilder, Validators } from '@angular/forms';
import { CommaSeparatedEmailsValidator } from 'apps/shared-helper-modules/custom-validators.validator';

@Component({
  selector: 'commudle-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
})
export class NewsletterComponent implements OnInit {
  @Input() parentId: string | number;
  @Input() parentType: 'CommunityGroup' | 'Kommunity';
  subscriptions: Subscription[] = [];
  newsletters: INewsletter[];
  newScheduleDateTime;
  icons = {
    faPlus,
    faClock,
    faEnvelopeOpenText,
  };
  moment = moment;
  testEmailsForms;
  constructor(
    private newsletterService: NewsletterService,
    private dialogService: NbDialogService,
    private toastrService: ToastrService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.testEmailsForms = this.fb.group({
      emails: ['', [Validators.required, CommaSeparatedEmailsValidator]],
    });
  }

  ngOnInit() {
    this.getNewsletters();
  }

  getNewsletters() {
    this.subscriptions.push(
      this.newsletterService.getIndex(this.parentId, this.parentType).subscribe((data: INewsletter[]) => {
        this.newsletters = data;
      }),
    );
  }

  togglePublished(id, index) {
    this.newsletterService.togglePublished(!this.newsletters[index].published, id).subscribe((data) => {
      this.newsletters[index] = data;
    });
  }

  openConfirmDialogBox(dialog: TemplateRef<any>, id, index) {
    this.dialogService.open(dialog, { context: { id, index } });
  }

  destroy(id, index) {
    this.newsletterService.destroy(id).subscribe((data) => {
      if (data) {
        this.toastrService.successDialog('Deleted Successfully');
        this.newsletters.splice(index, 1);
      }
    });
  }

  redirectTo(slug) {
    let redirectUrl = '';
    if (this.parentType === 'Kommunity') {
      redirectUrl = '/communities/' + this.parentId + '/newsletter/' + slug;
    }
    if (this.parentType === 'CommunityGroup') {
      redirectUrl = '/orgs/' + this.parentId + '/' + slug;
    }
    const url = this.router.serializeUrl(this.router.createUrlTree([redirectUrl]));
    window.open(url, '_blank');
  }

  openScheduleDialogBox(dialog: TemplateRef<any>, id, index) {
    this.newScheduleDateTime = '';
    this.dialogService.open(dialog, { context: { id, index } });
  }

  setSchedule(id, index) {
    this.newsletterService.setSchedule(id, this.newScheduleDateTime).subscribe((data) => {
      if (data) this.newsletters[index].scheduled_for = this.newScheduleDateTime;
    });
  }

  resetSchedule(id, index) {
    this.newsletterService.resetSchedule(id).subscribe((data) => {
      if (data) this.newsletters[index].scheduled_for = null;
    });
  }

  sendTestMail(newsletterId) {
    this.newsletterService
      .sendTestEmail(
        newsletterId,
        this.testEmailsForms.value.emails
          .replaceAll(' ', '')
          .split(',')
          .filter((x) => x),
      )
      .subscribe((data) => {
        if (data) {
          this.toastrService.successDialog('Test Email send successfully');
          this.testEmailsForms.reset();
        }
      });
  }
}
