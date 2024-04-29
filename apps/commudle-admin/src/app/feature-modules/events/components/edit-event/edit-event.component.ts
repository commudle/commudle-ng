import { Component, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { IEvent } from 'apps/shared-models/event.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import * as moment from 'moment';
import * as momentTimezone from 'moment-timezone';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { NbWindowRef } from '@commudle/theme';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss'],
})
export class EditEventComponent implements OnInit {
  @Input() eventId: number;
  @Input() type = 'Save';
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

  eventForm;

  tags: string[] = [];
  minimumTags = 3;

  faChevronLeft = faChevronLeft;
  submitIsInProcess = false;

  tinyMCE = {
    height: 300,
    menubar: false,
    convert_urls: false,
    content_style:
      "@import url('https://fonts.googleapis.com/css?family=Inter'); body {font-family: 'Inter'; font-size: 16px !important;}",
    plugins: [
      'advlist',
      'autolink',
      'link',
      'image',
      'charmap',
      'preview',
      'anchor',
      'lists',
      'searchreplace',
      'visualblocks',
      'code',
      'fullscreen',
      'insertdatetime',
      'media',
      'table',
      'code',
      'help',
      'wordcount',
    ],
    toolbar:
      'undo redo | bullist numlist | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          outdent indent | removeformat | help',
    license_key: 'gpl',
  };

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private toastLogService: LibToastLogService,
    private router: Router,
    @Optional() private windowRef: NbWindowRef,
  ) {
    this.eventForm = this.fb.group({
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
  }

  ngOnInit() {
    if (this.type === 'Save') {
      this.activatedRoute.parent.data.subscribe((data) => {
        this.community = data.community;
        this.event = data.event;
        this.fetchData();
      });
    }

    if (this.eventId) {
      this.eventsService.getEvent(this.eventId).subscribe((data) => {
        this.event = data;
        this.fetchData();
      });
    }

    this.allTimeZones = momentTimezone.tz.names();
    this.userTimeZone = momentTimezone.tz.guess();

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

  fetchData() {
    this.event.tags.forEach((value) => this.tags.push(value.name));
    // event is editable only if it's not canceled or completed)
    this.uneditable = ['completed', 'canceled'].includes(this.event.event_status.name);
    if (this.uneditable) {
      this.eventForm.get('event').disable();
    }

    // @ts-ignore
    this.eventForm.get('event').patchValue({
      name: this.event.name,
      description: this.event.description,
      timezone: this.event.timezone,
    });

    if (this.event.start_time) {
      const sDate = moment.tz(this.event.start_time, this.event.timezone).format('YYYY-MM-DDTHH:mm');
      const eDate = moment.tz(this.event.end_time, this.event.timezone).format('YYYY-MM-DDTHH:mm');
      this.eventForm.get('event').patchValue({
        start_date: sDate,
        end_date: eDate,
      });
    }
  }

  updateEvent() {
    this.submitIsInProcess = true;
    const formValue = this.eventForm.get('event').value;
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

    this.eventsService
      .updateEvent(formValue, this.event.slug, this.community ? this.community : this.event.kommunity_id, this.tags)
      .subscribe((data) => {
        this.toastLogService.successDialog('Updated!');
        this.router.navigate([
          '/admin/communities',
          this.community ? this.community.slug : this.event.kommunity_id,
          'event-dashboard',
          data.slug,
        ]);
      });
  }

  setStartDateTime() {
    this.startDate = this.eventForm.get('event').get('start_date').value;

    const startTimePick = this.eventForm.get('event').get('start_time_pick').value;
    this.startHour = Number.parseInt(startTimePick.split(':')[0]);
    this.startMinute = Number.parseInt(startTimePick.split(':')[1]);

    if (this.startDate !== '' && this.startHour !== '' && this.startMinute !== '' && this.startDate !== null) {
      this.startTime = moment.tz(this.startDate, this.event.timezone).toDate();

      return true;
    }
    this.startTime = null;
    return false;
  }

  setEndDateTime() {
    this.endDate = this.eventForm.get('event').get('end_date').value;
    const endTimePick = this.eventForm.get('event').get('end_time_pick').value;
    this.endHour = Number.parseInt(endTimePick.split(':')[0]);
    this.endMinute = Number.parseInt(endTimePick.split(':')[1]);

    if (this.endDate !== '' && this.endHour !== '' && this.endMinute !== '' && this.endDate !== null) {
      this.endTime = moment.tz(this.endDate, this.event.timezone).toDate();
      return true;
    }
    this.endTime = null;
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

  cloneEvent() {
    this.submitIsInProcess = true;
    const formValue = this.eventForm.get('event').value;
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

    this.eventsService.cloneEvent(formValue, this.event.slug, this.tags).subscribe(
      (data) => {
        this.submitIsInProcess = false;
        window.location.reload();
        this.close();
      },
      (error) => {
        this.submitIsInProcess = false;
        this.close();
      },
    );
  }

  close() {
    this.windowRef.close();
  }
}
