import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IRegistrationStatus } from 'projects/shared-models/registration_status.model';
import { IDataForm } from 'projects/shared-models/data_form.model';
import { RegistrationStatusesService } from 'projects/commudle-admin/src/app/services/registration-statuses.service';
import { DataFormsService } from 'projects/commudle-admin/src/app/services/data_forms.service';
import { ActivatedRoute } from '@angular/router';
import { DataFormEntityResponseGroupsService } from 'projects/commudle-admin/src/app/services/data-form-entity-response-groups.service';
import { ICommunity } from 'projects/shared-models/community.model';
import { IEvent } from 'projects/shared-models/event.model';
import { ColumnMode, SortType, DatatableComponent } from '@swimlane/ngx-datatable';
import { IQuestion } from 'projects/shared-models/question.model';
import { EventDataFormEntityGroupsService } from 'projects/commudle-admin/src/app/services/event-data-form-entity-groups.service';
import { IEventDataFormEntityGroup } from 'projects/shared-models/event_data_form_enity_group.model';
import { NbWindowService } from '@nebular/theme';
import { EmailerComponent } from 'projects/commudle-admin/src/app/components/emailer/emailer.component';
import { EemailTypes } from 'projects/shared-models/enums/email_types.enum';

@Component({
  selector: 'app-event-form-responses',
  templateUrl: './event-form-responses.component.html',
  styleUrls: ['./event-form-responses.component.scss']
})
export class EventFormResponsesComponent implements OnInit {

  @ViewChild('table') table;

  event: IEvent;
  community: ICommunity;
  eventDataFormEntityGroupId;
  eventDataFormEntityGroup: IEventDataFormEntityGroup;
  registrationStatuses: IRegistrationStatus[] = [];
  dataForm: IDataForm;
  questions: IQuestion[] = [];

  isLoading = true;
  rows = [];
  temp = [];
  ColumnMode = ColumnMode;
  SortType = SortType;


  //TODO past event stats

  constructor(
    private eventDataFormEntityGroupsService: EventDataFormEntityGroupsService,
    private registrationStatusesService: RegistrationStatusesService,
    private dataFormsService: DataFormsService,
    private activatedRoute: ActivatedRoute,
    private dataFormEntityResponseGroupsService: DataFormEntityResponseGroupsService,
    private windowService: NbWindowService
  ) { }

  ngOnInit() {

    this.activatedRoute.data.subscribe((data) => {
      this.event = data.event;
      this.community = data.community;
    });

    this.eventDataFormEntityGroupId = this.activatedRoute.snapshot.queryParamMap['params']['parent_id'];

    // get event_data_form_entity_group
    this.eventDataFormEntityGroupsService.getEventDataFormEntityGroup(this.eventDataFormEntityGroupId).subscribe(
      (data) => {
        this.eventDataFormEntityGroup = data;
      }
    );


    // get all registration statuses
    this.registrationStatusesService.getRegistrationStatuses().subscribe((data) => {
      this.registrationStatuses = data.registration_statuses;
    });

    // get the dataform associated
    this.dataFormsService.getDataFormDetails(this.activatedRoute.snapshot.queryParamMap['params']['data_form_id']).subscribe((data) => {
      this.dataForm = data;
      this.questions = this.dataForm.questions;
    });

    this.getResponses(1, 50);
  }


  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      if (d.user.name) {
        return d.user.name.toLowerCase().indexOf(val) !== -1 || !val;
      }
    });
    // update the rows
    this.rows = [...temp];
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  registrationStatusFilter(registrationStatusId) {
    if (registrationStatusId === 0) {
      this.rows = [...this.temp];
    } else {
      const temp = this.temp.filter(data => data.registration_status.id === registrationStatusId);
      this.rows = [];
      this.rows = [...temp];
    }
    this.table.offset = 0;

  }

  getResponses(page, count) {
    this.dataFormEntityResponseGroupsService.getEventDataFormResponses(this.eventDataFormEntityGroupId, page, count).subscribe(
      (data) => {
        this.temp = this.temp.concat(data.data_form_entity_response_groups);
        this.rows = this.rows.concat(data.data_form_entity_response_groups);
        if (data.data_form_entity_response_groups.length === count) {
          this.getResponses(page + 1, count);
        } else {
          this.isLoading = false;
        }
      }
    );
  }


  getQuestionResponse(userResponses, questionId) {
    const userQuestionResponse = userResponses.find(k => k.question_id === questionId);
    return (userQuestionResponse == null ? '..' : userQuestionResponse.response_text);
  }


  // nameComparator(rowA, rowB) {
  //   console.log('**', rowA.user.name, rowB.user.name);

  //   const propA = rowA.user.name;
  //   const propB = rowB.user.name;
  //   // Just a simple sort function comparisoins
  //   if (propA.toLowerCase() < propB.toLowerCase()) {
  //     return -1;
  //   }
  //   if (propA.toLowerCase() > propB.toLowerCase()) {
  //     return 1;
  //   }
  // }

  // questionComparator(rowA, rowB) {
  //   console.log(rowA, rowB);
  // }


  updateRegistrationStatus(registrationStatus, userResponseId) {
    this.rows.find(k => k.id === userResponseId).registration_status = registrationStatus;
  }


  updateEntryPass(entryPass, userResponseId) {
    this.rows.find(k => k.id === userResponseId).entry_pass = entryPass;
  }

  toggleExpandRow(row) {
    // console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    // console.log('Detail Toggled', event);
  }


  openRSVPEmailWindow() {
    this.windowService.open(
      EmailerComponent,
      {
        title: `Send RSVP To All Shortlisted`,
        context: {
          community: this.community,
          event: this.event,
          eventDataFormEntityGroupId: this.eventDataFormEntityGroup.id,
          mailType: EemailTypes.RSVP,
        }
      }
    );
  }


  openEntryPassEmailWindow() {
    this.windowService.open(
      EmailerComponent,
      {
        title: `Send Entry Pass All Confirmed`,
        context: {
          community: this.community,
          event: this.event,
          eventDataFormEntityGroupId: this.eventDataFormEntityGroup.id,
          mailType: EemailTypes.ENTRY_PASS,
        }
      }
    );

  }

}
