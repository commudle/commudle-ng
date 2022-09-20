import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICommunity, IEvent, IEventLocation, ITrackSlot } from '@commudle/shared-models';
import * as _ from 'lodash';
import * as moment from 'moment';
import { EventLocationsService } from '../../../../services/event-locations.service';

@Component({
  selector: 'commudle-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
})
export class AgendaComponent implements OnInit {
  moment = moment;

  @Input() community: ICommunity;
  @Input() event: IEvent;
  @Output() hasAgenda = new EventEmitter();

  eventLocations: IEventLocation[] = [];

  constructor(private eventLocationsService: EventLocationsService) {}

  ngOnInit() {
    if (this.event.custom_agenda) {
      this.getEventLocations();
    }
  }

  getEventLocations() {
    this.eventLocationsService.pGetEventLocations(this.event.id).subscribe((data) => {
      this.eventLocations = data.event_locations;
      if (this.eventLocations.length > 0) {
        this.hasAgenda.emit(true);
      }
    });
  }

  getLocationName(eventLocation: IEventLocation) {
    return eventLocation.embedded_video_stream
      ? 'Video Stream'
      : eventLocation.location
      ? eventLocation.location.name
      : '';
  }

  getTabIcon(eventLocation: IEventLocation) {
    return eventLocation.embedded_video_stream ? 'video' : 'pin';
  }

  updateSessionPreference(data, locationIndex) {
    this.eventLocations[locationIndex].event_location_tracks[data.track_index].track_slots[
      data.track_slot_index
    ].user_vote = data.preference;
  }

  getUpcomingEvents() {
    let allEvents: Array<ITrackSlot> = [];
    const upcomingEvents: Array<ITrackSlot> = [];

    this.eventLocations.forEach((el) =>
      el.event_location_tracks.forEach((elt) => elt.track_slots.forEach((slot) => allEvents.push(slot))),
    );

    allEvents = _.sortBy(allEvents, (slot) => moment(slot.start_time));

    allEvents.forEach((slot) => {
      if (moment(slot.start_time).isAfter(moment()) && moment().isAfter(moment(this.event.start_time))) {
        upcomingEvents.push(slot);
      }
    });

    return upcomingEvents;
  }
}
