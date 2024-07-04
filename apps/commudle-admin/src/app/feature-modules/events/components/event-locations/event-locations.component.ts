import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NbTabComponent, NbTabsetComponent, NbWindowService } from '@commudle/theme';
import { faLink, faMapPin, faPen, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DataFormEntityResponseGroupsService } from 'apps/commudle-admin/src/app/services/data-form-entity-response-groups.service';
import { EventLocationsService } from 'apps/commudle-admin/src/app/services/event-locations.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { IDataFormEntityResponseGroup } from 'apps/shared-models/data_form_entity_response_group.model';
import { EEmbeddedVideoStreamSources } from 'apps/shared-models/enums/embedded_video_stream_sources.enum';
import { EEventType, IEventLocation } from 'apps/shared-models/event-location.model';
import { IEvent } from 'apps/shared-models/event.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { GooglePlacesAutocompleteService } from 'apps/commudle-admin/src/app/services/google-places-autocomplete.service';
import { TrackSlotsService } from 'apps/commudle-admin/src/app/services/track_slots.service';
import moment from 'moment';
import { ILocation } from 'apps/shared-models/location.model';
import { ILocations } from 'apps/shared-models/locations.model';

@Component({
  selector: 'app-event-locations',
  templateUrl: './event-locations.component.html',
  styleUrls: ['./event-locations.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
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
  activeTabIndex = -1;

  moment = moment;
  eventDates;

  @Input() event: IEvent;
  @Input() community: ICommunity;
  // eventLocations: IEventLocation[];
  eventLocations;
  eventSpeakers: IDataFormEntityResponseGroup[];
  windowRef;
  isLoading = true;
  eventDatesLocation;
  // eventDatesLocation: ILocations[];
  // eventDatesLocation: ILocations[];
  admin = true;

  eventLocationForm;
  selectedEventType = EEventType.OFFLINE_ONLY;
  selectedLocation;

  @ViewChild('tabset') tabsetEl: NbTabsetComponent;
  @ViewChild('addTab') addTabEl: NbTabComponent;

  constructor(
    private eventLocationsService: EventLocationsService,
    private dataFormEntityResponseGroupsService: DataFormEntityResponseGroupsService,
    private fb: FormBuilder,
    private windowService: NbWindowService,
    private toastLogService: LibToastLogService,
    private sanitizer: DomSanitizer,
    private googlePlacesAutocompleteService: GooglePlacesAutocompleteService,
    private changeDetectorRef: ChangeDetectorRef,
    private trackSlotsService: TrackSlotsService,
  ) {
    this.eventLocationForm = this.fb.group({
      location: this.fb.group({
        name: ['', Validators.required],
        address: ['', Validators.required],
        map_link: ['', Validators.required],
      }),
      event_type: [EEventType.OFFLINE_ONLY],
      embedded_video_stream: this.fb.group({
        source: [''],
        embed_code: [''],
        zoom_host_email: ['', Validators.email],
        zoom_password: [''],
      }),
    });
  }

  ngOnInit() {
    // this.getEventsDate();
    this.getEventLocations();
    this.getEventSpeakers();
  }

  // getEventLocations() {
  //   this.eventLocationsService.getEventLocations(this.event.slug).subscribe((data) => {
  //     this.eventLocations = data.event_locations;
  //     this.changeDetectorRef.markForCheck();
  //     this.isLoading = false;
  //   });
  // }

  getEventSpeakers() {
    this.dataFormEntityResponseGroupsService.getEventSpeakers(this.event.id).subscribe((data) => {
      this.eventSpeakers = data.data_form_entity_response_groups;
      this.changeDetectorRef.markForCheck();
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
    this.eventLocationForm.patchValue({
      event_type: this.selectedEventType,
    });
    this.windowRef = this.windowService.open(this.eventLocationFormTemplate, {
      title: 'Add Location',
      context: { operationType: 'create' },
    });

    this.initAutocomplete();
  }

  addEventLocation() {
    this.windowRef.close();
    this.eventLocationsService.createEventLocation(this.event.id, this.eventLocationForm.value).subscribe((data) => {
      this.eventDatesLocation.forEach((event) => {
        event.event_locations.push(data);
      });
      //After - Push whole data event.locations.push(data.location);
      this.eventLocationForm.reset();
      this.toastLogService.successDialog('Location added!');
      this.changeDetectorRef.markForCheck();
      this.changeDetectorRef.detectChanges();
    });
  }

  showEditEventLocationForm(eventLocation) {
    this.eventLocationForm.reset();
    // After - this.selectedEventType = eventLocation.event_type;
    // After - this.toggleEventTypeValidations(this.selectedEventType);
    // After - this.eventLocationForm.patchValue({
    //   event_type: this.selectedEventType,
    // });

    // After - switch (this.selectedEventType) {
    //   case EEventType.OFFLINE_ONLY:
    //     this.eventLocationForm.get('location').patchValue(eventLocation.location);
    //     break;
    //   case EEventType.ONLINE_ONLY:
    //     if (eventLocation.embedded_video_stream) {
    //       this.eventLocationForm.get('embedded_video_stream').patchValue(eventLocation.embedded_video_stream);
    //     }
    //     break;
    // }

    this.eventLocationForm.get('location').patchValue(eventLocation.location);
    this.windowRef = this.windowService.open(this.eventLocationFormTemplate, {
      title: `Edit Location`,
      context: { operationType: 'edit', eventLocation: eventLocation },
    });

    this.initAutocomplete();
  }

  editEventLocation(eventLocation) {
    this.windowRef.close();
    this.eventLocationsService.updateEventLocation(eventLocation.id, this.eventLocationForm.value).subscribe((data) => {
      let locationIndex = -1;
      this.eventDatesLocation.forEach((dateLocation) => {
        const index = dateLocation.event_locations.findIndex((k) => k.id === eventLocation.id);
        if (index !== -1) {
          locationIndex = index;
          dateLocation.event_locations[index] = data;
        }
      });

      this.activeTabIndex = locationIndex;
      this.eventLocationForm.reset();
      this.toastLogService.successDialog('Updated');
      this.changeDetectorRef.markForCheck();
    });
  }

  // editEventLocation(eventLocation) {
  //   console.log(eventLocation, 'location');
  //   this.windowRef.close();
  //   this.eventLocationsService.updateEventLocation(eventLocation.id, this.eventLocationForm.value).subscribe((data) => {
  //     console.log(data, 'data');
  //     let locationIndex = -1;
  //     this.eventDatesLocation.forEach((dateLocation) => {
  //       const index = dateLocation.event_locations.findIndex((k) => {
  //         return k.id === data.id;
  //       });
  //       if (index !== -1) {
  //         locationIndex = index;
  //         dateLocation.event_locations[index] = data;
  //       }
  //     });

  //     this.activeTabIndex = locationIndex;
  //     // this.eventDatesLocation[locationIndex] = data;
  //     this.eventLocationForm.reset();
  //     this.toastLogService.successDialog('Updated');
  //     this.changeDetectorRef.markForCheck();
  //   });
  // }

  confirmDeleteEventLocation(eventLocation) {
    this.windowRef = this.windowService.open(this.deleteEventLocationTemplate, {
      title: `Delete this location?`,
      context: { eventLocation },
    });
  }

  deleteEventLocation(deleteConf, eventLocation) {
    if (deleteConf) {
      this.eventLocationsService.deleteEventLocation(eventLocation.id).subscribe(() => {
        this.toastLogService.successDialog('Deleted');
        this.changeDetectorRef.markForCheck();
      });
    }
    const locationIndex = this.eventLocations.findIndex((k) => k.id === eventLocation.id);
    this.eventLocations.splice(locationIndex, 1);
    this.windowRef.close();
    this.activateTabAdd();
  }

  // updateTrack(track, locationIndex) {
  //   const trackPosition = this.eventLocations[locationIndex].event_location_tracks.findIndex((k) => k.id === track.id);
  //   this.eventLocations[locationIndex].event_location_tracks[trackPosition] = track;
  //   this.changeDetectorRef.markForCheck();
  // }

  removeTrack(trackId, locationIndex) {
    const trackPosition = this.eventLocations[locationIndex].event_location_tracks.findIndex((k) => k.id === trackId);
    this.eventLocations[locationIndex].event_location_tracks.splice(trackPosition, 1);
  }

  addSlot(newTrackSlot, locationIndex) {
    const trackPosition = this.eventLocations[locationIndex].event_location_tracks.findIndex(
      (k) => k.id === newTrackSlot.event_location_track_id,
    );
    this.eventLocations[locationIndex].event_location_tracks[trackPosition].track_slots = [
      ...this.eventLocations[locationIndex].event_location_tracks[trackPosition].track_slots,
      newTrackSlot,
    ];
    this.changeDetectorRef.markForCheck();
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

  getTabIcon(eventLocation: IEventLocation) {
    return eventLocation.embedded_video_stream ? 'video' : 'pin';
  }

  getLocationName(eventLocation: IEventLocation) {
    return eventLocation.embedded_video_stream
      ? 'Video Stream'
      : eventLocation.location
      ? eventLocation.location.name
      : '';
  }

  activateTabAdd() {
    this.tabsetEl.selectTab(this.addTabEl);
  }

  //Using native element javascript because the form input element on which  location is need to be applied is not getting rendered
  initAutocomplete() {
    const addressInput = document.getElementById('addressInput') as HTMLInputElement;
    this.googlePlacesAutocompleteService.initAutocomplete(addressInput, 'establishment');
    this.googlePlacesAutocompleteService.placeChanged.subscribe((place: google.maps.places.PlaceResult) => {
      this.onLocationPlaceSelected(place);
    });
  }

  onLocationPlaceSelected(place: google.maps.places.PlaceResult) {
    this.eventLocationForm
      .get('location')
      .get('address')
      .setValue(place.name + ', ' + place.formatted_address);
    this.eventLocationForm.get('location').get('map_link').setValue(place.url);
  }

  getEventLocations() {
    this.trackSlotsService.getEventDates(this.event.slug).subscribe((data: any) => {
      this.eventDatesLocation = data;
      // this.eventLocations = data.reduce((acc, event) => acc.concat(event.locations), []);
      this.selectLocation(data[0].event_locations[0]);
      this.changeDetectorRef.markForCheck();
      this.isLoading = false;
      // this.eventDates = data.map((event) => moment(event.date).format('Do MMMM'));
    });
  }

  selectLocation(location) {
    this.selectedLocation = location;
    this.changeDetectorRef.detectChanges();
  }
}
