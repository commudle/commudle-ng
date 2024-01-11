import { Component, OnInit } from '@angular/core';
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
export class HackathonControlPanelDatesFormComponent implements OnInit {
  hackathonDatesForm: FormGroup;
  hackathonSlug = '';

  subscriptions: Subscription[] = [];
  hackathon: IHackathon;

  allTimeZones;
  userTimeZone;

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

  fetchHackathonDetails(hackathonId) {
    this.subscriptions.push(
      this.hackathonService.showHackathon(hackathonId).subscribe((data) => {
        this.hackathon = data;
        if (!this.hackathon.time_zone) {
          this.hackathonDatesForm.patchValue({
            time_zone: momentTimezone.tz.guess(),
          });
        } else {
          this.hackathonDatesForm.patchValue({
            start_date: this.datePipe.transform(this.hackathon.start_date, 'yyyy-MM-ddTHH:mm:ss'),
            end_date: this.datePipe.transform(this.hackathon.end_date, 'yyyy-MM-ddTHH:mm:ss'),
            application_start_date: this.datePipe.transform(
              this.hackathon.application_start_date,
              'yyyy-MM-ddTHH:mm:ss',
            ),
            application_end_date: this.datePipe.transform(this.hackathon.application_end_date, 'yyyy-MM-ddTHH:mm:ss'),
            time_zone: this.hackathon.time_zone,
          });
        }
      }),
    );
  }

  createOrUpdate() {
    this.hackathonService.updateHackathonDates(this.hackathonDatesForm.value, this.hackathon.id).subscribe((data) => {
      if (data) {
        this.toastrService.successDialog('Hackathon dates was updated');
      }
    });
  }
}
