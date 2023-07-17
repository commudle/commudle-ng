import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { IEvent } from 'apps/shared-models/event.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { SeoService } from 'apps/shared-services/seo.service';
import * as moment from 'moment';
import * as momentTimezone from 'moment-timezone';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {
  event: IEvent;
  community: ICommunity;
  allTimeZones;
  userTimeZone;
  hours = [...Array(24).keys()];
  minutes = [...Array(60).keys()];

  minDate = moment().subtract(1, 'days').toDate();

  startDate;
  startHour;
  startMinute;

  endDate;
  endHour;
  endMinute;

  startTime;
  endTime;
  hasDate;

  eventForm;

  tags: string[] = [];
  minimumTags = 3;
  isFormSubmitting = false;

  tinyMCE = {
    height: 300,
    menubar: false,
    convert_urls: false,
    plugins:
      'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount',
    toolbar:
      'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help',
  };

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private toastLogService: LibToastLogService,
    private router: Router,
    private seoService: SeoService,
  ) {
    this.eventForm = this.fb.group({
      event: this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        start_date: [''],
        end_date: [''],
        start_time_pick: [''],
        end_time_pick: [''],
        timezone: [momentTimezone.tz.guess(), Validators.required],
      }),
    });
  }

  ngOnInit() {
    this.allTimeZones = momentTimezone.tz.names();
    this.userTimeZone = momentTimezone.tz.guess();
    this.activatedRoute.data.subscribe((data) => {
      this.community = data.community;
      this.seoService.setTitle(`New Event | ${this.community.name}`);
    });

    const form = this.eventForm.get('event');

    form.get('start_date').valueChanges.subscribe(() => {
      form.get('start_date').clearValidators();
      if (form.get('start_date').value) {
        form.get('start_time_pick').setValidators([Validators.required]);
        form.get('end_time_pick').setValidators([Validators.required]);
        this.hasDate = true;
      } else {
        form.get('start_time_pick').clearValidators();
        form.get('end_time_pick').clearValidators();
        this.hasDate = false;
      }
      form.get('start_time_pick').updateValueAndValidity();
      form.get('end_time_pick').updateValueAndValidity();
    });
  }

  createEvent() {
    this.isFormSubmitting = true;
    const formValue = this.eventForm.get('event').value;
    delete formValue['start_date'];
    delete formValue['end_date'];
    delete formValue['start_time_pick'];
    delete formValue['end_time_pick'];

    if (this.setStartDateTime() && this.setEndDateTime()) {
      if (this.startTime > this.endTime) {
        this.toastLogService.warningDialog('End time has to be greater then start time');
        return;
      } else {
        formValue['start_time'] = this.startTime;
        formValue['end_time'] = this.endTime;
      }
    }

    if (this.tags.length > 0) {
      this.tags.forEach((value) => {
        formValue['tags[]'] = value;
      });
    }

    this.eventsService.createEvent(formValue, this.community).subscribe((data) => {
      this.isFormSubmitting = false;
      this.toastLogService.successDialog('Created!');
      this.router.navigate(['/admin/communities', this.community.slug, 'event-dashboard', data.slug]);
    });
  }

  setStartDateTime() {
    this.startDate = this.eventForm.get('event').get('start_date').value;
    const startTimePick = this.eventForm.get('event').get('start_time_pick').value;
    this.startHour = Number.parseInt(startTimePick.split(':')[0]);
    this.startMinute = Number.parseInt(startTimePick.split(':')[1]);

    if (this.startDate !== '' && this.startHour !== '' && this.startMinute !== '') {
      this.startTime = moment({
        years: this.startDate.getFullYear(),
        months: this.startDate.getMonth(),
        date: this.startDate.getDate(),
        hours: this.startHour,
        minutes: this.startMinute,
      }).toDate();
      return true;
    }
    return false;
  }

  setEndDateTime() {
    this.endDate = this.eventForm.get('event').get('start_date').value;
    const endTimePick = this.eventForm.get('event').get('end_time_pick').value;
    this.endHour = Number.parseInt(endTimePick.split(':')[0]);
    this.endMinute = Number.parseInt(endTimePick.split(':')[1]);
    if (this.endDate !== '' && this.endHour !== '' && this.endMinute !== '') {
      this.endTime = moment({
        years: this.endDate.getFullYear(),
        months: this.endDate.getMonth(),
        date: this.endDate.getDate(),
        hours: this.endHour,
        minutes: this.endMinute,
      }).toDate();
      return true;
    }
    return false;
  }

  onTagAdd(value: string) {
    if (!this.tags.includes(value)) {
      const finalValue = value.trim();
      this.tags.push(finalValue);
    }
  }

  onTagDelete(value: string) {
    this.tags = this.tags.filter((tag) => tag !== value);
  }
}
