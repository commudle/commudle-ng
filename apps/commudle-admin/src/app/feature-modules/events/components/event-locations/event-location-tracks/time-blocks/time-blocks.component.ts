import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgZone, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-time-blocks',
  templateUrl: './time-blocks.component.html',
  styleUrls: ['./time-blocks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeBlocksComponent implements OnInit {
  @Input() timeBlocks;
  @Input() event;
  @Input() lt;
  @Output() addSlotForm = new EventEmitter<object>();

  constructor(private _ngZone: NgZone) {}

  ngOnInit(): void {}

  log(event: any) {
    const hour = (event.layerY - 42) / 190;
    this.showAddSlotForm(this.lt, hour, 0);
  }

  showAddSlotForm(eventLocationTrack, hour, minute) {
    this._ngZone.runOutsideAngular(() => {
      const sTime = new Date();
      const eTime = new Date();
      sTime.setHours(hour);
      sTime.setMinutes(minute);

      eTime.setHours(hour);
      eTime.setMinutes(minute + 30);

      this.addSlotForm.emit({ eventLocationTrack, sTime, eTime });
    });
  }
}
