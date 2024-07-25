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
import {
  faLink,
  faLocationDot,
  faMapPin,
  faPen,
  faPlusCircle,
  faTrash,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { DataFormEntityResponseGroupsService } from 'apps/commudle-admin/src/app/services/data-form-entity-response-groups.service';
import { EventLocationsService } from 'apps/commudle-admin/src/app/services/event-locations.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { IDataFormEntityResponseGroup } from 'apps/shared-models/data_form_entity_response_group.model';
import { EEmbeddedVideoStreamSources } from 'apps/shared-models/enums/embedded_video_stream_sources.enum';
import { EEventType, IEventDatesLocation, IEventLocation } from 'apps/shared-models/event-location.model';
import { IEvent } from 'apps/shared-models/event.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { GooglePlacesAutocompleteService } from 'apps/commudle-admin/src/app/services/google-places-autocomplete.service';
import { TrackSlotsService } from 'apps/commudle-admin/src/app/services/track_slots.service';
import moment from 'moment';

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
  activeTabIndex = -1;

  moment = moment;
  eventDates;

  @Input() event: IEvent;
  @Input() community: ICommunity;
  eventLocations;
  eventSpeakers: IDataFormEntityResponseGroup[];
  windowRef;
  isLoading = true;
  eventDatesLocation: IEventDatesLocation[];
  admin = true;

  eventLocationForm;
  selectedEventType = EEventType.OFFLINE_ONLY;
  selectedLocation: IEventLocation;
  faLocationDot = faLocationDot;
  faVideo = faVideo;
  invalidLocationName = false;
  selectedDate: Date;

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
    this.getEventLocations();
    this.getEventSpeakers();
  }

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
    this.invalidLocationName = false;
    if (this.selectedEventType === EEventType.ONLINE_ONLY) {
      this.eventLocationForm.patchValue({
        location: {
          name: 'Online',
          address: 'NA',
          map_link: 'NA',
        },
      });
    }

    const locationName = this.eventLocationForm.get('location').get('name').value;

    if (locationName !== 'Online') {
      if (this.locationNameExists(locationName)) {
        this.invalidLocationName = true;
        return;
      }
    }
    this.windowRef.close();
    this.eventLocationsService.createEventLocation(this.event.id, this.eventLocationForm.value).subscribe((data) => {
      this.eventDatesLocation.forEach((event) => {
        event.event_locations.push(data);
      });
      this.selectLocation(data);
      this.eventLocationForm.reset();
      this.toastLogService.successDialog('Location added!');
      this.changeDetectorRef.markForCheck();
      this.changeDetectorRef.detectChanges();
    });
  }

  locationNameExists(name: string): boolean {
    for (const dateLocation of this.eventDatesLocation) {
      for (const loc of dateLocation.event_locations) {
        if (loc.location?.name.toLowerCase() === name.toLowerCase()) {
          return true;
        }
      }
    }
    return false;
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
        this.eventLocationForm.patchValue({
          location: {
            name: 'Online',
            address: 'NA',
            map_link: 'NA',
          },
        });
        if (eventLocation.embedded_video_stream) {
          this.eventLocationForm.get('embedded_video_stream').patchValue(eventLocation.embedded_video_stream);
        }
        break;
    }

    this.windowRef = this.windowService.open(this.eventLocationFormTemplate, {
      title: `Edit Location`,
      context: { operationType: 'edit', eventLocation: eventLocation },
    });

    this.initAutocomplete();
  }

  editEventLocation(eventLocation) {
    this.invalidLocationName = false;
    const locationName = this.eventLocationForm.get('location').get('name').value;

    if (locationName !== 'Online') {
      if (this.locationNameExists(locationName)) {
        this.invalidLocationName = true;
        return;
      }
    }
    this.windowRef.close();
    this.eventLocationsService.updateEventLocation(eventLocation.id, this.eventLocationForm.value).subscribe((data) => {
      this.eventDatesLocation.forEach((dateLocation) => {
        const index = dateLocation.event_locations.findIndex((k) => {
          return k.id === eventLocation.id;
        });
        if (index !== -1) {
          dateLocation.event_locations[index] = data;
          this.activeTabIndex = index;
        }
        this.selectLocation(dateLocation.event_locations[index]);
      });
      this.eventLocationForm.reset();
      this.toastLogService.successDialog('Updated');
      this.changeDetectorRef.markForCheck();
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
      this.eventLocationsService.deleteEventLocation(eventLocation.id).subscribe(() => {
        this.toastLogService.successDialog('Deleted');
        this.changeDetectorRef.markForCheck();
      });
    }
    this.eventDatesLocation.forEach((dateLocation) => {
      const index = dateLocation.event_locations.findIndex((k) => {
        return k.id === eventLocation.id;
      });
      if (index !== -1) {
        dateLocation.event_locations.splice(index, 1);
      }
    });

    if (this.selectedLocation && this.selectedLocation.id === eventLocation.id) {
      this.selectLocation(this.eventDatesLocation[0].event_locations[0]);
    }

    this.windowRef.close();
    this.activateTabAdd();
  }

  sanitizedEmbeddedHTML(val) {
    return this.sanitizer.bypassSecurityTrustHtml(val);
  }

  openHelpTextWindow() {
    this.windowService.open(this.helpText, { title: 'How to Add Agenda!' });
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
      this.selectedDate = data[0].date;
      this.selectLocation(data[0].event_locations[0]);
      this.changeDetectorRef.markForCheck();
      this.isLoading = false;
    });
  }

  selectLocation(eventLocation) {
    this.selectedLocation = eventLocation;
    this.changeDetectorRef.detectChanges();
  }

  onTabChange(event: any) {
    const tabIndex = this.eventDatesLocation.findIndex((d) => {
      const formattedDate = moment(d.date).format('Do MMMM');
      if (formattedDate === event.tabTitle) {
        this.selectedDate = d.date;
      }
      return formattedDate === event.tabTitle;
    });
    if (tabIndex !== -1) {
      this.activeTabIndex = tabIndex;
      if (this.eventDatesLocation[tabIndex] && this.eventDatesLocation[tabIndex].event_locations.length > 0) {
        this.selectLocation(this.selectedLocation);
      }
    }
  }
}
