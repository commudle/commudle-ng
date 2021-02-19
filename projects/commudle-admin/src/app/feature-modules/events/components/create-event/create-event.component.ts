import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IEvent } from 'projects/shared-models/event.model';
import { ICommunity } from 'projects/shared-models/community.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from 'projects/commudle-admin/src/app/services/events.service';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import * as momentTimezone from 'moment-timezone';
import * as moment from 'moment';
import { Title } from '@angular/platform-browser';
import { values } from 'lodash';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
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

  eventForm = this.fb.group({
    event: this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      start_date: [''],
      end_date: [''],
      start_time_pick:[''],
      end_time_pick:[''],
      timezone: [momentTimezone.tz.guess(), Validators.required]
    })
  });


  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private toastLogService: LibToastLogService,
    private router: Router,
    private titleService: Title
    ) {
    }

  ngOnInit() {
    var d = new Date();
    this.allTimeZones = momentTimezone.tz.names();
    this.userTimeZone =  momentTimezone.tz.guess();
    this.activatedRoute.data.subscribe((data) => {
      this.community = data.community;
      this.titleService.setTitle(`New Event | ${this.community.name}`);
    });
  }


  createEvent() {


    let formValue = this.eventForm.get('event').value;
    delete formValue['start_date'];
    delete formValue['end_date'];
    delete formValue['start_time_pick'];
    delete formValue['end_time_pick'];

    if (this.setStartDateTime() && this.setEndDateTime()) {
      if (this.startTime > this.endTime) {
        this.toastLogService.warningDialog('End time has to be greater then start time');
        return
      }else{
        formValue['start_time'] = this.startTime;
        formValue['end_time'] = this.endTime;
      }

    }
    this.eventsService.createEvent(formValue, this.community).subscribe((data) => {
      this.toastLogService.successDialog('Created!');
      this.router.navigate(['/admin/communities', this.community.slug, 'event-dashboard', data.slug]);
    });
  }




  setStartDateTime() {
    this.startDate = this.eventForm.get('event').get('start_date').value;
    let startTimePick = this.eventForm.get('event').get('start_time_pick').value;

    if (
      this.startDate !== ""
      && this.startHour !== ""
      && this.startMinute !== ""
      ) {

        this.startTime = moment({
          years: this.startDate.getFullYear(),
          months: this.startDate.getMonth(),
          date: this.startDate.getDate(),
          hours: startTimePick.getHours(),
          minutes: startTimePick.getMinutes()
        }).toDate();
        return true;
    }
    return false;

  }

  setEndDateTime() {

    this.endDate = this.eventForm.get('event').get('start_date').value;
    let endTimePick = this.eventForm.get('event').get('end_time_pick').value;
    if (
      this.endDate !== ""
      && this.endHour !== ""
      && this.endMinute !== ""
    ) {
        this.endTime = moment({
          years: this.endDate.getFullYear(),
          months: this.endDate.getMonth(),
          date: this.endDate.getDate(),
          hours: endTimePick.getHours(),
          minutes: endTimePick.getMinutes()
        }).toDate();
        (this.endTime);
        return true;
    }
    return false;

  }

}
