import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ColumnMode, SortType } from '@commudle/ngx-datatable';
import { NbWindowService } from '@commudle/theme';
import { EmailerComponent } from 'apps/commudle-admin/src/app/app-shared-components/emailer/emailer.component';
import { AppUsersService } from 'apps/commudle-admin/src/app/services/app-users.service';
import { DataFormEntityResponseGroupsService } from 'apps/commudle-admin/src/app/services/data-form-entity-response-groups.service';
import { DataFormsService } from 'apps/commudle-admin/src/app/services/data_forms.service';
import { EventDataFormEntityGroupsService } from 'apps/commudle-admin/src/app/services/event-data-form-entity-groups.service';
import { RegistrationStatusesService } from 'apps/commudle-admin/src/app/services/registration-statuses.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { IDataForm } from 'apps/shared-models/data_form.model';
import { EemailTypes } from 'apps/shared-models/enums/email_types.enum';
import { EUserRoles } from 'apps/shared-models/enums/user_roles.enum';
import { IEvent } from 'apps/shared-models/event.model';
import { IEventDataFormEntityGroup } from 'apps/shared-models/event_data_form_enity_group.model';
import { IQuestion } from 'apps/shared-models/question.model';
import { IRegistrationStatus } from 'apps/shared-models/registration_status.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-event-form-responses',
  templateUrl: './event-form-responses.component.html',
  styleUrls: ['./event-form-responses.component.scss'],
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
  bulkStatusChangeForCanceled = false;
  windowRef;

  isLoading = true;
  rows = [];
  ColumnMode = ColumnMode;
  SortType = SortType;
  emptyMessage;

  page = 1;
  totalEntries: number;
  count = 10;
  filterValue = '';
  registrationStatusId = 0;

  searchForm;

  showFullAnswer = false;

  userRoles = [];
  EUserRoles = EUserRoles;
  fromRegistrationStatus: string;
  toRegistrationStatus: string;
  selectedRegistrationStatus = 0;

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
    private appUsersService: AppUsersService,
  ) {
    this.searchForm = this.fb.group({
      name: [''],
    });
  }

  ngOnInit() {
    this.activatedRoute.parent.data.subscribe((data) => {
      this.event = data.event;
      this.community = data.community;
      this.getUserRoles();
    });

    this.eventDataFormEntityGroupId = this.activatedRoute.snapshot.queryParamMap['params']['parent_id'];

    // get event_data_form_entity_group
    this.eventDataFormEntityGroupsService
      .getEventDataFormEntityGroup(this.eventDataFormEntityGroupId)
      .subscribe((data) => {
        this.eventDataFormEntityGroup = data;
      });

    // get all registration statuses
    this.registrationStatusesService.getRegistrationStatuses().subscribe((data) => {
      this.registrationStatuses = data.registration_statuses;
    });

    // get the dataform associated
    this.dataFormsService
      .getDataFormDetails(this.activatedRoute.snapshot.queryParamMap['params']['data_form_id'])
      .subscribe((data) => {
        this.dataForm = data;
        this.questions = this.dataForm.questions;
      });

    // this.getResponses();
    this.updateFilter();
  }

  getUserRoles() {
    this.appUsersService.getMyRoles('Kommunity', this.community.id).subscribe((res) => {
      this.userRoles = res;
    });
  }

  updateFilter() {
    this.searchForm.valueChanges
      .pipe(
        debounceTime(800),
        switchMap(() => {
          this.rows = [];
          this.page = 1;
          this.emptyMessage = 'Loading...';
          return this.dataFormEntityResponseGroupsService.getEventDataFormResponses(
            this.eventDataFormEntityGroupId,
            this.searchForm.get('name').value.toLowerCase(),
            this.registrationStatusId,
            this.page,
            this.count,
          );
        }),
      )
      .subscribe((data) => {
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
    if (this.searchForm.get('name').value) {
      this.dataFormEntityResponseGroupsService
        .getEventDataFormResponses(
          this.eventDataFormEntityGroupId,
          this.searchForm.get('name').value.toLowerCase(),
          this.registrationStatusId,
          this.page,
          this.count,
        )
        .subscribe((data) => {
          this.setResponses(data);
        });
    } else {
      this.getResponses();
    }
  }

  getResponses() {
    this.emptyMessage = 'Loading...';
    this.isLoading = false;
    this.rows = [];
    this.dataFormEntityResponseGroupsService
      .getEventDataFormResponses(
        this.eventDataFormEntityGroupId,
        this.filterValue,
        this.registrationStatusId,
        this.page,
        this.count,
      )
      .subscribe((data) => {
        this.totalEntries = data.total;
        this.rows = data.data_form_entity_response_groups;
        this.isLoading = false;
        this.emptyMessage = 'No data to display';
      });
  }

  setResponses(data) {
    this.totalEntries = data.total;
    this.rows = data.data_form_entity_response_groups;
    this.isLoading = false;
    this.emptyMessage = 'No entries found';
  }

  getQuestionResponse(userResponses, questionId) {
    const userQuestionResponses = userResponses.filter((k) => k.question_id === questionId);
    let responses = '';
    for (const resp of userQuestionResponses) {
      responses += `${resp.response_text} \n`;
    }

    return userQuestionResponses.length === 0 ? '..' : responses;
  }

  updateRegistrationStatus(registrationStatus, userResponseId) {
    this.rows.find((k) => k.id === userResponseId).registration_status = registrationStatus;
  }

  updateEntryPass(entryPass, userResponseId) {
    this.rows.find((k) => k.id === userResponseId).entry_pass = entryPass;
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {}

  openRSVPEmailWindow() {
    this.windowService.open(EmailerComponent, {
      title: `Send RSVP To All Shortlisted`,
      context: {
        community: this.community,
        event: this.event,
        eventDataFormEntityGroupId: this.eventDataFormEntityGroup.id,
        mailType: EemailTypes.RSVP,
      },
    });
  }

  openEntryPassEmailWindow() {
    this.windowService.open(EmailerComponent, {
      title: `Send Entry Pass All Confirmed`,
      context: {
        community: this.community,
        event: this.event,
        eventDataFormEntityGroupId: this.eventDataFormEntityGroup.id,
        mailType: EemailTypes.ENTRY_PASS,
      },
    });
  }

  sendCSV() {
    this.eventDataFormEntityGroupsService.mailCSV(this.eventDataFormEntityGroupId).subscribe((data) => {
      if (data) {
        this.toastLogService.successDialog('CSV will be delivered to your email!', 5000);
      }
    });
  }

  bulkStatusChangeConfirmation() {
    this.windowRef = this.windowService.open(this.confirmStatusChange, {
      title: `Change Bulk Status?`,
    });
    this.windowRef.onClose.subscribe(() => {
      this.bulkStatus = null;
      this.bulkStatusChangeForCanceled = false;
    });
  }

  bulkStatusChange() {
    this.eventDataFormEntityGroupsService
      .changeBulkRegistrationStatus(
        this.fromRegistrationStatus,
        this.toRegistrationStatus,
        this.eventDataFormEntityGroupId,
        this.bulkStatusChangeForCanceled,
      )
      .subscribe((data) => {
        if (data) {
          this.getResponses();
          this.toastLogService.successDialog('Updated!');
        }
      });
    this.bulkStatus = null;
    this.windowRef.close();
  }

  changeFromRegistrationStatus(event) {
    this.selectedRegistrationStatus = 0;
    this.fromRegistrationStatus = event.target.value;
    for (const response of this.rows) {
      if (response.registration_status.name === this.fromRegistrationStatus) {
        this.selectedRegistrationStatus++;
      }
    }
  }

  changeToRegistrationStatus(event) {
    this.toRegistrationStatus = event.target.value;
  }
}
