import { Component, Input, OnInit } from '@angular/core';
import { ICommunity, IEvent, IUser } from '@commudle/shared-models';
import { NbDialogService } from '@commudle/theme';
import { TrackSlotFormComponent } from 'apps/commudle-admin/src/app/feature-modules/events/components/event-locations/event-location-tracks/track-slot-form/track-slot-form.component';
import { EventLocationsService } from 'apps/commudle-admin/src/app/services/event-locations.service';
import { IEventLocation } from 'apps/shared-models/event-location.model';
import { ITrackSlot } from 'apps/shared-models/track-slot.model';
import * as moment from 'moment';

@Component({
  selector: 'commudle-user-track-slots',
  templateUrl: './user-track-slots.component.html',
  styleUrls: ['./user-track-slots.component.scss'],
})
export class UserTrackSlotsComponent implements OnInit {
  @Input() trackSlots: ITrackSlot[];
  @Input() speakers;
  @Input() event: IEvent;
  @Input() community: ICommunity;
  eventLocations: IEventLocation[];
  moment = moment;
  constructor(private dialogService: NbDialogService, private eventLocationsService: EventLocationsService) {}
  speaker: IUser[] = [];
  minSlotDate;

  ngOnInit(): void {
    for (const speaker of this.speakers) {
      if (speaker.registration_status.name === 'confirmed') {
        this.speaker.push(speaker);
      }
    }
    this.minSlotDate = moment(this.event.start_time).toDate();
    this.getEventLocations();
  }

  getEventLocations() {
    this.eventLocationsService.getEventLocations(this.event.slug).subscribe((data) => {
      this.eventLocations = data.event_locations;
      for (const eventLocation of this.eventLocations) {
        for (const eventLocationTrack of eventLocation.event_location_tracks) {
          for (const trackSlot of this.trackSlots) {
            if (trackSlot.event_location_track_id === eventLocationTrack.id) {
              trackSlot.event_location_track_name = eventLocationTrack.name;
            }
          }
        }
      }
    });
  }

  editTrackSlot(trackSlot, index) {
    const dialogRef = this.dialogService.open(TrackSlotFormComponent, {
      context: {
        operationType: 'edit',
        eventLocations: this.eventLocations,
        eventSpeakers: this.speaker,
        minSlotDate: this.minSlotDate,
        trackSlot: trackSlot,
      },
    });
    dialogRef.componentRef.instance.editFormOutput.subscribe((data) => {
      this.trackSlots[index] = data;
      dialogRef.close();
    });
  }

  showAddSlotForm() {
    const dialogRef = this.dialogService.open(TrackSlotFormComponent, {
      context: {
        operationType: 'create',
        eventLocations: this.eventLocations,
        eventSpeakers: this.speaker,
        eventLocTrack: this.eventLocations,
        startTime: this.minSlotDate,
        minSlotDate: this.minSlotDate,
      },
    });
    dialogRef.componentRef.instance.createFormOutput.subscribe((data) => {
      this.trackSlots.unshift(data);
      dialogRef.close();
    });
  }
}
