import { Component, OnInit, Input } from '@angular/core';
import { IEventLocationTrack } from 'projects/shared-models/event-location-track.model';
import * as moment from 'moment';


@Component({
  selector: 'app-event-location-tracks',
  templateUrl: './event-location-tracks.component.html',
  styleUrls: ['./event-location-tracks.component.scss']
})
export class EventLocationTracksComponent implements OnInit {
  @Input() eventLocationTracks: IEventLocationTrack[];

  moment = moment;

  hours;
  minutes;
  constructor() { }

  ngOnInit() {
    this.hours = [...Array(24).keys()];
    this.minutes = [...Array(60).keys()];
    console.log(this.eventLocationTracks);
  }

  displayTime(hour, minute) {
    return moment(`${hour}:${minute}`, 'H:m').format('hh:mm A');
  }


  showAddSlotForm() {

  }

  addSlot() {

  }

  editSlotForm() {

  }

  editSlot() {

  }


  showAddTrackForm() {

  }

  addTrack() {

  }

  showEditTrackForm() {

  }

  editTrack() {

  }

}
