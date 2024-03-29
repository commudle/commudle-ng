import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IHackathon } from 'apps/shared-models/hackathon.model';
import { Subscription } from 'rxjs';
import * as momentTimezone from 'moment-timezone';
import { ActivatedRoute } from '@angular/router';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-hackathon-control-panel-dates-form',
  templateUrl: './hackathon-control-panel-dates-form.component.html',
  styleUrls: ['./hackathon-control-panel-dates-form.component.scss'],
})
export class HackathonControlPanelDatesFormComponent implements OnInit, OnDestroy {
  hackathonDatesForm: FormGroup;
  hackathonSlug = '';

  subscriptions: Subscription[] = [];
  hackathon: IHackathon;

  allTimeZones;
  userTimeZone;
  invalidFormFields = false;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private hackathonService: HackathonService,
    private datePipe: DatePipe,
    private toastrService: ToastrService,
  ) {
    this.hackathonDatesForm = this.fb.group({
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      application_start_date: ['', Validators.required],
      application_end_date: ['', Validators.required],
      time_zone: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.allTimeZones = momentTimezone.tz.names();
    this.activatedRoute.parent.paramMap.subscribe((params) => {
      this.fetchHackathonDetails(params.get('hackathon_id'));
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  fetchHackathonDetails(hackathonId) {
    this.subscriptions.push(
      this.hackathonService.showHackathon(hackathonId).subscribe((data) => {
        this.hackathon = data;
        if (!this.hackathon.time_zone) {
          this.hackathonDatesForm.patchValue({
            time_zone: momentTimezone.tz.guess(),
          });
        } else {
          this.patchDatesValue(data);
        }
      }),
    );
  }

  createOrUpdate() {
    const formData = new FormData();
    Object.keys(this.hackathonDatesForm.value).forEach((key) => {
      key === 'time_zone'
        ? formData.append('hackathon[' + key + ']', this.hackathonDatesForm.value[key])
        : formData.append('hackathon[' + key + ']', this.convertDateToLocal(this.hackathonDatesForm.value[key]));
    });
    this.hackathonService.updateHackathonDates(formData, this.hackathon.id).subscribe((data) => {
      if (data) {
        this.toastrService.successDialog('Hackathon dates was updated');
      }
    });
  }

  patchDatesValue(hackathon) {
    this.hackathonDatesForm.patchValue({
      start_date: this.datePipe.transform(hackathon.start_date, 'yyyy-MM-ddTHH:mm:ss'),
      end_date: this.datePipe.transform(hackathon.end_date, 'yyyy-MM-ddTHH:mm:ss'),
      application_start_date: this.datePipe.transform(hackathon.application_start_date, 'yyyy-MM-ddTHH:mm:ss'),
      application_end_date: this.datePipe.transform(hackathon.application_end_date, 'yyyy-MM-ddTHH:mm:ss'),
      time_zone: hackathon.time_zone,
    });
  }

  convertDateToLocal(submissionDeadlineLocal) {
    return new Date(submissionDeadlineLocal).toISOString();
  }

  validateApplicationClosedDates() {
    const applicationStartDate = new Date(this.hackathonDatesForm.controls['application_start_date'].value);
    const applicationCloseDate = new Date(this.hackathonDatesForm.controls['application_end_date'].value);
    if (applicationStartDate >= applicationCloseDate) {
      this.invalidFormFields = true;
      this.toastrService.warningDialog(
        'Invalid: Application close Date and Time must greater than Application start Date and Time',
      );
    } else {
      this.invalidFormFields = false;
    }
  }

  validateEndsDates() {
    const startDateTime = new Date(this.hackathonDatesForm.controls['start_date'].value);
    const endDateTime = new Date(this.hackathonDatesForm.controls['end_date'].value);
    if (startDateTime >= endDateTime) {
      this.invalidFormFields = true;
      this.toastrService.warningDialog('Invalid: End Date and Time must greater than Start Date and Time');
    } else {
      this.invalidFormFields = false;
    }
  }
}
