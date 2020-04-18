import { Component, OnInit, Input, ViewChild, TemplateRef, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { IEventLocationTrack } from 'projects/shared-models/event-location-track.model';
import * as moment from 'moment';
import { ITrackSlot } from 'projects/shared-models/track-slot.model';
import { faClock, faInfo, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NbWindowService } from '@nebular/theme';
import { FormBuilder, Validators } from '@angular/forms';
import { EventLocationTracksService } from 'projects/commudle-admin/src/app/services/event-location-tracks.service';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';

@Component({
  selector: 'app-event-location-tracks',
  templateUrl: './event-location-tracks.component.html',
  styleUrls: ['./event-location-tracks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventLocationTracksComponent implements OnInit {
  @ViewChild('eventLocationTrackFormTemplate', {static: false}) eventLocationTrackFormTemplate: TemplateRef<any>;
  @ViewChild('deleteEventLocationTrackTemplate', {static: false}) deleteEventLocationTrackTemplate: TemplateRef<any>;
  windowRef;

  faClock = faClock;
  faInfo = faInfo;
  faPlusCircle = faPlusCircle;
  faTrash = faTrash;

  @Input() eventLocationTracks: IEventLocationTrack[];
  @Input() eventId;
  @Input() eventLocationId;
  @Output() addTrack = new EventEmitter();
  @Output() updateTrack = new EventEmitter();
  @Output() removeTrack = new EventEmitter();

  moment = moment;

  hours;
  minutes;

  eventLocationTrackForm = this.fb.group({
    event_location_track: this.fb.group({
      name: ['', Validators.required],
    })
  });

  constructor(
    private windowService: NbWindowService,
    private fb: FormBuilder,
    private toastLogService: LibToastLogService,
    private eventLocationTracksService: EventLocationTracksService,
  ) { }

  ngOnInit() {
    this.hours = [...Array(24).keys()];
    this.minutes = [...Array(60).keys()];
  }

  displayTime(hour, minute) {
    return moment(`${hour}:${minute}`, 'H:m').format('hh:mm A');
  }

  slotSessionHeight(slot: ITrackSlot): number {
    let diff = moment(slot.end_time).diff(slot.start_time, 'minutes');
    return 0.5 * diff;
  }

  slotSessionOffsetFromTop(slot: ITrackSlot): number {
    return ((moment(slot.start_time).hours() * 0.5 * 60 ) + ((moment(slot.start_time).minute()) * 0.5));
  }


  showAddSlotForm(eventLocationTrack) {

  }

  addSlot() {

  }

  editSlotForm() {

  }

  editSlot() {

  }

  deleteSlot() {

  }


  showAddTrackForm() {
    this.windowRef = this.windowService.open(
      this.eventLocationTrackFormTemplate,
      { title: 'Add a track', context: {operationType: 'edit'} },
    );
  }

  createTrack() {
    this.windowRef.close();

    this.eventLocationTracksService.createEventLocationTrack(
      this.eventId,
      this.eventLocationId,
      this.eventLocationTrackForm.get('event_location_track').value
      ).subscribe((data) => {
        this.addTrack.emit(data);
        this.toastLogService.successDialog("New Track Added!");
        this.eventLocationTrackForm.reset();
      });

  }

  showEditTrackForm(eventLocationTrack) {
    this.eventLocationTrackForm.get('event_location_track').patchValue({
      name: eventLocationTrack.name
    });

    this.windowRef = this.windowService.open(
      this.eventLocationTrackFormTemplate,
      { title: `Edit ${eventLocationTrack.name}`, context: {operationType: 'edit', eventLocationTrackId: eventLocationTrack.id} },
    );
  }

  editTrack(eventLocationTrackId) {
    this.windowRef.close();
    this.eventLocationTracksService.updateEventLocationTrack(
      eventLocationTrackId,
      this.eventLocationTrackForm.get('event_location_track').value).subscribe(
        data => {
          this.updateTrack.emit(data);
          this.toastLogService.successDialog(`Updated to ${data.name}`);
          this.eventLocationTrackForm.reset();
        }
      );
  }

  confirmDeleteTrack(eventLocationTrack){
    this.windowRef = this.windowService.open(
      this.deleteEventLocationTrackTemplate,
      { title: `Delete ${eventLocationTrack.name}`, context: {eventLocationTrackId: eventLocationTrack.id} },
    );
  }


  deleteTrack(deleteConf, eventLocationTrackId) {
    if (deleteConf) {
      this.eventLocationTracksService.deleteEventLocationTrack(eventLocationTrackId).subscribe((data)=>{
        this.removeTrack.emit(eventLocationTrackId);
        this.toastLogService.successDialog('Deleted');
      });
    }
    this.windowRef.close();

  }

}
