import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventLocationsService } from 'projects/commudle-admin/src/app/services/event-locations.service';
import { IEvent } from 'projects/shared-models/event.model';
import { IEventLocation } from 'projects/shared-models/event-location.model';
import { faLink, faMapPin, faPen, faTrash, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { DataFormEntityResponseGroupsService } from 'projects/commudle-admin/src/app/services/data-form-entity-response-groups.service';
import { IDataFormEntityResponseGroup } from 'projects/shared-models/data_form_entity_response_group.model';
import { FormBuilder, Validators } from '@angular/forms';
import { NbWindowService } from '@nebular/theme';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';


@Component({
  selector: 'app-event-locations',
  templateUrl: './event-locations.component.html',
  styleUrls: ['./event-locations.component.scss']
})
export class EventLocationsComponent implements OnInit {
  @ViewChild('eventLocationFormTemplate', {static: false}) eventLocationFormTemplate: TemplateRef<any>;
  @ViewChild('deleteEventLocationTemplate', {static: false}) deleteEventLocationTemplate: TemplateRef<any>;

  faLink = faLink;
  faMapPin = faMapPin;
  faPen = faPen;
  faTrash = faTrash;
  faPlusCircle = faPlusCircle;

  event: IEvent;
  eventLocations: IEventLocation[];
  eventSpeakers: IDataFormEntityResponseGroup[];
  windowRef;

  eventLocationForm = this.fb.group({
    location: this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      map_link: ['', Validators.required]
    })
  });




  constructor(
    private activatedRoute: ActivatedRoute,
    private eventLocationsService: EventLocationsService,
    private dataFormEntityResponseGroupsService: DataFormEntityResponseGroupsService,
    private fb: FormBuilder,
    private windowService: NbWindowService,
    private toastLogService: LibToastLogService
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.event = data.event;
      this.getEventLocations();
      this.getEventSpeakers();

    });
  }

  getEventLocations() {
    this.eventLocationsService.getEventLocations(this.event.slug).subscribe((data) => {
      this.eventLocations = data.event_locations;
    });
  }

  getEventSpeakers() {
    this.dataFormEntityResponseGroupsService.getEventSpeakers(this.event.id).subscribe(data => {
      this.eventSpeakers = data.data_form_entity_response_groups;
    });
  }


  showAddEventLocationForm() {
    this.windowRef = this.windowService.open(
      this.eventLocationFormTemplate,
      { title: 'Add Location', context: {operationType: 'create'}},
    );
  }

  addEventLocation() {
    this.windowRef.close();
    this.eventLocationsService.createEventLocation(
      this.event.id,
      this.eventLocationForm.get('location').value).subscribe((data) => {
        this.eventLocations.push(data);
        this.eventLocationForm.reset();
        this.toastLogService.successDialog("Location added!");
    });
  }

  showEditEventLocationForm(eventLocation) {
    this.eventLocationForm.get('location').patchValue(eventLocation.location);

    this.windowRef = this.windowService.open(
      this.eventLocationFormTemplate,
      { title: `Edit ${eventLocation.location.name}`, context: {operationType: 'edit', eventLocation}},
    );
  }

  editEventLocation(eventLocation) {
    this.windowRef.close();
    this.eventLocationsService.updateEventLocation(
      eventLocation.id,
      this.eventLocationForm.get('location').value).subscribe((data) => {
        let locationIndex = this.eventLocations.findIndex(k => k.id === data.id);
        this.eventLocations[locationIndex] = data;
        this.eventLocationForm.reset();
        this.toastLogService.successDialog("Updated");
    });
  }

  confirmDeleteEventLocation(eventLocation) {
    this.windowRef = this.windowService.open(
      this.deleteEventLocationTemplate,
      { title: `Delete ${eventLocation.location.name}`, context: { eventLocation } },
    );
  }

  deleteEventLocation(deleteConf, eventLocation) {
    if (deleteConf) {
      this.eventLocationsService.deleteEventLocation(eventLocation.id).subscribe((data)=>{
        let locationIndex = this.eventLocations.findIndex(k => data.id);
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
    let trackPosition = this.eventLocations[locationIndex].event_location_tracks.findIndex(
      k => k.id === track.id);
    this.eventLocations[locationIndex].event_location_tracks[trackPosition] = track;
  }

  removeTrack(trackId, locationIndex) {
    let trackPosition = this.eventLocations[locationIndex].event_location_tracks.findIndex(
      k => k.id === trackId);
    this.eventLocations[locationIndex].event_location_tracks.splice(trackPosition, 1);
  }

  addSlot(newTrackSlot, locationIndex) {
    let trackPosition = this.eventLocations[locationIndex]
                          .event_location_tracks
                          .findIndex(k => k.id == newTrackSlot.event_location_track_id);
    this.eventLocations[locationIndex].event_location_tracks[trackPosition].track_slots.push(newTrackSlot);
  }

  updateSlot(trackSlot, locationIndex) {



    let trackPosition = this.eventLocations[locationIndex]
                          .event_location_tracks
                          .findIndex(k => k.id == trackSlot.event_location_track_id);

    let slotPosition = this.eventLocations[locationIndex]
                          .event_location_tracks[trackPosition]
                          .track_slots.findIndex(k => k.id == trackSlot.id);

    this.eventLocations[locationIndex].event_location_tracks[trackPosition].track_slots[slotPosition] = trackSlot;

  }

  removeSlot(trackSlot, locationIndex) {
    let trackPosition = this.eventLocations[locationIndex]
                          .event_location_tracks
                          .findIndex(k => k.id == trackSlot.event_location_track_id);

    let slotPosition = this.eventLocations[locationIndex]
                          .event_location_tracks[trackPosition]
                          .track_slots.findIndex(k => k.id == trackSlot.id);
    this.eventLocations[locationIndex].event_location_tracks[trackPosition].track_slots.splice(slotPosition, 1);

  }

}
