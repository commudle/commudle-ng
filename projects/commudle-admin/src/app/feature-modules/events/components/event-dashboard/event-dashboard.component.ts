import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import * as moment from 'moment';
import { EventsService } from 'projects/commudle-admin/src/app/services/events.service';
import { ICommunity } from 'projects/shared-models/community.model';
import { EEventStatuses } from 'projects/shared-models/enums/event_statuses.enum';
import { IEvent } from 'projects/shared-models/event.model';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';

@Component({
  selector: 'app-event-dashboard',
  templateUrl: './event-dashboard.component.html',
  styleUrls: ['./event-dashboard.component.scss'],
})
export class EventDashboardComponent implements OnInit, OnDestroy {
  event: IEvent;
  community: ICommunity;

  moment = moment;
  EEventStatuses = EEventStatuses;

  uploadedHeaderImageFile: File;
  uploadedHeaderImage;

  eventHeaderImageForm = this.fb.group({
    header_image: ['', Validators.required],
  });

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private toastLogService: LibToastLogService,
    private fb: FormBuilder,
    private windowService: NbWindowService,
    private meta: Meta,
    private title: Title,
  ) {}

  ngOnInit() {
    this.meta.updateTag({ name: 'robots', content: 'noindex' });

    this.activatedRoute.data.subscribe((value) => {
      this.event = value.event;

      this.community = value.community;
      this.title.setTitle(`${this.event.name} Dashboard | ${this.community.name}`);
    });
  }

  ngOnDestroy() {
    this.meta.removeTag("name='robots'");
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

  displaySelectedHeaderImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size > 2425190) {
        this.toastLogService.warningDialog('Image should be less than 2 Mb', 3000);
        return;
      }
      this.uploadedHeaderImageFile = file;
      const reader = new FileReader();
      reader.onload = () => (this.uploadedHeaderImage = reader.result);

      reader.readAsDataURL(file);
      this.updateEventHeader();
    }
  }

  updateEventHeader() {
    const formData: any = new FormData();
    formData.append('header_image', this.uploadedHeaderImageFile);
    this.eventsService.updateHeaderImage(this.event.id, formData).subscribe((data) => {
      this.event = data;
      this.toastLogService.successDialog('Updated!');
    });
  }

  scroll(element: ElementRef<HTMLDivElement>) {
    element.nativeElement.scrollIntoView({ block: 'start', behavior: 'smooth', inline: 'nearest' });
  }

  deleteEventHeader() {
    this.eventsService.deleteHeaderImage(this.event.id).subscribe((data) => {
      this.uploadedHeaderImage = null;
      this.uploadedHeaderImageFile = null;
      this.event = data;
      this.toastLogService.successDialog('Deleted');
    });
  }

  openGuide() {
    this.windowService.open(this.eventGuideSectionRef, { title: "It's simple!" });
  }
}
