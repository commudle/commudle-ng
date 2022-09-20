import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { IEvent } from "@commudle/shared-models";
import { IHmsRecording } from "@commudle/shared-modules";
import { EventsService } from "@commudle/shared-services";
import { Subscription } from "rxjs";

@Component({
  selector: "commudle-event-recordings",
  templateUrl: "./event-recordings.component.html",
  styleUrls: ["./event-recordings.component.scss"],
})
export class EventRecordingsComponent implements OnInit, OnDestroy {
  @Input() event: IEvent;

  recordings: IHmsRecording[] = [];

  subscription: Subscription;

  constructor(private eventsService: EventsService) {
    // do nothing
  }

  ngOnInit(): void {
    this.getRecordings();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  getRecordings(): void {
    // this.subscription = this.eventsService.getRecordings(this.event.id).subscribe((value) => {
    //   this.recordings = value;
    // });
  }
}
