import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { CommaSeparatedEmailsValidator } from 'projects/shared-helper-modules/custom-validators.validator';
import { IMainNewsletter } from 'projects/shared-models/main-newsletter.model';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { MainNewslettersService } from '../../services/main-newsletters.service';

@Component({
  selector: 'app-main-newsletter-test-emailer',
  templateUrl: './main-newsletter-test-emailer.component.html',
  styleUrls: ['./main-newsletter-test-emailer.component.scss']
})
export class MainNewsletterTestEmailerComponent implements OnInit {

  @Input() newsletter: IMainNewsletter;

  form = this.fb.group({
    emails: ['', [Validators.required, CommaSeparatedEmailsValidator]]
  });

  constructor(
    private fb: FormBuilder,
    private mainNewsletterService: MainNewslettersService,
    private toastLogService: LibToastLogService,
    protected dialogRef: NbDialogRef<any>
  ) { }

  ngOnInit(): void {
  }

  sendEmail() {
    if (this.form.valid) {
      this.mainNewsletterService.sendTestEmail(
        this.newsletter.id, this.form.value.emails.replaceAll(' ', '').split(',').filter(x => x)
        ).subscribe(
        data => {
          this.dialogRef.close();
          this.toastLogService.successDialog('Emails Sent');
        }
      )

    }
  }

}
