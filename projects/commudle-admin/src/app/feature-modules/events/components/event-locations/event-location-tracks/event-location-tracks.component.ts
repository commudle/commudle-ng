import { Component, OnInit, Input, ViewChild, TemplateRef, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { IEventLocationTrack } from 'projects/shared-models/event-location-track.model';
import * as moment from 'moment';
import { ITrackSlot } from 'projects/shared-models/track-slot.model';
import { faClock, faInfo, faPlusCircle, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { NbWindowService } from '@nebular/theme';
import { FormBuilder, Validators } from '@angular/forms';
import { EventLocationTracksService } from 'projects/commudle-admin/src/app/services/event-location-tracks.service';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { DataFormEntityResponseGroupsService } from 'projects/commudle-admin/src/app/services/data-form-entity-response-groups.service';
import { IDataFormEntityResponseGroup } from 'projects/shared-models/data_form_entity_response_group.model';
import { IEventLocation } from 'projects/shared-models/event-location.model';
import { TrackSlotsService } from 'projects/commudle-admin/src/app/services/track_slots.service';

@Component({
  selector: 'app-event-location-tracks',
  templateUrl: './event-location-tracks.component.html',
  styleUrls: ['./event-location-tracks.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventLocationTracksComponent implements OnInit {
  @ViewChild('eventLocationTrackFormTemplate', {static: false}) eventLocationTrackFormTemplate: TemplateRef<any>;
  @ViewChild('deleteEventLocationTrackTemplate', {static: false}) deleteEventLocationTrackTemplate: TemplateRef<any>;
  @ViewChild('trackSlotFormTemplate', {static: false}) trackSlotFormTemplate: TemplateRef<any>;
  @ViewChild('deleteTrackSlotTemplate', {static: false}) deleteTrackSlotTemplate: TemplateRef<any>;
  windowRef;

  faClock = faClock;
  faInfo = faInfo;
  faPlusCircle = faPlusCircle;
  faTrash = faTrash;
  faPen = faPen;

  @Input() eventLocations: IEventLocation[];
  @Input() eventLocationTracks: IEventLocationTrack[];
  @Input() event;
  @Input() eventLocationId;
  @Input() eventSpeakers;
  @Output() addTrack = new EventEmitter();
  @Output() updateTrack = new EventEmitter();
  @Output() removeTrack = new EventEmitter();
  @Output() addSession = new EventEmitter();
  @Output() updateSession = new EventEmitter();
  @Output() removeSession = new EventEmitter();


  moment = moment;

  minSlotDate;

  hours;
  minutes;


  eventLocationTrackForm = this.fb.group({
    event_location_track: this.fb.group({
      name: ['', Validators.required],
    })
  });

  trackSlotForm = this.fb.group({
    track_slot: this.fb.group({
      event_location_track_id: ['', Validators.required],
      date: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      session_title: ['', Validators.required],
      tags_list: [''],
      speaker_registration_id: ['', Validators.required]
    })
  });

  constructor(
    private windowService: NbWindowService,
    private fb: FormBuilder,
    private toastLogService: LibToastLogService,
    private eventLocationTracksService: EventLocationTracksService,
    private trackSlotsService: TrackSlotsService
  ) { }

  ngOnInit() {
    this.hours = [...Array(24).keys()];
    this.minutes = [...Array(60).keys()];

    this.minSlotDate = moment(this.event.start_date).toDate();
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


  showAddSlotForm(eventLocationTrack, hour, minute) {

    this.trackSlotForm.get('track_slot').patchValue({
      event_location_track_id: eventLocationTrack.id,
      date: this.minSlotDate,
      start_time: moment(`${hour}:${minute}`, 'H:m').format('HH:mm'),
      end_time: moment(`${hour}:${minute+5}`, 'H:m').format('HH:mm')
    });

    this.windowRef = this.windowService.open(
      this.trackSlotFormTemplate,
      { title: 'Add a session', context: {operationType: 'create'}},
    );

  }

  addSlot() {
    this.windowRef.close();
    const newSlot = this.trackSlotForm.get('track_slot').value;
    let startTime = moment({
      years: newSlot.date.getFullYear(),
      months: newSlot.date.getMonth(),
      date: newSlot.date.getDate(),
    });

    delete newSlot['date'];
    const sTime = newSlot['start_time'].split(':');
    newSlot['start_time'] = startTime.set({hour: sTime[0], minute: sTime[1]}).toDate();

    const eTime = newSlot['end_time'].split(':');
    newSlot['end_time'] = startTime.set({hour: eTime[0], minute: eTime[1]}).toDate();

    this.trackSlotsService.createTrackSlot(newSlot).subscribe((data) => {
      this.addSession.emit(data);
      this.toastLogService.successDialog("Slot Added!");
      this.trackSlotForm.reset();
    });
  }

  showEditSlotForm(trackSlot) {
    this.trackSlotForm.get('track_slot').patchValue({
      event_location_track_id: trackSlot.event_location_track_id,
      date: moment(trackSlot.start_time).toDate(),
      start_time: moment(trackSlot.start_time).format('HH:mm'),
      end_time: moment(trackSlot.end_time).format('HH:mm'),
      session_title: trackSlot.session_title,
      tags_list: trackSlot.tags_list,
      speaker_registration_id: trackSlot.speaker_registration_id
    });

    this.windowRef = this.windowService.open(
      this.trackSlotFormTemplate,
      { title: 'Edit Session', context: {operationType: 'edit', trackSlotId: trackSlot.id}},
    );
  }

  editSlot(trackSlotId) {
    this.windowRef.close();
    const slot = this.trackSlotForm.get('track_slot').value;
    let startTime = moment({
      years: slot.date.getFullYear(),
      months: slot.date.getMonth(),
      date: slot.date.getDate(),
    });

    delete slot['date'];
    const sTime = slot['start_time'].split(':');
    slot['start_time'] = startTime.set({hour: sTime[0], minute: sTime[1]}).toDate();

    const eTime = slot['end_time'].split(':');
    slot['end_time'] = startTime.set({hour: eTime[0], minute: eTime[1]}).toDate();

    this.trackSlotsService.updateTrackSlot(slot, trackSlotId).subscribe((data) => {
      this.updateSession.emit(data);
      this.toastLogService.successDialog("Slot Updated!");
      this.trackSlotForm.reset();
    });
  }

  confirmDeleteSlot(trackSlot) {
    this.windowRef = this.windowService.open(
      this.deleteTrackSlotTemplate,
      { title: `Delete ${trackSlot.session_title}`, context: { trackSlot } },
    );
  }


  deleteSlot(deleteConf, trackSlot) {
    if (deleteConf) {
      this.trackSlotsService.deleteTrackSlot(trackSlot.id).subscribe((data)=>{
        this.removeSession.emit(trackSlot);
        this.toastLogService.successDialog('Deleted');
      });
    }
    this.windowRef.close();
  }



  showAddTrackForm() {
    this.windowRef = this.windowService.open(
      this.eventLocationTrackFormTemplate,
      { title: 'Add a track', context: {operationType: 'create'} },
    );
  }

  createTrack() {
    this.windowRef.close();

    this.eventLocationTracksService.createEventLocationTrack(
      this.event.id,
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
