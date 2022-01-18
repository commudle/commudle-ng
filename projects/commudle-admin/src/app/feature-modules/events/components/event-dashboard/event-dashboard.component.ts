import { NbSidebarService, NbWindowService } from '@nebular/theme';
import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { IEvent } from 'projects/shared-models/event.model';
import { ActivatedRoute } from '@angular/router';
import { ICommunity } from 'projects/shared-models/community.model';
import { faClock, faEdit, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { SeoService } from 'projects/shared-services/seo.service';
import { IEventStatus } from 'projects/shared-models/event_status.model';
import { EEventStatuses } from 'projects/shared-models/enums/event_statuses.enum';
import { EventsService } from 'projects/commudle-admin/src/app/services/events.service';
import { FormBuilder, Validators } from '@angular/forms';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';

@Component({
  selector: 'app-event-dashboard',
  templateUrl: './event-dashboard.component.html',
  styleUrls: ['./event-dashboard.component.scss']
})
export class EventDashboardComponent implements OnInit, OnDestroy {
  @ViewChild('eventGuideTemplate') eventGuideTemplate: TemplateRef<any>;

  moment = moment;
  EEventStatuses = EEventStatuses;

  faClock = faClock;
  faEdit = faEdit;
  faInfoCircle = faInfoCircle;

  event: IEvent;
  community: ICommunity;

  uploadedHeaderImageFile: File;
  uploadedHeaderImage;


  eventHeaderImageForm = this.fb.group({
    header_image: ['', Validators.required],
  });


  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private toastLogService: LibToastLogService,
    private fb: FormBuilder,
    private sidebarService: NbSidebarService,
    private windowService: NbWindowService,
    private seoService : SeoService,
  ) {}

  ngOnInit() {
    this.seoService.setTag('robots', 'noindex');

    this.sidebarService.collapse('mainMenu');
    this.activatedRoute.data.subscribe(data => {
      this.event = data.event;

      this.seoService.setTitle(`Dashboard : ${this.event.name}`);

      this.community = data.community;
      this.seoService.setTitle(`${this.event.name} Dashboard | ${this.community.name}`);
    });
  }

  ngOnDestroy() {
    this.seoService.removeTag("name='robots'");
  }


  updateEventStatus($event: IEventStatus) {
    this.event.event_status = $event;
  }

  updateRegistrationType(value) {
    this.eventsService.updateCustomRegistration(this.event.id, value).subscribe(
      data => {
        this.event = data;
      }
    );
  }

  updateAgendaType(value) {
    this.eventsService.updateCustomAgenda(this.event.id, value).subscribe(
      data => {
        this.event = data;
      }
    );
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
      reader.onload = (e: any) => {
        this.uploadedHeaderImage = reader.result;
      };

      reader.readAsDataURL(file);
      this.updateEventHeader();
    }

  }

  updateEventHeader() {
    const formData: any = new FormData();
    formData.append('header_image', this.uploadedHeaderImageFile);
    this.eventsService.updateHeaderImage(this.event.id, formData).subscribe(
      data => {
        this.event = data;
        this.toastLogService.successDialog('Updated!');
      }
    );
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({block: "start", behavior: "smooth"});
  }

  deleteEventHeader() {
    this.eventsService.deleteHeaderImage(this.event.id).subscribe(
      data => {
        this.uploadedHeaderImage = null;
        this.uploadedHeaderImageFile = null;
        this.event = data;
        this.toastLogService.successDialog('Deleted');
      }
    );
  }

  openGuide() {
    this.windowService.open(this.eventGuideTemplate, {
      title: "It's simple!"
    });
  }

}
