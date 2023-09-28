import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventUpdatesService } from 'apps/commudle-admin/src/app/services/event-updates.service';
import { EEventStatuses } from 'apps/shared-models/enums/event_statuses.enum';
import { IEvent } from 'apps/shared-models/event.model';
import { IEventUpdate } from 'apps/shared-models/event_update.model';
import * as moment from 'moment';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-event-updates',
  templateUrl: './event-updates.component.html',
  styleUrls: ['./event-updates.component.scss'],
})
export class EventUpdatesComponent implements OnInit {
  event: IEvent;
  moment = moment;
  EEventStatuses = EEventStatuses;

  eventUpdates: IEventUpdate[] = [];
  images = [];
  showPreviewImages = false;
  selectedImages: File[] = [];
  icons = {
    faXmark,
  };

  isLoading = false;
  constructor(private eventUpdatesService: EventUpdatesService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.parent.data.subscribe((value) => {
      this.event = value.event;
      this.getEventUpdates();
    });
  }

  getEventUpdates() {
    this.eventUpdatesService.getEventUpdates(this.event.id).subscribe((data) => {
      this.eventUpdates = data.event_updates;
    });
  }

  createEventUpdate(event) {
    this.isLoading = true;
    // Create a new FormData object
    const formData = new FormData();

    // Append the event text (assuming removeHtmlTags returns the text)
    formData.append('event_update[details]', event);

    // Append the images to the FormData
    for (let i = 0; i < this.selectedImages.length; i++) {
      const image = this.selectedImages[i];
      formData.append('event_update[images][]', image);
    }
    this.images = [];
    this.eventUpdatesService.createEventUpdate(formData, this.event.id).subscribe((data) => {
      this.selectedImages = [];
      this.eventUpdates.unshift(data);
      this.isLoading = false;
    });
  }

  deleteEventUpdate(eventUpdateId, index) {
    this.eventUpdatesService.deleteEventUpdate(eventUpdateId).subscribe((data) => {
      this.eventUpdates.splice(index, 1);
    });
  }

  uploadImages(event) {
    for (let i = 0; i < event.length; i++) {
      this.selectedImages.push(event[i]);
    }
    this.showPreview();
  }

  showPreview() {
    this.showPreviewImages = true;
    for (let i = 0; i < this.selectedImages.length; i++) {
      this.images = [];
      const file = this.selectedImages[i];

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

  removeImage(index) {
    this.images.splice(index, 1);
    this.selectedImages.splice(index, 1);
  }
}
