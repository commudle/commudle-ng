import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import * as momentTimezone from 'moment-timezone';
import { EventsService } from 'projects/commudle-admin/src/app/services/events.service';
import { ICommunity } from 'projects/shared-models/community.model';
import { IEvent } from 'projects/shared-models/event.model';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { SeoService } from 'projects/shared-services/seo.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss'],
})
export class EditEventComponent implements OnInit {
  event: IEvent;
  community: ICommunity;
  allTimeZones;
  userTimeZone;
  hours = [...Array(24).keys()];
  minutes = [...Array(60).keys()];
  // initialDate
  eventStartTimePicker;
  eventEndTimePicker;

  minDate = moment().subtract(1, 'days').toDate();

  startDate;
  startHour;
  startMinute;

  endDate;
  endHour;
  endMinute;

  startTime;
  endTime;

  uneditable = false;
  hasDate = false;

  eventForm = this.fb.group({
    event: this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      start_date: [''],
      end_date: [''],
      start_time_pick: [''],
      end_time_pick: [''],
      timezone: ['', Validators.required],
    }),
  });

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private toastLogService: LibToastLogService,
    private router: Router,
    private seoService: SeoService,
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.community = data.community;
      this.event = data.event;
      this.seoService.setTitle(`Edit ${this.event.name} | ${this.community.name}`);

      // event is editable only if it's not canceled or completed)
      this.uneditable = ['completed', 'canceled'].includes(this.event.event_status.name);

      this.eventForm.get('event').patchValue({
        name: this.event.name,
        description: this.event.description,
        timezone: this.event.timezone,
      });

      if (this.event.start_time) {
        let sDate = moment(this.event.start_time).toDate();
        let eDate = moment(this.event.end_time).toDate();
        let stime = sDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        let etime = eDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        this.eventForm.get('event').patchValue({
          start_date: sDate,
          end_date: eDate,
          start_time_pick: stime, //patching start and end time saved to the form
          end_time_pick: etime,
        });
      }
    });

    this.allTimeZones = momentTimezone.tz.names();
    this.userTimeZone = momentTimezone.tz.guess();

    let form = this.eventForm.get('event');

    form.get('start_date').valueChanges.subscribe((data) => {
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

  updateEvent() {
    let formValue = this.eventForm.get('event').value;
    delete formValue['start_date'];
    delete formValue['end_date'];
    formValue['start_time'] = '';
    formValue['end_time'] = '';

    if (this.setStartDateTime() && this.setEndDateTime()) {
      if (this.startTime > this.endTime) {
        this.toastLogService.warningDialog('End time has to be greater then start time');
        return;
      } else {
        formValue['start_time'] = this.startTime;
        formValue['end_time'] = this.endTime;
      }
    }
    this.eventsService.updateEvent(formValue, this.event.slug, this.community).subscribe((data) => {
      this.toastLogService.successDialog('Updated!');
      this.router.navigate(['/admin/communities', this.community.slug, 'event-dashboard', data.slug]);
    });
  }

  setStartDateTime() {
    this.startDate = this.eventForm.get('event').get('start_date').value;

    let startTimePick = this.eventForm.get('event').get('start_time_pick').value;
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
    this.startTime = null;
    return false;
  }

  setEndDateTime() {
    this.endDate = this.eventForm.get('event').get('start_date').value;
    let endTimePick = this.eventForm.get('event').get('end_time_pick').value;
    this.endHour = Number.parseInt(endTimePick.split(':')[0]);
    this.endMinute = Number.parseInt(endTimePick.split(':')[1]);

    if (this.endDate !== '' && this.endHour !== '' && this.endMinute !== '') {
      this.endTime = moment({
        years: this.startDate.getFullYear(), //startDate because we still don't have multiple day tracks!
        months: this.startDate.getMonth(), //so we gonna set the end and start date same, for now
        date: this.startDate.getDate(),
        hours: this.endHour,
        minutes: this.endMinute,
      }).toDate();
      return true;
    }
    this.endTime = null;
    return false;
  }
}
