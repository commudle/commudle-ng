import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService, NbWindowService, NbDialogRef } from '@commudle/theme';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { StatsEventsService } from 'apps/commudle-admin/src/app/services/stats/stats-events.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { EEventStatuses } from 'apps/shared-models/enums/event_statuses.enum';
import { IEvent } from 'apps/shared-models/event.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { SeoService } from 'apps/shared-services/seo.service';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { faUpRightFromSquare, faUserGroup, faShareNodes, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-event-dashboard',
  templateUrl: './event-dashboard.component.html',
  styleUrls: ['./event-dashboard.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDashboardComponent implements OnInit, OnDestroy {
  event: IEvent;
  community: ICommunity;

  moment = moment;
  EEventStatuses = EEventStatuses;

  uploadedHeaderImageFile: File;
  uploadedHeaderImage;

  eventHeaderImageForm;
  attendedMemberEmailerDialog: NbDialogRef<any>;

  isLoading = false;

  icons = {
    faUpRightFromSquare,
    faClipboard,
    faUserGroup,
    faShareNodes,
    faCircleInfo,
  };

  @ViewChild('statusSection') statusSectionRef: ElementRef<HTMLDivElement>;
  @ViewChild('detailsSection') detailsSectionRef: ElementRef<HTMLDivElement>;
  @ViewChild('updatesSection') updatesSectionRef: ElementRef<HTMLDivElement>;
  @ViewChild('registrationsSection') registrationsSectionRef: ElementRef<HTMLDivElement>;
  @ViewChild('agendaSection') agendaSectionRef: ElementRef<HTMLDivElement>;
  @ViewChild('collaborationsSection') collaborationsSectionRef: ElementRef<HTMLDivElement>;
  @ViewChild('volunteersSection') volunteersSectionRef: ElementRef<HTMLDivElement>;
  @ViewChild('sponsorsSection') sponsorsSectionRef: ElementRef<HTMLDivElement>;
  @ViewChild('emailsSection') emailsSectionRef: ElementRef<HTMLDivElement>;
  @ViewChild('eventGuideSection') eventGuideSectionRef: TemplateRef<any>;
  @ViewChild('attendedMemberEmailer') attendedMemberEmailer: TemplateRef<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private toastLogService: LibToastLogService,
    private fb: FormBuilder,
    private windowService: NbWindowService,
    private seoService: SeoService,
    private nbDialogService: NbDialogService,
  ) {
    this.eventHeaderImageForm = this.fb.group({
      header_image: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.seoService.noIndex(true);

    this.activatedRoute.data.subscribe((value) => {
      this.event = value.event;
      this.community = value.community;
      this.seoService.setTitle(`${this.event.name} Dashboard | ${this.community.name}`);
    });
  }

  ngOnDestroy() {
    this.seoService.noIndex(false);
  }

  updateRegistrationType(value) {
    this.eventsService.updateCustomRegistration(this.event.id, value).subscribe((data) => {
      this.event = data;
    });
  }

  updateAgendaType(value) {
    this.eventsService.updateCustomAgenda(this.event.id, value).subscribe((data) => {
      this.event = data;
    });
  }

  scroll(element: ElementRef<HTMLDivElement>) {
    element.nativeElement.scrollIntoView({ block: 'start', behavior: 'smooth', inline: 'nearest' });
  }

  openGuide() {
    this.windowService.open(this.eventGuideSectionRef, { title: "It's simple!" });
  }

  // To open confirmations dialog bor for sending attended members email
  openAttendedMemberEmailerDialog() {
    this.attendedMemberEmailerDialog = this.nbDialogService.open(this.attendedMemberEmailer, {
      closeOnEsc: true,
      closeOnBackdropClick: false,
    });
  }

  // To send email to attended members
  sendAttendedMemberEmailer() {
    this.isLoading = true;
    this.eventsService.attendedMemberNotification(this.event.id).subscribe((data) => {
      if (data) {
        this.toastLogService.successDialog('Email Sent');
      } else {
        this.toastLogService.warningDialog('Something Wrong');
      }
    });
  }
}
