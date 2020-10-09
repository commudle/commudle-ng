import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
import { EemailTypes } from 'projects/shared-models/enums/email_types.enum';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { EmailerComponent } from 'projects/commudle-admin/src/app/app-shared-components/emailer/emailer.component';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';

@Component({
  selector: 'app-event-form-responses',
  templateUrl: './event-form-responses.component.html',
  styleUrls: ['./event-form-responses.component.scss']
})
export class EventFormResponsesComponent implements OnInit {

  @ViewChild('table') table;
  @ViewChild('confirmStatusChange', { read: TemplateRef }) confirmStatusChange: TemplateRef<HTMLElement>;


  event: IEvent;
  community: ICommunity;
  eventDataFormEntityGroupId;
  eventDataFormEntityGroup: IEventDataFormEntityGroup;
  registrationStatuses: IRegistrationStatus[] = [];
  dataForm: IDataForm;
  questions: IQuestion[] = [];
  bulkStatus;
  windowRef;

  isLoading = true;
  rows = [];
  ColumnMode = ColumnMode;
  SortType = SortType;
  emptyMessage;

  page = 1;
  totalEntries: number;
  count = 25;
  filterValue = '';
  registrationStatusId = 0;


  searchForm = this.fb.group({
    name: ['']
  });


  //TODO past event stats
  constructor(
    private eventDataFormEntityGroupsService: EventDataFormEntityGroupsService,
    private registrationStatusesService: RegistrationStatusesService,
    private dataFormsService: DataFormsService,
    private activatedRoute: ActivatedRoute,
    private dataFormEntityResponseGroupsService: DataFormEntityResponseGroupsService,
    private windowService: NbWindowService,
    private fb: FormBuilder,
    private toastLogService: LibToastLogService,
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

    // this.getResponses();
    this.updateFilter();
  }




  updateFilter() {
    this.searchForm.valueChanges.pipe(
      debounceTime(800),
      switchMap(() => {
        this.page = 1;
        this.emptyMessage = 'Loading...';
        return this.dataFormEntityResponseGroupsService.getEventDataFormResponses(
          this.eventDataFormEntityGroupId,
          this.searchForm.get('name').value.toLowerCase(),
          this.registrationStatusId,
          this.page,
          this.count
          );
      })
    ).subscribe((data) => {
      this.setResponses(data);
    });
  }


  registrationStatusFilter(selectedRegistrationStatusId) {
    this.page = 1;
    this.registrationStatusId = selectedRegistrationStatusId;
    this.getResponses();
  }

  setPage(pageNumber) {
    this.page = pageNumber + 1;
    this.getResponses();
  }

  getResponses() {
    this.emptyMessage = 'Loading...';
    this.isLoading = false;
    this.rows = [];
    this.dataFormEntityResponseGroupsService.getEventDataFormResponses(
      this.eventDataFormEntityGroupId,
      this.filterValue,
      this.registrationStatusId,
      this.page,
      this.count
      ).subscribe(
      (data) => {
        this.totalEntries = data.total;
        this.rows = data.data_form_entity_response_groups;
        this.isLoading = false;
        this.emptyMessage = 'No data to display';
      }
    );
  }

  setResponses(data) {
    this.totalEntries = data.total;
    this.rows = data.data_form_entity_response_groups;
    this.isLoading = false;
    this.emptyMessage = 'No entries found';
  }


  getQuestionResponse(userResponses, questionId) {
    const userQuestionResponses = userResponses.filter(k => k.question_id === questionId);
    let responses = '';
    for (let resp of userQuestionResponses) {
      responses += `${resp.response_text} \n`;
    }

    return (userQuestionResponses.length === 0 ? '..' : responses);
  }


  updateRegistrationStatus(registrationStatus, userResponseId) {
    this.rows.find(k => k.id === userResponseId).registration_status = registrationStatus;
  }


  updateEntryPass(entryPass, userResponseId) {
    this.rows.find(k => k.id === userResponseId).entry_pass = entryPass;
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
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


  sendCSV() {
    this.eventDataFormEntityGroupsService.mailCSV(this.eventDataFormEntityGroupId).subscribe(
      data => {
        if (data) {
          this.toastLogService.successDialog('CSV will be delivered to your email!', 5000);
        }
      }
    );
  }

  bulkStatusChangeConfirmation(registrationStatus) {
    this.windowRef = this.windowService.open(
      this.confirmStatusChange,
      {
        title: `Are you sure?`,
        context: {
          registration_status: registrationStatus
        }
      }
    );
  }


  bulkStatusChange(registrationStatusId) {
    this.eventDataFormEntityGroupsService.changeBulkRegistrationStatus(registrationStatusId, this.eventDataFormEntityGroupId).subscribe(
      data => {
        if (data) {
          this.getResponses();
          this.toastLogService.successDialog('Updated!');
        }
      }
    );
    this.bulkStatus = null;
    this.windowRef.close();
  }

}
