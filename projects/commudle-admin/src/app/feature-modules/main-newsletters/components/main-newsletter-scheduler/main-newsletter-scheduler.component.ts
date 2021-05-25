import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IMainNewsletter } from 'projects/shared-models/main-newsletter.model';
import { MainNewslettersService } from '../../services/main-newsletters.service';
import * as moment from 'moment';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';

@Component({
  selector: 'app-main-newsletter-scheduler',
  templateUrl: './main-newsletter-scheduler.component.html',
  styleUrls: ['./main-newsletter-scheduler.component.scss']
})
export class MainNewsletterSchedulerComponent implements OnInit, OnChanges {
  moment = moment;
  @Input() newsletter: IMainNewsletter;

  @Output() updatedNewsLetter = new EventEmitter();


  form = this.fb.group({
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
    this.mainNewslettersService.setSchedule(this.newsletter.id, schedule).subscribe(
      data => {
        if (data) {
          this.newsletter.scheduled_for = schedule;
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
