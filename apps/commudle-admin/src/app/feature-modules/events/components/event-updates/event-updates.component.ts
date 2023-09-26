import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventUpdatesService } from 'apps/commudle-admin/src/app/services/event-updates.service';
import { EEventStatuses } from 'apps/shared-models/enums/event_statuses.enum';
import { IEvent } from 'apps/shared-models/event.model';
import { IEventUpdate } from 'apps/shared-models/event_update.model';
import * as moment from 'moment';

@Component({
  selector: 'app-event-updates',
  templateUrl: './event-updates.component.html',
  styleUrls: ['./event-updates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventUpdatesComponent implements OnInit {
  event: IEvent;
  moment = moment;
  EEventStatuses = EEventStatuses;

  eventUpdates: IEventUpdate[] = [];
  images: any[] = [];
  showPreviewImages = false;
  imgesSelect;

  constructor(
    private eventUpdatesService: EventUpdatesService,
    private changeDetectorRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activatedRoute.parent.data.subscribe((value) => {
      this.event = value.event;
      this.getEventUpdates();
    });
  }

  getEventUpdates() {
    this.eventUpdatesService.getEventUpdates(this.event.id).subscribe((data) => {
      this.eventUpdates = data.event_updates;
      this.changeDetectorRef.markForCheck();
    });
  }

  createEventUpdate(event) {
    // Create a new FormData object
    const formData = new FormData();

    // Append the event text (assuming removeHtmlTags returns the text)
    formData.append('event_update[details]', this.removeHtmlTags(event));

    // Append the images to the FormData
    for (let i = 0; i < this.imgesSelect.length; i++) {
      const image = this.imgesSelect[i];
      formData.append('event_update[images][]', image);
    }
    this.eventUpdatesService.createEventUpdate(formData, this.event.id).subscribe((data) => {
      this.eventUpdates.unshift(data);
      this.changeDetectorRef.markForCheck();
    });
  }

  removeHtmlTags(data) {
    return data.replace(/<[^>]*>/g, '');
  }

  deleteEventUpdate(eventUpdateId, index) {
    this.eventUpdatesService.deleteEventUpdate(eventUpdateId).subscribe((data) => {
      this.eventUpdates.splice(index, 1);
      this.changeDetectorRef.markForCheck();
    });
  }

  uploadImages(event) {
    // this.images = [];
    this.imgesSelect = event;
    this.showPreview();
  }

  showPreview() {
    this.showPreviewImages = true;
    for (let i = 0; i < this.imgesSelect.length; i++) {
      const file = this.imgesSelect[i];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.images.push({
          url: e.target.result,
          name: file.name,
        });
      };

      reader.readAsDataURL(file);
    }
  }
}
