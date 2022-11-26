import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ITrackSlot } from 'projects/shared-models/track-slot.model';
import * as moment from 'moment';

@Component({
  selector: 'app-track-slots',
  templateUrl: './track-slots.component.html',
  styleUrls: ['./track-slots.component.scss'],
})
export class TrackSlotsComponent implements OnInit {
  @Input() slots;
  @Input() event;
  @Output() editSlotForm = new EventEmitter<any>();
  @Output() deleteSlot = new EventEmitter<any>();

  moment = moment;

  constructor() {}

  ngOnInit(): void {}

  slotSessionHeight(slot: ITrackSlot): number {
    let diff = moment(slot.end_time).diff(slot.start_time, 'minutes');
    return 0.2 * diff;
  }

  slotSessionOffsetFromTop(slot: ITrackSlot): number {
    return moment(slot.start_time).hours() * 0.2 * 60 + moment(slot.start_time).minute() * 0.2 + 2.5;
  }
}
