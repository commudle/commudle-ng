import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventLocationsService } from 'projects/commudle-admin/src/app/services/event-locations.service';
import { IEvent } from 'projects/shared-models/event.model';
import { IEventLocation } from 'projects/shared-models/event-location.model';
import { ILocation } from 'projects/shared-models/location.model';
import { faLink, faMapPin } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-event-locations',
  templateUrl: './event-locations.component.html',
  styleUrls: ['./event-locations.component.scss']
})
export class EventLocationsComponent implements OnInit {
  faLink = faLink;
  faMapPin = faMapPin;
  event: IEvent;
  eventLocations: IEventLocation[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventLocationsService: EventLocationsService
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.event = data.event;
      this.getEventLocations();

    });
  }

  getEventLocations() {
    this.eventLocationsService.getEventLocations(this.event.slug).subscribe((data) => {
      this.eventLocations = data.event_locations;
    });
  }


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

}
