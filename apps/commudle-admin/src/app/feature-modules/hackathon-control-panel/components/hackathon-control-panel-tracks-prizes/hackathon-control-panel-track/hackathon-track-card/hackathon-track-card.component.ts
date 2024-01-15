import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IHackathonTrack } from 'apps/shared-models/hackathon-track.model';

@Component({
  selector: 'commudle-hackathon-track-card',
  templateUrl: './hackathon-track-card.component.html',
  styleUrls: ['./hackathon-track-card.component.scss'],
})
export class HackathonTrackCardComponent implements OnInit {
  @Input() hackathonTrack: IHackathonTrack;
  @Output() editTrackEvent: EventEmitter<IHackathonTrack> = new EventEmitter();
  @Output() destroyTrackEvent: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  edit(hackathonTrack) {
    this.editTrackEvent.emit(hackathonTrack);
  }

  deleteTrack(trackId) {
    this.destroyTrackEvent.emit(trackId);
  }
}
