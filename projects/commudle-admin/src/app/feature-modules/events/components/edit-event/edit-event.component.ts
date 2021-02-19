import { Component, OnInit } from '@angular/core';
import { IEvent } from 'projects/shared-models/event.model';
import { ICommunity } from 'projects/shared-models/community.model';
import * as moment from 'moment';
import * as momentTimezone from 'moment-timezone';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from 'projects/commudle-admin/src/app/services/events.service';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
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

  eventForm = this.fb.group({
    event: this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      start_date: [''],
      end_date: [''],
      start_time_pick:[''],
      end_time_pick:[''],
      timezone: ['', Validators.required]
    })
  });

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private toastLogService: LibToastLogService,
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.community = data.community;
      this.event = data.event;
      this.titleService.setTitle(`Edit ${this.event.name} | ${this.community.name}`);

      // event is editable only if it's not canceled or completed)
      this.uneditable = ['completed', 'canceled'].includes(this.event.event_status.name);

      this.eventForm.get('event').patchValue({
        name: this.event.name,
        description: this.event.description,
        timezone: this.event.timezone
      });

      let eventInstance = this.eventForm.get('event').value;
      // console.log(this.eventForm.get('event').value);

      if (this.event.start_time){
        let sTime = moment(this.event.start_time).toDate();
        let eTime = moment(this.event.end_time).toDate();

        this.eventForm.get('event').patchValue({
          start_date: sTime,
          end_date: eTime,
          start_time_pick: sTime, //patching start and end time saved to the form 
          end_time_pick: eTime
        });
      }
      // console.log(this.eventForm.get('event').value);
      // console.log(new Date());

    });



    this.allTimeZones = momentTimezone.tz.names();
    this.userTimeZone =  momentTimezone.tz.guess();
  }


  updateEvent() {

    let formValue = this.eventForm.get('event').value;
    delete formValue['start_date'];
    delete formValue['end_date'];
    formValue['start_time'] = '';
    formValue['end_time'] = '';

    if (this.setStartDateTime() && this.setEndDateTime()) {
      if (this.startTime > this.endTime) {
        // console.log(this.startTime, " ", this.endDate);
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
    // this.startHour = this.eventForm.get('event').get('start_hour').value;
    // this.startMinute = this.eventForm.get('event').get('start_minute').value;

    let startTimePick = this.eventForm.get('event').get('start_time_pick').value;
    // console.log(startTimePick, typeof(startTimePick));
    this.startHour = startTimePick.getHours();
    this.startMinute = startTimePick.getMinutes();

    // if(startTimePick=="")
    // {
    //   this.startHour = this.eventStartTimePicker.value.getHours();
    //   this.startMinute = this.eventStartTimePicker.value.getMinutes();
    // }

    // if(startTimePick!="")
    // {
    //   this.startHour = startTimePick.getHours();
    //   this.startMinute = startTimePick.getMinutes();
    // }



    if (
      this.startDate !== ""
      && this.startHour !== ""
      && this.startMinute !== ""
      ) {

        this.startTime = moment({
          years: this.startDate.getFullYear(),
          months: this.startDate.getMonth(),
          date: this.startDate.getDate(),
          hours: this.startHour,
          minutes: this.startMinute
        }).toDate();

        return true;
    }
    this.startTime = null;
    return false;

  }

  setEndDateTime() {

    this.endDate = this.eventForm.get('event').get('end_date').value;
    let endTimePick = this.eventForm.get('event').get('end_time_pick').value;
    // console.log(endTimePick, typeof(endTimePick));
    this.endHour = endTimePick.getHours();
    this.endMinute = endTimePick.getMinutes();



    if (
      this.endDate !== ""
      && this.endHour !== ""
      && this.endMinute !== ""
    ) {
        this.endTime = moment({
          years: this.startDate.getFullYear(), //startDate because we still don't have multiple day tracks!
          months: this.startDate.getMonth(), //so we gonna set the end and start date same, for now
          date: this.startDate.getDate(),
          hours: this.endHour,
          minutes: this.endMinute
        }).toDate();
        return true;
    }
    this.endTime = null;
    return false;

  }
}



