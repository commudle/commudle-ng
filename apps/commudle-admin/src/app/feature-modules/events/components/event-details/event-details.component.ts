import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ICommunity } from 'apps/shared-models/community.model';
import { IEvent } from 'apps/shared-models/event.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faFileLines } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit {
  @Input() event: IEvent;
  @Input() community: ICommunity;

  subscriptions: Subscription[] = [];

  moment = moment;
  isStatsLoading = true;

  uploadedHeaderImageFile: File;
  uploadedHeaderImage;
  icons = {
    faArrowRight,
    faFileLines,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private toastLogService: LibToastLogService,
  ) {}

  ngOnInit(): void {
    this.getEventAndCommunityData();
  }

  getEventAndCommunityData() {
    this.activatedRoute.parent.data.subscribe((value) => {
      this.event = value.event;
      this.community = value.community;
    });
  }

  deleteEventHeader() {
    this.eventsService.deleteHeaderImage(this.event.id).subscribe((data) => {
      this.uploadedHeaderImage = null;
      this.uploadedHeaderImageFile = null;
      this.event = data;
      this.toastLogService.successDialog('Deleted');
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
}
