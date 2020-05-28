import { Component, OnInit, Input } from '@angular/core';
import { ICommunity } from 'projects/shared-models/community.model';
import { IEvent } from 'projects/shared-models/event.model';
import { EventLocationsService } from 'projects/commudle-admin/src/app/services/event-locations.service';
import { IEventLocation } from 'projects/shared-models/event-location.model';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  @Input() community: ICommunity;
  @Input() event: IEvent;

  eventLocations: IEventLocation[] = [];

  constructor(
    private eventLocationsService: EventLocationsService
  ) { }

  ngOnInit() {
    this.getEventLocations();
  }

  getEventLocations() {
    this.eventLocationsService.pGetEventLocations(this.event.id).subscribe(
      data => {
        this.eventLocations = data.event_locations;
      }
    );
  }

  getLocationName(eventLocation: IEventLocation) {
    return (eventLocation.embedded_video_stream ? 'Video Stream' : eventLocation.location.name);
  }

  getTabIcon(eventLocation: IEventLocation) {
    return (eventLocation.embedded_video_stream ? 'video' : 'pin');
  }

  updateSessionPreference(data, locationIndex) {
    this.eventLocations[locationIndex].event_location_tracks[data.track_index].track_slots[data.track_slot_index].user_vote = data.preference;

  }

}
