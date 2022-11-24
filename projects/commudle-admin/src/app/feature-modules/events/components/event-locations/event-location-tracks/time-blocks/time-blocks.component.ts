import { Component, Input, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-blocks',
  templateUrl: './time-blocks.component.html',
  styleUrls: ['./time-blocks.component.scss'],
})
export class TimeBlocksComponent implements OnInit {
  @Input() timeBlocks;
  @Input() event;
  constructor(private _ngZone: NgZone) {}

  ngOnInit(): void {}

  showAddSlotForm(eventLocationTrack, hour, minute) {
    this._ngZone.runOutsideAngular(() => {
      // this.trackSlotForm.reset();

      let sTime = new Date();
      let eTime = new Date();
      sTime.setHours(hour);
      sTime.setMinutes(minute);

      eTime.setHours(hour);
      eTime.setMinutes(minute + 5);

      // this.trackSlotForm.get('track_slot').patchValue({
      //   event_location_track_id: eventLocationTrack.id,
      //   date: this.minSlotDate,
      //   start_time: sTime,
      //   end_time: eTime,
      // });

      // this.windowRef = this.windowService.open(this.trackSlotFormTemplate, {
      //   title: 'Add a session',
      //   context: { operationType: 'create' },
      // });
    });
  }
}
