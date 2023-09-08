import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService, NbTagComponent, NbTagInputAddEvent, NbWindowService } from '@commudle/theme';
import { faClock, faInfo, faPen, faPlusCircle, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { TrackSlotFormComponent } from 'apps/commudle-admin/src/app/feature-modules/events/components/event-locations/event-location-tracks/track-slot-form/track-slot-form.component';
import { EventLocationTracksService } from 'apps/commudle-admin/src/app/services/event-location-tracks.service';
import { TrackSlotsService } from 'apps/commudle-admin/src/app/services/track_slots.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { EEmbeddedVideoStreamSources } from 'apps/shared-models/enums/embedded_video_stream_sources.enum';
import { IEventLocationTrack } from 'apps/shared-models/event-location-track.model';
import { EEventType, IEventLocation } from 'apps/shared-models/event-location.model';
import { IEvent } from 'apps/shared-models/event.model';
import { ITrackSlot } from 'apps/shared-models/track-slot.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-event-location-tracks',
  templateUrl: './event-location-tracks.component.html',
  styleUrls: ['./event-location-tracks.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventLocationTracksComponent implements OnInit {
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
  faXmark = faXmark;
  EEventType = EEventType;
  eventLocation: IEventLocation;
  EEmbeddedVideoStreamSources = EEmbeddedVideoStreamSources;
  tags: string[] = [];

  moment = moment;
  minSlotDate;
  hours;
  minutes;
  timeBlocks = [];
  eventLocationTrackForm;
  trackSlotForm;

  trackSlotVisibility = {};
  sortedTrackSlots = {};
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
    private changeDetectorRef: ChangeDetectorRef,
    private dialogService: NbDialogService,
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
        track_slot_speaker_registration_ids: this.fb.array([]),
      }),
    });
  }

  ngOnInit() {
    this.setTrackVisibility();
    const visibility = this.eventLocationTracks.length <= 2;
    for (const event_location_track of this.eventLocationTracks) {
      this.trackSlotVisibility[event_location_track.id] = visibility;
      this.sortedTrackSlots[event_location_track.id] = this.sortTrackSlots(event_location_track.track_slots);
    }
    this.minSlotDate = moment(this.event.start_time).toDate();
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

  showAddSlotForm(eventLocationTrack, startTime, eventLocTrack) {
    this.trackSlotForm.reset();
    const dialogRef = this.dialogService.open(TrackSlotFormComponent, {
      context: {
        operationType: 'create',
        eventLocations: this.eventLocations,
        eventSpeakers: this.eventSpeakers,
        startTime: startTime,
        eventLocTrack: eventLocTrack,
        minSlotDate: this.minSlotDate,
      },
    });
    dialogRef.componentRef.instance.createFormOutput.subscribe((data) => {
      this.addSlot(data);
      dialogRef.close();
    });
  }

  addSlot(data) {
    this.sortedTrackSlots[data.event_location_track_id].push(data);
    this.sortedTrackSlots[data.event_location_track_id] = this.sortTrackSlots(
      this.sortedTrackSlots[data.event_location_track_id],
    );

    this.trackSlotForm.reset();
    this.toastLogService.successDialog('Slot Added!');
    this.changeDetectorRef.markForCheck();
    this.addSession.emit(data);
  }

  showEditSlotForm(trackSlot) {
    const dialogRef = this.dialogService.open(TrackSlotFormComponent, {
      context: {
        operationType: 'edit',
        eventLocations: this.eventLocations,
        eventSpeakers: this.eventSpeakers,
        minSlotDate: this.minSlotDate,
        trackSlot: trackSlot,
      },
    });
    dialogRef.componentRef.instance.editFormOutput.subscribe((data) => {
      this.editSlot(data, trackSlot.id);
      dialogRef.close();
    });
  }

  editSlot(data, trackSlotId) {
    const eventLocationTrack = this.eventLocationTracks.find((track) =>
      track.track_slots.some((slot) => slot.id === trackSlotId),
    );
    if (eventLocationTrack) {
      eventLocationTrack.track_slots = eventLocationTrack.track_slots.map((slot) => {
        return slot.id === trackSlotId ? data : slot;
      });
      this.sortedTrackSlots[eventLocationTrack.id] = this.sortTrackSlots(eventLocationTrack.track_slots);
      this.changeDetectorRef.markForCheck();
    }
    this.updateSession.emit(data);
    this.toastLogService.successDialog('Slot Updated!');
    this.trackSlotForm.reset();
    this.changeDetectorRef.markForCheck();
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
        this.sortedTrackSlots[trackSlot.event_location_track_id] = this.sortedTrackSlots[
          trackSlot.event_location_track_id
        ].filter((slot) => slot.id !== trackSlot.id);
        this.changeDetectorRef.markForCheck();
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
        this.setTrackVisibility();
        this.toastLogService.successDialog('New Track Added!');
        this.eventLocationTrackForm.reset();
        this.changeDetectorRef.markForCheck();
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
        this.changeDetectorRef.markForCheck();
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
        this.changeDetectorRef.markForCheck();
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

  setTrackVisibility() {
    const visibility = this.eventLocationTracks.length <= 2;
    for (const event_location_track of this.eventLocationTracks) {
      this.trackSlotVisibility[event_location_track.id] = visibility;
      this.sortedTrackSlots[event_location_track.id] = this.sortTrackSlots(event_location_track.track_slots);
    }
  }

  changeTrackSlotVisibility(visibility, id) {
    this.trackSlotVisibility[id] = visibility;
  }

  sortTrackSlots(track_slots) {
    const sortedTrackSlots = _.sortBy(track_slots, (slot) => {
      // @ts-ignore
      return new moment(slot.start_time);
    });
    return sortedTrackSlots;
  }

  addTag(tag: string): void {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
    }
  }

  restrictComma(event) {
    if (event.code === 'Comma') {
      event.preventDefault();
    }
  }

  onTagAdd({ value, input }: NbTagInputAddEvent): void {
    if (value) {
      if (!this.tags.includes(value)) {
        this.tags.push(value);
      }
    }
    input.nativeElement.value = '';
  }

  onTagRemove(tagToRemove: NbTagComponent): void {
    this.tags = this.tags.filter((tag) => tag !== tagToRemove.text);
  }

  speakerSelected(event, index) {
    const selectedSpeakerId = Number(event.target.value);
    const speakerIdsArray = this.trackSlotForm.get('track_slot.track_slot_speaker_registration_ids') as FormArray;
    speakerIdsArray.at(index).setValue(selectedSpeakerId);
  }

  addSpeakerDropdown() {
    const speakerControl = this.fb.control('');
    const speakerIdsArray = this.trackSlotForm.get('track_slot.track_slot_speaker_registration_ids') as FormArray;
    speakerIdsArray.push(speakerControl);
  }

  addSpeakerToDropdown(value) {
    const speakerIdsArray = this.trackSlotForm.get('track_slot.track_slot_speaker_registration_ids') as FormArray;
    speakerIdsArray.push(this.fb.control(value));
  }

  removeSpeakerDropdown(index: number) {
    const speakerIdsArray = this.trackSlotForm.get('track_slot.track_slot_speaker_registration_ids') as FormArray;

    // Check if the index is valid before attempting to remove the control.
    if (index >= 0 && index < speakerIdsArray.length) {
      speakerIdsArray.removeAt(index);
    }
  }

  removeAllDropdowns() {
    const speakerIdsArray = this.trackSlotForm.get('track_slot.track_slot_speaker_registration_ids') as FormArray;
    while (speakerIdsArray.length > 0) {
      speakerIdsArray.removeAt(0);
    }
  }
}
