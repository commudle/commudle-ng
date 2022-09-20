import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EMainNewsletterRecipientTypes, IMainNewsletter } from '@commudle/shared-models';
import { MainNewslettersService } from '../../services/main-newsletters.service';
import * as moment from 'moment';
import { LibToastLogService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-main-newsletter-scheduler',
  templateUrl: './main-newsletter-scheduler.component.html',
  styleUrls: ['./main-newsletter-scheduler.component.scss']
})
export class MainNewsletterSchedulerComponent implements OnInit, OnChanges {
  moment = moment;

  EMainNewsletterRecipientTypes = EMainNewsletterRecipientTypes;
  @Input() newsletter: IMainNewsletter;

  @Output() updatedNewsLetter = new EventEmitter();


  form = this.fb.group({
    recipient_type: ['', Validators.required],
    schedule: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private mainNewslettersService: MainNewslettersService,
    private toastService: LibToastLogService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
  }


  setSchedule() {
    const schedule = new Date(this.form.value.schedule)
    this.mainNewslettersService.setSchedule(this.newsletter.id, schedule, this.form.value.recipient_type).subscribe(
      data => {
        if (data) {
          this.newsletter.scheduled_for = schedule;
          this.newsletter.recipient_type = this.form.value.recipient_type
          this.updatedNewsLetter.emit(this.newsletter);
          this.toastService.successDialog('Saved');
        }
      }
    )
  }

  resetSchedule() {
    this.mainNewslettersService.resetSchedule(this.newsletter.id).subscribe(
      data => {
        if (data) {
          this.newsletter.scheduled_for = null;
          this.updatedNewsLetter.emit(this.newsletter);
          this.toastService.successDialog('Reset!');
        }
      }
    )
  }

  confirmReset() {
    return window.confirm('Are you sure you want to reset the schedule?');
  }

}
