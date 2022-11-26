import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NbWindowService } from '@commudle/theme';
import { faLink, faMapPin, faPen, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DataFormEntityResponseGroupsService } from 'apps/commudle-admin/src/app/services/data-form-entity-response-groups.service';
import { EventLocationsService } from 'apps/commudle-admin/src/app/services/event-locations.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { IDataFormEntityResponseGroup } from 'apps/shared-models/data_form_entity_response_group.model';
import { EEmbeddedVideoStreamSources } from 'apps/shared-models/enums/embedded_video_stream_sources.enum';
import { EEventType, IEventLocation } from 'apps/shared-models/event-location.model';
import { IEvent } from 'apps/shared-models/event.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';

@Component({
  selector: 'app-event-locations',
  templateUrl: './event-locations.component.html',
  styleUrls: ['./event-locations.component.scss'],
})
export class EventLocationsComponent implements OnInit {
  @ViewChild('eventLocationFormTemplate') eventLocationFormTemplate: TemplateRef<any>;
  @ViewChild('deleteEventLocationTemplate') deleteEventLocationTemplate: TemplateRef<any>;
  @ViewChild('helpText') helpText: TemplateRef<any>;

  faLink = faLink;
  faMapPin = faMapPin;
  faPen = faPen;
  faTrash = faTrash;
  faPlusCircle = faPlusCircle;
  EEventType = EEventType;
  EEmbeddedVideoStreamSources = EEmbeddedVideoStreamSources;

  @Input() event: IEvent;
  @Input() community: ICommunity;
  eventLocations: IEventLocation[];
  eventSpeakers: IDataFormEntityResponseGroup[];
  windowRef;

  eventLocationForm;
  selectedEventType = EEventType.OFFLINE_ONLY;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventLocationsService: EventLocationsService,
    private dataFormEntityResponseGroupsService: DataFormEntityResponseGroupsService,
    private fb: FormBuilder,
    private windowService: NbWindowService,
    private toastLogService: LibToastLogService,
    private sanitizer: DomSanitizer,
  ) {
    this.eventLocationForm = this.fb.group({
      location: this.fb.group({
        name: ['', Validators.required],
        address: ['', Validators.required],
        map_link: ['', Validators.required],
      }),
      event_type: [EEventType.OFFLINE_ONLY, Validators.required],
      embedded_video_stream: this.fb.group({
        source: [''],
        embed_code: [''],
        zoom_host_email: ['', Validators.email],
        zoom_password: [''],
      }),
    });
  }

  ngOnInit() {
    this.getEventLocations();
    this.getEventSpeakers();
  }

  getEventLocations() {
    this.eventLocationsService.getEventLocations(this.event.slug).subscribe((data) => {
      this.eventLocations = data.event_locations;
    });
  }

  getEventSpeakers() {
    this.dataFormEntityResponseGroupsService.getEventSpeakers(this.event.id).subscribe((data) => {
      this.eventSpeakers = data.data_form_entity_response_groups;
    });
  }

  toggleEventTypeValidations(eventType) {
    this.selectedEventType = eventType;
    switch (eventType) {
      case EEventType.OFFLINE_ONLY: {
        this.eventLocationForm.get('location').get('name').setValidators(Validators.required);
        this.eventLocationForm.get('location').get('address').setValidators(Validators.required);
        this.eventLocationForm.get('location').get('map_link').setValidators(Validators.required);
        break;
      }
      case EEventType.ONLINE_ONLY: {
        this.eventLocationForm.get('location').get('name').clearValidators();
        this.eventLocationForm.get('location').get('address').clearValidators();
        this.eventLocationForm.get('location').get('map_link').clearValidators();
        break;
      }
    }

    this.eventLocationForm.get('location').get('name').updateValueAndValidity();
    this.eventLocationForm.get('location').get('address').updateValueAndValidity();
    this.eventLocationForm.get('location').get('map_link').updateValueAndValidity();
  }

  updateZoomValidators() {
    if (this.eventLocationForm.get('embedded_video_stream').get('source').value === EEmbeddedVideoStreamSources.ZOOM) {
      this.eventLocationForm
        .get('embedded_video_stream')
        .get('zoom_host_email')
        .setValidators([Validators.required, Validators.email]);
      this.eventLocationForm.get('embedded_video_stream').get('zoom_password').setValidators(Validators.required);
    } else {
      this.eventLocationForm.get('embedded_video_stream').get('zoom_host_email').clearValidators();
      this.eventLocationForm.get('embedded_video_stream').get('zoom_password').clearValidators();
    }

    this.eventLocationForm.get('embedded_video_stream').get('zoom_host_email').updateValueAndValidity();
    this.eventLocationForm.get('embedded_video_stream').get('zoom_password').updateValueAndValidity();
  }

  showAddEventLocationForm() {
    this.eventLocationForm.reset();
    this.selectedEventType = EEventType.OFFLINE_ONLY;
    this.windowRef = this.windowService.open(this.eventLocationFormTemplate, {
      title: 'Add Location',
      context: { operationType: 'create' },
    });
  }

  addEventLocation() {
    this.windowRef.close();
    this.eventLocationsService.createEventLocation(this.event.id, this.eventLocationForm.value).subscribe((data) => {
      this.eventLocations.push(data);
      this.eventLocationForm.reset();
      this.toastLogService.successDialog('Location added!');
    });
  }

  showEditEventLocationForm(eventLocation) {
    this.eventLocationForm.reset();
    this.selectedEventType = eventLocation.event_type;
    this.toggleEventTypeValidations(this.selectedEventType);
    this.eventLocationForm.patchValue({
      event_type: this.selectedEventType,
    });

    switch (this.selectedEventType) {
      case EEventType.OFFLINE_ONLY:
        this.eventLocationForm.get('location').patchValue(eventLocation.location);
        break;
      case EEventType.ONLINE_ONLY:
        if (eventLocation.embedded_video_stream) {
          this.eventLocationForm.get('embedded_video_stream').patchValue(eventLocation.embedded_video_stream);
        }
        break;
    }
    this.windowRef = this.windowService.open(this.eventLocationFormTemplate, {
      title: `Edit Location`,
      context: { operationType: 'edit', eventLocation: eventLocation },
    });
  }

  editEventLocation(eventLocation) {
    this.windowRef.close();
    this.eventLocationsService.updateEventLocation(eventLocation.id, this.eventLocationForm.value).subscribe((data) => {
      const locationIndex = this.eventLocations.findIndex((k) => k.id === data.id);
      this.eventLocations[locationIndex] = data;
      this.eventLocationForm.reset();
      this.toastLogService.successDialog('Updated');
    });
  }

  confirmDeleteEventLocation(eventLocation) {
    this.windowRef = this.windowService.open(this.deleteEventLocationTemplate, {
      title: `Delete this location?`,
      context: { eventLocation },
    });
  }

  deleteEventLocation(deleteConf, eventLocation) {
    if (deleteConf) {
      this.eventLocationsService.deleteEventLocation(eventLocation.id).subscribe((data) => {
        const locationIndex = this.eventLocations.findIndex((k) => data.id);
        this.eventLocations.splice(locationIndex, 1);
        this.toastLogService.successDialog('Deleted');
      });
    }
    this.windowRef.close();
  }

  // from the event emitter of child component

  addTrack(newTrack, locationIndex) {
    this.eventLocations[locationIndex].event_location_tracks.push(newTrack);
  }

  updateTrack(track, locationIndex) {
    const trackPosition = this.eventLocations[locationIndex].event_location_tracks.findIndex((k) => k.id === track.id);
    this.eventLocations[locationIndex].event_location_tracks[trackPosition] = track;
  }

  removeTrack(trackId, locationIndex) {
    const trackPosition = this.eventLocations[locationIndex].event_location_tracks.findIndex((k) => k.id === trackId);
    this.eventLocations[locationIndex].event_location_tracks.splice(trackPosition, 1);
  }

  addSlot(newTrackSlot, locationIndex) {
    const trackPosition = this.eventLocations[locationIndex].event_location_tracks.findIndex(
      (k) => k.id === newTrackSlot.event_location_track_id,
    );
    this.eventLocations[locationIndex].event_location_tracks[trackPosition].track_slots.push(newTrackSlot);
  }

  updateSlot(trackSlot, locationIndex) {
    const trackPosition = this.eventLocations[locationIndex].event_location_tracks.findIndex(
      (k) => k.id == trackSlot.event_location_track_id,
    );

    const slotPosition = this.eventLocations[locationIndex].event_location_tracks[trackPosition].track_slots.findIndex(
      (k) => k.id == trackSlot.id,
    );

    this.eventLocations[locationIndex].event_location_tracks[trackPosition].track_slots[slotPosition] = trackSlot;
  }

  removeSlot(trackSlot, locationIndex) {
    const trackPosition = this.eventLocations[locationIndex].event_location_tracks.findIndex(
      (k) => k.id == trackSlot.event_location_track_id,
    );

    const slotPosition = this.eventLocations[locationIndex].event_location_tracks[trackPosition].track_slots.findIndex(
      (k) => k.id == trackSlot.id,
    );
    this.eventLocations[locationIndex].event_location_tracks[trackPosition].track_slots.splice(slotPosition, 1);
  }

  sanitizedEmbeddedHTML(val) {
    return this.sanitizer.bypassSecurityTrustHtml(val);
  }

  openHelpTextWindow() {
    this.windowService.open(this.helpText, { title: 'How to Add Agenda!' });
  }
}
