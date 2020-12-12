import { EventSimpleRegistrationsService } from 'projects/commudle-admin/src/app/services/event-simple-registrations.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IEvent } from 'projects/shared-models/event.model';
import { ICommunity } from 'projects/shared-models/community.model';
import { ActivatedRoute } from '@angular/router';
import { RegistrationStatusesService } from '../../../../services/registration-statuses.service';
import { IRegistrationStatus } from 'projects/shared-models/registration_status.model';
import { FormBuilder } from '@angular/forms';
import { ColumnMode, SortType } from '@swimlane/ngx-datatable';
import { switchMap, debounceTime } from 'rxjs/operators';
import { UserEventRegistrationsService } from '../../../../services/user-event-registrations.service';
import { EemailTypes } from 'projects/shared-models/enums/email_types.enum';
import { NbWindowService } from '@nebular/theme';
import { EmailerComponent } from 'projects/commudle-admin/src/app/app-shared-components/emailer/emailer.component';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';

@Component({
  selector: 'app-user-event-registrations',
  templateUrl: './user-event-registrations.component.html',
  styleUrls: ['./user-event-registrations.component.scss']
})
export class UserEventRegistrationsComponent implements OnInit {
  @ViewChild('confirmStatusChange', { read: TemplateRef }) confirmStatusChange: TemplateRef<HTMLElement>;

  event: IEvent;
  community: ICommunity;
  registrationStatuses: IRegistrationStatus[];
  windowRef;
  bulkStatus;
  bulkStatusChangeForCanceled = false;

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

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private registrationStatusesService: RegistrationStatusesService,
    private userEventRegistrationsService: UserEventRegistrationsService,
    private eventSimpleRegistrationsService: EventSimpleRegistrationsService,
    private toastLogService: LibToastLogService,
    private windowService: NbWindowService
  ) { }

  ngOnInit() {

    this.activatedRoute.data.subscribe((data) => {
      this.event = data.event;
      this.community = data.community;
    });

    // get all registration statuses
    this.registrationStatusesService.getRegistrationStatuses().subscribe((data) => {
      this.registrationStatuses = data.registration_statuses;
      this.registrationStatuses.splice(this.registrationStatuses.findIndex(k => k.name === 'shortlisted'), 1);
    });
    this.updateFilter();
    // this.getResponses();
  }



  updateFilter() {
    this.searchForm.valueChanges.pipe(
      debounceTime(800),
      switchMap(() => {
        this.page = 1;
        this.emptyMessage = 'Loading...';
        return this.userEventRegistrationsService.getRegistrations(
          this.event.id,
          this.registrationStatusId,
          this.searchForm.get('name').value.toLowerCase(),
          this.page,
          this.count
          );
      })
    ).subscribe((data) => {
      this.setResponses(data);
    });
  }

  registrationStatusFilter(selectedRegistrationStatusId) {
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
    this.userEventRegistrationsService.getRegistrations(
      this.event.id,
      this.registrationStatusId,
      this.searchForm.get('name').value.toLowerCase(),
      this.page,
      this.count
      ).subscribe(
      (data) => {
        this.totalEntries = data.total;
        this.rows = data.user_event_registrations;
        this.isLoading = false;
        this.emptyMessage = 'No entries found';

      }
    );
  }


  setResponses(data) {
    this.totalEntries = data.total;
    this.rows = data.user_event_registrations;
    this.isLoading = false;
    this.emptyMessage = 'No entries found';

  }

  updateRegistrationStatus(registrationStatus, userResponseId) {
    this.rows.find(k => k.id === userResponseId).registration_status = registrationStatus;
  }


  updateEntryPass(entryPass, userResponseId) {
    this.rows.find(k => k.id === userResponseId).entry_pass = entryPass;
  }


  openEntryPassEmailWindow() {
    this.windowService.open(
      EmailerComponent,
      {
        title: `Send Entry Pass All Confirmed`,
        context: {
          community: this.community,
          event: this.event,
          // eventDataFormEntityGroupId: this.eventDataFormEntityGroup.id,
          mailType: EemailTypes.ENTRY_PASS,
        }
      }
    );
  }


  sendCSV() {
    this.eventSimpleRegistrationsService.emailCSV(this.event.slug).subscribe(
      data => {
        if (data) {
          this.toastLogService.successDialog('Data will be sent to your email ASAP', 5000);
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

    this.windowRef.onClose.subscribe(() => {
      this.bulkStatus = null;
      this.bulkStatusChangeForCanceled = false;
    });
  }


  bulkStatusChange(registrationStatusId) {
    this.eventSimpleRegistrationsService.changeBulkRegistrationStatus(registrationStatusId, this.event.id, this.bulkStatusChangeForCanceled).subscribe(
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
