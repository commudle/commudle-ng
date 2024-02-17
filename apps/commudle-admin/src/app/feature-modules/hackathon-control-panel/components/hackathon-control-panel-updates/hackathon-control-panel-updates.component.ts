import { Component, OnInit } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { IEventUpdate } from 'apps/shared-models/event_update.model';
import { EntityUpdatesService } from 'apps/commudle-admin/src/app/services/entity-updates.service';
import { EDbModels } from '@commudle/shared-models';
import { IHackathon } from 'apps/shared-models/hackathon.model';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';

@Component({
  selector: 'commudle-hackathon-control-panel-updates',
  templateUrl: './hackathon-control-panel-updates.component.html',
  styleUrls: ['./hackathon-control-panel-updates.component.scss'],
})
export class HackathonControlPanelUpdatesComponent implements OnInit {
  EDbModels = EDbModels;
  moment = moment;
  updates: IEventUpdate[] = [];
  images = [];
  showPreviewImages = false;
  selectedImages: File[] = [];
  icons = {
    faXmark,
  };
  isLoading = false;
  hackathon: IHackathon;
  constructor(
    private activatedRoute: ActivatedRoute,
    private entityUpdatesService: EntityUpdatesService,
    private hackathonService: HackathonService,
  ) {}

  ngOnInit() {
    this.activatedRoute.parent.paramMap.subscribe((params) => {
      this.fetchHackathonDetails(params.get('hackathon_id'));
    });
  }

  fetchHackathonDetails(hackathonId) {
    this.hackathonService.showHackathon(hackathonId).subscribe((data) => {
      this.hackathon = data;
      this.getUpdates();
    });
  }

  getUpdates() {
    this.entityUpdatesService.getEntityUpdates(this.hackathon.id, EDbModels.HACKATHON).subscribe((data) => {
      this.updates = data;
    });
  }

  createEventUpdate(event) {
    this.isLoading = true;
    // Create a new FormData object
    const formData = new FormData();

    // Append the event text (assuming removeHtmlTags returns the text)
    formData.append('entity_update[details]', event);

    // Append the images to the FormData
    for (let i = 0; i < this.selectedImages.length; i++) {
      const image = this.selectedImages[i];
      formData.append('entity_update[images][]', image);
    }
    this.images = [];
    this.entityUpdatesService.createEntityUpdate(formData, 1, EDbModels.HACKATHON).subscribe((data) => {
      this.selectedImages = [];
      this.updates.unshift(data);
      this.isLoading = false;
    });
  }

  deleteEventUpdate(eventUpdateId, index) {
    this.entityUpdatesService.deleteEntityUpdate(eventUpdateId).subscribe((data) => {
      if (data) this.updates.splice(index, 1);
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
