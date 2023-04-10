import { Component, Input, OnInit } from '@angular/core';
import { IEventLocationTrack } from 'apps/shared-models/event-location-track.model';
import { IEvent } from 'apps/shared-models/event.model';

@Component({
  selector: 'commudle-event-location-track',
  templateUrl: './event-location-track.component.html',
  styleUrls: ['./event-location-track.component.scss'],
})
export class EventLocationTrackComponent implements OnInit {
  @Input() elt;
  // @Input() eventLocationTracks;
  @Input() eventLocationTracks: IEventLocationTrack[] = [];
  @Input() event: IEvent;

  constructor() {}

  ngOnInit(): void {}
}
