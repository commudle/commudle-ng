import { Component, Input, NgZone, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-time-blocks',
  templateUrl: './time-blocks.component.html',
  styleUrls: ['./time-blocks.component.scss'],
})
export class TimeBlocksComponent implements OnInit {
  @Input() timeBlocks;
  @Input() event;
  @Input() lt;
  @Output() addSlotForm = new EventEmitter<object>();

  constructor(private _ngZone: NgZone) {}

  ngOnInit(): void {}

  showAddSlotForm(eventLocationTrack, hour, minute) {
    this._ngZone.runOutsideAngular(() => {
      let sTime = new Date();
      let eTime = new Date();
      sTime.setHours(hour);
      sTime.setMinutes(minute);

      eTime.setHours(hour);
      eTime.setMinutes(minute + 5);

      this.addSlotForm.emit({ eventLocationTrack, sTime, eTime });
    });
  }
}
