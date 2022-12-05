import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NbDialogRef } from '@commudle/theme';
import { CommaSeparatedEmailsValidator } from 'apps/shared-helper-modules/custom-validators.validator';
import { IMainNewsletter } from 'apps/shared-models/main-newsletter.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { MainNewslettersService } from '../../services/main-newsletters.service';

@Component({
  selector: 'app-main-newsletter-test-emailer',
  templateUrl: './main-newsletter-test-emailer.component.html',
  styleUrls: ['./main-newsletter-test-emailer.component.scss'],
})
export class MainNewsletterTestEmailerComponent implements OnInit {
  @Input() newsletter: IMainNewsletter;

  form;

  constructor(
    private fb: FormBuilder,
    private mainNewsletterService: MainNewslettersService,
    private toastLogService: LibToastLogService,
    protected dialogRef: NbDialogRef<any>,
  ) {
    this.form = this.fb.group({
      emails: ['', [Validators.required, CommaSeparatedEmailsValidator]],
    });
  }

  ngOnInit(): void {}

  sendEmail() {
    if (this.form.valid) {
      this.mainNewsletterService
        .sendTestEmail(
          this.newsletter.id,
          this.form.value.emails
            .replaceAll(' ', '')
            .split(',')
            .filter((x) => x),
        )
        .subscribe(() => {
          this.dialogRef.close();
          this.toastLogService.successDialog('Emails Sent');
        });
    }
  }
}
