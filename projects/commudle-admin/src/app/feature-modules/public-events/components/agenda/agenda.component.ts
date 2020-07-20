import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ICommunity} from 'projects/shared-models/community.model';
import {IEvent} from 'projects/shared-models/event.model';
import {EventLocationsService} from 'projects/commudle-admin/src/app/services/event-locations.service';
import {IEventLocation} from 'projects/shared-models/event-location.model';
import {ITrackSlot} from "projects/shared-models/track-slot.model";
import * as moment from 'moment';
import * as _ from 'lodash';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  moment = moment;

  @Input() community: ICommunity;
  @Input() event: IEvent;
  @Output() hasAgenda = new EventEmitter();

  eventLocations: IEventLocation[] = [];

  constructor(
    private eventLocationsService: EventLocationsService
  ) {
  }

  ngOnInit() {
    this.getEventLocations();
  }

  getEventLocations() {
    this.eventLocationsService.pGetEventLocations(this.event.id).subscribe(data => {
      this.eventLocations = data.event_locations;
      if (this.eventLocations.length > 0) {
        this.hasAgenda.emit(true);
      }
    });
  }

  getLocationName(eventLocation: IEventLocation) {
    return (eventLocation.embedded_video_stream ? 'Video Stream' : (eventLocation.location ? eventLocation.location.name : ""));
  }

  getTabIcon(eventLocation: IEventLocation) {
    return (eventLocation.embedded_video_stream ? 'video' : 'pin');
  }

  updateSessionPreference(data, locationIndex) {
    this.eventLocations[locationIndex].event_location_tracks[data.track_index].track_slots[data.track_slot_index].user_vote = data.preference;
  }

  getUpcomingEvents() {
    let upcomingEvents: Array<ITrackSlot> = [];

    this.eventLocations.forEach(el => el.event_location_tracks.forEach(elt => elt.track_slots.forEach(slot => upcomingEvents.push(slot))));

    upcomingEvents = _.sortBy(upcomingEvents, slot => { // @ts-ignore
      return new moment(slot.start_time);
    });

    return upcomingEvents;
  }
}
