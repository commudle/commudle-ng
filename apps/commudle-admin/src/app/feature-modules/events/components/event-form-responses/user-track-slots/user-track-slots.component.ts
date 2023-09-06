import { Component, Input, OnInit } from '@angular/core';
import { ITrackSlot } from 'apps/shared-models/track-slot.model';

@Component({
  selector: 'commudle-user-track-slots',
  templateUrl: './user-track-slots.component.html',
  styleUrls: ['./user-track-slots.component.scss'],
})
export class UserTrackSlotsComponent implements OnInit {
  @Input() trackSlots: ITrackSlot[];
  constructor() {}

  ngOnInit(): void {
    console.log(this.trackSlots);
  }
}
