import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IEvent } from 'projects/shared-models/event.model';
import { EEventStatuses } from 'projects/shared-models/enums/event_statuses.enum';
import { EventsService } from 'projects/commudle-admin/src/app/services/events.service';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';


@Component({
  selector: 'app-event-status',
  templateUrl: './event-status.component.html',
  styleUrls: ['./event-status.component.scss']
})
export class EventStatusComponent implements OnInit {
  @Input() event: IEvent;
  @Output() updatedEventStatus = new EventEmitter();

  eventStatuses = [];


  constructor(
    private eventsService: EventsService,
    private toastLogService: LibToastLogService
  ) { }

  ngOnInit() {
    for (let k of Object.keys(EEventStatuses)) {
      this.eventStatuses.push(EEventStatuses[k]);
    }
  }


  updateStatus(selectedStatusName) {
    this.eventsService.updateStatus(this.event.id, selectedStatusName).subscribe(
      data => {
        this.updatedEventStatus.emit(data);
        this.toastLogService.successDialog('Status Updated!');
      }
    );
  }

}
