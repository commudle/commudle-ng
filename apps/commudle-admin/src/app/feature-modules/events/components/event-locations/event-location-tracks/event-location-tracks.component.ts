import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NbWindowService } from '@commudle/theme';
import { faClock, faInfo, faPen, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { EventLocationTracksService } from 'apps/commudle-admin/src/app/services/event-location-tracks.service';
import { TrackSlotsService } from 'apps/commudle-admin/src/app/services/track_slots.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { EEmbeddedVideoStreamSources } from 'apps/shared-models/enums/embedded_video_stream_sources.enum';
import { IEventLocationTrack } from 'apps/shared-models/event-location-track.model';
import { EEventType, IEventLocation } from 'apps/shared-models/event-location.model';
import { IEvent } from 'apps/shared-models/event.model';
import { ITrackSlot } from 'apps/shared-models/track-slot.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import * as moment from 'moment';

@Component({
  selector: 'app-event-location-tracks',
  templateUrl: './event-location-tracks.component.html',
  styleUrls: ['./event-location-tracks.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventLocationTracksComponent implements OnInit, AfterViewInit {
  @Input() eventLocations: IEventLocation[] = [];
  @Input() eventLocationTracks: IEventLocationTrack[] = [];
  @Input() event: IEvent;
  @Input() community: ICommunity;
  @Input() eventLocationId;
  @Input() eventSpeakers;
  @Output() addTrack = new EventEmitter();
  @Output() updateTrack = new EventEmitter();
  @Output() removeTrack = new EventEmitter();
  @Output() addSession = new EventEmitter();
  @Output() updateSession = new EventEmitter();
  @Output() removeSession = new EventEmitter();

  windowRef;
  eventStartTimePicker;
  eventEndTimePicker;
  faClock = faClock;
  faInfo = faInfo;
  faPlusCircle = faPlusCircle;
  faTrash = faTrash;
  faPen = faPen;
  EEventType = EEventType;
  eventLocation: IEventLocation;
  EEmbeddedVideoStreamSources = EEmbeddedVideoStreamSources;

  moment = moment;
  minSlotDate;
  hours;
  minutes;
  timeBlocks = [];
  eventLocationTrackForm;
  trackSlotForm;
  @ViewChild('eventLocationTrackFormTemplate') eventLocationTrackFormTemplate: TemplateRef<any>;
  @ViewChild('deleteEventLocationTrackTemplate') deleteEventLocationTrackTemplate: TemplateRef<any>;
  @ViewChild('trackSlotFormTemplate') trackSlotFormTemplate: TemplateRef<any>;
  @ViewChild('deleteTrackSlotTemplate') deleteTrackSlotTemplate: TemplateRef<any>;
  @ViewChild('tracksContainer') private tracksContainer: ElementRef;

  constructor(
    private windowService: NbWindowService,
    private fb: FormBuilder,
    private toastLogService: LibToastLogService,
    private eventLocationTracksService: EventLocationTracksService,
    private trackSlotsService: TrackSlotsService,
    private sanitizer: DomSanitizer,
    private _ngZone: NgZone,
  ) {
    this.eventLocationTrackForm = this.fb.group({
      event_location_track: this.fb.group({
        name: ['', Validators.required],
      }),
    });
    this.trackSlotForm = this.fb.group({
      track_slot: this.fb.group({
        event_location_track_id: ['', Validators.required],
        date: [new Date(), Validators.required],
        start_time: [new Date(), Validators.required],
        end_time: [new Date(), Validators.required],
        session_title: ['', Validators.required],
        tags_list: [''],
        speaker_registration_id: [''],
      }),
    });
  }

  ngOnInit() {
    this._ngZone.runOutsideAngular(() => {
      [...Array(24).keys()].forEach((h) => {
        [...Array(60).keys()].forEach((m) => {
          if (m === 0) {
            this.timeBlocks.push({
              hour: h,
              minute: m,
              display: this.displayTime(h, m),
            });
          }
        });
      });
    });

    this.findLocation();
    this.minSlotDate = moment(this.event.start_time).toDate();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.scrollFromTop();
  }

  displayTime(hour, minute) {
    return moment(`${hour}:${minute}`, 'H:m').format('hh:mm A');
  }

  slotSessionHeight(slot: ITrackSlot): number {
    const diff = moment(slot.end_time).diff(slot.start_time, 'minutes');
    return 0.2 * diff;
  }

  slotSessionOffsetFromTop(slot: ITrackSlot): number {
    return moment(slot.start_time).hours() * 0.2 * 60 + moment(slot.start_time).minute() * 0.2 + 2.5;
  }

  scrollFromTop() {
    if (
      this.eventLocationTracks &&
      this.eventLocationTracks.length > 0 &&
      this.eventLocationTracks[0].track_slots.length > 0
    ) {
      this.tracksContainer.nativeElement.scrollTop =
        moment(this.eventLocationTracks[0].track_slots[0].start_time).hours() * 0.2 * 950;
    }
  }

  showAddSlotForm(eventLocationTrack, hour, minute) {
    this._ngZone.runOutsideAngular(() => {
      this.trackSlotForm.reset();

      const sTime = new Date();
      const eTime = new Date();
      sTime.setHours(hour);
      sTime.setMinutes(minute);

      eTime.setHours(hour);
      eTime.setMinutes(minute + 5);

      // @ts-ignore
      this.trackSlotForm.get('track_slot').patchValue({
        event_location_track_id: eventLocationTrack.id,
        date: this.minSlotDate,
        start_time: sTime,
        end_time: eTime,
      });

      this.windowRef = this.windowService.open(this.trackSlotFormTemplate, {
        title: 'Add a session',
        context: { operationType: 'create' },
      });
    });
  }

  addSlot() {
    this.windowRef.close();
    const newSlot = this.trackSlotForm.get('track_slot').value;
    const startTime = moment({
      years: newSlot.date.getFullYear(),
      months: newSlot.date.getMonth(),
      date: newSlot.date.getDate(),
    });

    delete newSlot['date'];
    // const sTime = newSlot['start_time'].split(':');
    const sTime = newSlot['start_time'];
    newSlot['start_time'] = startTime.set({ hour: sTime.getHours(), minute: sTime.getMinutes() }).toDate();

    // const eTime = newSlot['end_time'].split(':');
    const eTime = newSlot['end_time'];
    newSlot['end_time'] = startTime.set({ hour: eTime.getHours(), minute: eTime.getMinutes() }).toDate();

    if (newSlot['start_time'] >= newSlot['end_time']) {
      this.toastLogService.warningDialog('End time should be greater than Start time!');
      return;
    }

    this.trackSlotsService.createTrackSlot(newSlot).subscribe((data) => {
      this.addSession.emit(data);
      this.toastLogService.successDialog('Slot Added!');
      this.trackSlotForm.reset();
    });
  }

  showEditSlotForm(trackSlot) {
    this.trackSlotForm.reset();
    const sTime = trackSlot['start_time'];
    const eTime = trackSlot['end_time'];
    const sTimeArr = sTime.split('T')[1].split(':');
    const eTimeArr = eTime.split('T')[1].split(':');
    const sTimeHour = parseInt(sTimeArr[0]);
    const sTimeMinute = parseInt(sTimeArr[1]);
    const eTimeHour = parseInt(eTimeArr[0]);
    const eTimeMinute = parseInt(eTimeArr[1]);

    const sTimeNew = new Date();
    const eTimeNew = new Date();
    sTimeNew.setHours(sTimeHour);
    sTimeNew.setMinutes(sTimeMinute);

    eTimeNew.setHours(eTimeHour);
    eTimeNew.setMinutes(eTimeMinute);

    const trackDate = moment(trackSlot.start_time).toDate();

    this.trackSlotForm.get('track_slot').patchValue({
      event_location_track_id: trackSlot.event_location_track_id,
      // @ts-ignore
      date: trackDate,
      // @ts-ignore
      start_time: sTimeNew,
      // @ts-ignore
      end_time: eTimeNew,
      session_title: trackSlot.session_title,
      tags_list: trackSlot.tags_list,
      speaker_registration_id: trackSlot.speaker_registration_id,
    });

    if (trackSlot.embedded_video_stream) {
      this.trackSlotForm.get('track_slot').patchValue({
        // @ts-ignore
        embedded_video_stream: trackSlot.embedded_video_stream,
      });
    }

    this.windowRef = this.windowService.open(this.trackSlotFormTemplate, {
      title: 'Edit Session',
      context: { operationType: 'edit', trackSlotId: trackSlot.id },
    });
  }

  editSlot(trackSlotId) {
    this.windowRef.close();
    const slot = this.trackSlotForm.get('track_slot').value;
    const startTime = moment({
      years: slot.date.getFullYear(),
      months: slot.date.getMonth(),
      date: slot.date.getDate(),
    });

    delete slot['date'];
    const sTimeNew = slot['start_time'];
    slot['start_time'] = startTime.set({ hour: sTimeNew.getHours(), minute: sTimeNew.getMinutes() }).toDate();

    const eTimeNew = slot['end_time'];
    slot['end_time'] = startTime.set({ hour: eTimeNew.getHours(), minute: eTimeNew.getMinutes() }).toDate();

    if (slot['start_time'] >= slot['end_time']) {
      this.toastLogService.warningDialog('End time should be greater than Start time!');
      return;
    }

    this.trackSlotsService.updateTrackSlot(slot, trackSlotId).subscribe((data) => {
      this.updateSession.emit(data);
      this.toastLogService.successDialog('Slot Updated!');
      this.trackSlotForm.reset();
    });
  }

  confirmDeleteSlot(trackSlot) {
    this.windowRef = this.windowService.open(this.deleteTrackSlotTemplate, {
      title: `Delete ${trackSlot.session_title}`,
      context: { trackSlot },
    });
  }

  deleteSlot(deleteConf, trackSlot) {
    if (deleteConf) {
      this.trackSlotsService.deleteTrackSlot(trackSlot.id).subscribe((data) => {
        this.removeSession.emit(trackSlot);
        this.toastLogService.successDialog('Deleted');
      });
    }
    this.windowRef.close();
  }

  showAddTrackForm() {
    this.eventLocationTrackForm.reset();
    this.windowRef = this.windowService.open(this.eventLocationTrackFormTemplate, {
      title: 'Add a track',
      context: { operationType: 'create' },
    });
  }

  createTrack() {
    this.windowRef.close();

    this.eventLocationTracksService
      .createEventLocationTrack(
        this.event.id,
        this.eventLocationId,
        this.eventLocationTrackForm.get('event_location_track').value,
      )
      .subscribe((data) => {
        this.addTrack.emit(data);
        this.toastLogService.successDialog('New Track Added!');
        this.eventLocationTrackForm.reset();
      });
  }

  showEditTrackForm(eventLocationTrack) {
    this.eventLocationTrackForm.reset();
    this.eventLocationTrackForm.get('event_location_track').patchValue({
      name: eventLocationTrack.name,
    });

    if (eventLocationTrack.embedded_video_stream) {
      this.eventLocationTrackForm.get('event_location_track').patchValue({
        // @ts-ignore
        embedded_video_stream: eventLocationTrack.embedded_video_stream,
      });
    }

    this.windowRef = this.windowService.open(this.eventLocationTrackFormTemplate, {
      title: `Edit ${eventLocationTrack.name}`,
      context: { operationType: 'edit', eventLocationTrackId: eventLocationTrack.id },
    });
  }

  editTrack(eventLocationTrackId) {
    this.windowRef.close();
    this.eventLocationTracksService
      .updateEventLocationTrack(eventLocationTrackId, this.eventLocationTrackForm.get('event_location_track').value)
      .subscribe((data) => {
        this.updateTrack.emit(data);
        this.toastLogService.successDialog(`Updated to ${data.name}`);
        this.eventLocationTrackForm.reset();
      });
  }

  confirmDeleteTrack(eventLocationTrack) {
    this.windowRef = this.windowService.open(this.deleteEventLocationTrackTemplate, {
      title: `Delete ${eventLocationTrack.name}`,
      context: { eventLocationTrackId: eventLocationTrack.id },
    });
  }

  deleteTrack(deleteConf, eventLocationTrackId) {
    if (deleteConf) {
      this.eventLocationTracksService.deleteEventLocationTrack(eventLocationTrackId).subscribe((data) => {
        this.removeTrack.emit(eventLocationTrackId);
        this.toastLogService.successDialog('Deleted');
      });
    }
    this.windowRef.close();
  }

  findLocation() {
    const location = this.eventLocations.find((el) => el.id === this.eventLocationId);
    if (location.event_type === EEventType.ONLINE_ONLY) {
      (this.eventLocationTrackForm.controls.event_location_track as FormGroup).addControl(
        'embedded_video_stream',
        this.fb.group({
          source: [''],
          embed_code: [''],
          zoom_host_email: ['', Validators.email],
          zoom_password: [''],
        }),
      );

      (this.trackSlotForm.controls.track_slot as FormGroup).addControl(
        'embedded_video_stream',
        this.fb.group({
          source: [''],
          embed_code: [''],
          zoom_host_email: ['', Validators.email],
          zoom_password: [''],
        }),
      );
    }
    this.eventLocation = location;
  }

  sanitizedEmbeddedHTML(val) {
    return this.sanitizer.bypassSecurityTrustHtml(val);
  }

  updateTrackSlotFormZoomValidators() {
    if (
      this.trackSlotForm.get('track_slot').get('embedded_video_stream').get('source').value ===
      EEmbeddedVideoStreamSources.ZOOM
    ) {
      this.trackSlotForm
        .get('track_slot')
        .get('embedded_video_stream')
        .get('zoom_host_email')
        .setValidators([Validators.required, Validators.email]);
      this.trackSlotForm
        .get('track_slot')
        .get('embedded_video_stream')
        .get('zoom_password')
        .setValidators(Validators.required);
    } else {
      this.trackSlotForm.get('track_slot').get('embedded_video_stream').get('zoom_host_email').clearValidators();
      this.trackSlotForm.get('track_slot').get('embedded_video_stream').get('zoom_password').clearValidators();
    }

    this.trackSlotForm.get('track_slot').get('embedded_video_stream').get('zoom_host_email').updateValueAndValidity();
    this.trackSlotForm.get('track_slot').get('embedded_video_stream').get('zoom_password').updateValueAndValidity();
  }

  updateEventLocationTrackFormZoomValidators() {
    if (
      this.eventLocationTrackForm.get('event_location_track').get('embedded_video_stream').get('source').value ===
      EEmbeddedVideoStreamSources.ZOOM
    ) {
      this.eventLocationTrackForm
        .get('event_location_track')
        .get('embedded_video_stream')
        .get('zoom_host_email')
        .setValidators([Validators.required, Validators.email]);
      this.eventLocationTrackForm
        .get('event_location_track')
        .get('embedded_video_stream')
        .get('zoom_password')
        .setValidators(Validators.required);
    } else {
      this.eventLocationTrackForm
        .get('event_location_track')
        .get('embedded_video_stream')
        .get('zoom_host_email')
        .clearValidators();
      this.eventLocationTrackForm
        .get('event_location_track')
        .get('embedded_video_stream')
        .get('zoom_password')
        .clearValidators();
    }

    this.eventLocationTrackForm
      .get('event_location_track')
      .get('embedded_video_stream')
      .get('zoom_host_email')
      .updateValueAndValidity();
    this.eventLocationTrackForm
      .get('event_location_track')
      .get('embedded_video_stream')
      .get('zoom_password')
      .updateValueAndValidity();
  }

  trackByFn(index, item) {
    return item.id; // or item.id
  }
}
