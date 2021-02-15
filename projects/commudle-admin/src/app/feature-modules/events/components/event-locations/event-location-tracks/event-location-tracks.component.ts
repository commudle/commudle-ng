import { Component, OnInit, Input, ViewChild, TemplateRef, EventEmitter, Output, ElementRef } from '@angular/core';
import { IEventLocationTrack } from 'projects/shared-models/event-location-track.model';
import * as moment from 'moment';
import { ITrackSlot } from 'projects/shared-models/track-slot.model';
import { faClock, faInfo, faPlusCircle, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { NbWindowService } from '@nebular/theme';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EventLocationTracksService } from 'projects/commudle-admin/src/app/services/event-location-tracks.service';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { IEventLocation, EEventType } from 'projects/shared-models/event-location.model';
import { TrackSlotsService } from 'projects/commudle-admin/src/app/services/track_slots.service';
import { EEmbeddedVideoStreamSources } from 'projects/shared-models/enums/embedded_video_stream_sources.enum';
import { DomSanitizer } from '@angular/platform-browser';
import { ICommunity } from 'projects/shared-models/community.model';
import { IEvent } from 'projects/shared-models/event.model';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-event-location-tracks',
  templateUrl: './event-location-tracks.component.html',
  styleUrls: ['./event-location-tracks.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventLocationTracksComponent implements OnInit {
  @ViewChild('eventLocationTrackFormTemplate') eventLocationTrackFormTemplate: TemplateRef<any>;
  @ViewChild('deleteEventLocationTrackTemplate') deleteEventLocationTrackTemplate: TemplateRef<any>;
  @ViewChild('trackSlotFormTemplate') trackSlotFormTemplate: TemplateRef<any>;
  @ViewChild('deleteTrackSlotTemplate') deleteTrackSlotTemplate: TemplateRef<any>;
  @ViewChild('tracksContainer') private tracksContainer: ElementRef;
  windowRef;

  formControlA;
  formControlB;

  faClock = faClock;
  faInfo = faInfo;
  faPlusCircle = faPlusCircle;
  faTrash = faTrash;
  faPen = faPen;
  EEventType = EEventType;
  eventLocation: IEventLocation;
  EEmbeddedVideoStreamSources = EEmbeddedVideoStreamSources;

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
      speaker_registration_id: ['']
    })
  });

  constructor(
    private windowService: NbWindowService,
    private fb: FormBuilder,
    private toastLogService: LibToastLogService,
    private eventLocationTracksService: EventLocationTracksService,
    private trackSlotsService: TrackSlotsService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.hours = [...Array(24).keys()];
    this.minutes = [...Array(60).keys()];
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
    let diff = moment(slot.end_time).diff(slot.start_time, 'minutes');
    return (0.5 * diff) + 2.5;
  }

  slotSessionOffsetFromTop(slot: ITrackSlot): number {
    return ((moment(slot.start_time).hours() * 0.5 * 60 ) + ((moment(slot.start_time).minute()) * 0.5) + 2.5);
  }

  scrollFromTop() {
    if (this.eventLocationTracks && this.eventLocationTracks.length > 0 && this.eventLocationTracks[0].track_slots.length > 0) {
     this.tracksContainer.nativeElement.scrollTop = ((moment(this.eventLocationTracks[0].track_slots[0].start_time).hours()) * 0.5 * 950);
    }
  }


  showAddSlotForm(eventLocationTrack, hour, minute) {
    this.trackSlotForm.reset();
        //     let sTime = moment(this.event.start_time).toDate();
        // let eTime = moment(this.event.end_time).toDate();
      console.log("clicked")
    // this.trackSlotForm.get('track_slot').patchValue({
    //   event_location_track_id: eventLocationTrack.id,
    //   date: this.minSlotDate,
    //   start_time: moment(`${hour}:${minute}`, 'H:m').format('HH:mm'),
    //   end_time: moment(`${hour}:${minute+5}`, 'H:m').format('HH:mm')
    // });

    // let sTime = moment(`${hour}:${minute}`, 'H:m').format('HH:mm');
    // let eTime = moment(`${hour}:${minute+5}`, 'H:m').format('HH:mm');
    let sTime = new Date();
    let eTime = new Date();
    sTime.setHours(hour);
    sTime.setMinutes(minute);

    eTime.setHours(hour);
    eTime.setMinutes(minute+5);
    
    // this.initialDate = sTime;
    // this.finalDate = eTime;
    this.formControlA = new FormControl(sTime);
    this.formControlB = new FormControl(eTime);

      this.trackSlotForm.get('track_slot').patchValue({
      event_location_track_id: eventLocationTrack.id,
      date: this.minSlotDate,
      start_time: sTime,
      end_time: eTime
    });

    // console.log(this.formControlA, this.formControlB);



    this.windowRef = this.windowService.open(
      this.trackSlotFormTemplate,
      { title: 'Add a session', context: {operationType: 'create'}},
    );

    console.log(this.windowRef);

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
    // const sTime = newSlot['start_time'].split(':');
    const sTime = newSlot['start_time'];
    newSlot['start_time'] = startTime.set({hour: sTime.getHours(), minute: sTime.getMinutes()}).toDate();

    // const eTime = newSlot['end_time'].split(':');
    const eTime = newSlot['end_time'];
    newSlot['end_time'] = startTime.set({hour: eTime.getHours(), minute: eTime.getMinutes}).toDate();

    console.log("--------", newSlot);


    this.trackSlotsService.createTrackSlot(newSlot).subscribe((data) => {
      this.addSession.emit(data);
      this.toastLogService.successDialog("Slot Added!");
      this.trackSlotForm.reset();
    });
  }

  showEditSlotForm(trackSlot) 
  {
    console.log(trackSlot);
    this.trackSlotForm.reset();
    let sTime = trackSlot['start_time'];
    let eTime = trackSlot['end_time'];
    let sTimeArr = sTime.split('T')[1].split(':');
    let eTimeArr = eTime.split('T')[1].split(':');
    let sTimeHour = parseInt(sTimeArr[0]);
    let sTimeMinute = parseInt(sTimeArr[1]);
    let eTimeHour = parseInt(eTimeArr[0]);
    let eTimeMinute = parseInt(eTimeArr[1]);
    let o = new Date();
    console.log(o);
    console.log(moment(sTime).toDate());

    let sTimeNew = new Date();
    let eTimeNew = new Date();
    sTimeNew.setHours(sTimeHour);
    sTimeNew.setMinutes(sTimeMinute);

    eTimeNew.setHours(eTimeHour);
    eTimeNew.setMinutes(eTimeMinute);
    console.log(sTimeNew,"--",eTimeNew);


    this.formControlA = new FormControl(sTimeNew);
    this.formControlB = new FormControl(eTimeNew);

    let trackDate = moment(trackSlot.start_time).toDate();

    this.trackSlotForm.get('track_slot').patchValue({
      event_location_track_id: trackSlot.event_location_track_id,
      date: trackDate,
      start_time: sTimeNew,
      end_time: eTimeNew,
      session_title: trackSlot.session_title,
      tags_list: trackSlot.tags_list,
      speaker_registration_id: trackSlot.speaker_registration_id
    });

    if (trackSlot.embedded_video_stream) {
      this.trackSlotForm.get('track_slot').patchValue({
        embedded_video_stream: trackSlot.embedded_video_stream
      });
    }
    console.log(this.trackSlotForm);

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
    const sTimeNew = slot['start_time'];
    slot['start_time'] = startTime.set({hour: sTimeNew.getHours(), minute: sTimeNew.getMinutes()}).toDate();

    const eTimeNew = slot['end_time'];
    slot['end_time'] = startTime.set({hour: eTimeNew.getHours(), minute: eTimeNew.getMinutes()}).toDate();

    console.log("--------", slot);


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
    this.eventLocationTrackForm.reset();
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
    this.eventLocationTrackForm.reset();
    this.eventLocationTrackForm.get('event_location_track').patchValue({
      name: eventLocationTrack.name
    });

    if (eventLocationTrack.embedded_video_stream) {
      this.eventLocationTrackForm.get('event_location_track').patchValue({
        embedded_video_stream: eventLocationTrack.embedded_video_stream
      });
    }

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

  findLocation() {
    const location = this.eventLocations.find(el => el.id === this.eventLocationId);
    if (location.event_type === EEventType.ONLINE_ONLY ) {
      (this.eventLocationTrackForm.controls.event_location_track as FormGroup).addControl(
        'embedded_video_stream', this.fb.group({
          source: [''],
          embed_code: [''],
          zoom_host_email: ['', Validators.email],
          zoom_password: ['']
        })
      );

      (this.trackSlotForm.controls.track_slot as FormGroup).addControl(
        'embedded_video_stream', this.fb.group({
          source: [''],
          embed_code: [''],
          zoom_host_email: ['', Validators.email],
          zoom_password: ['']
        })
      );
    }
    this.eventLocation = location;
  }


  sanitizedEmbeddedHTML(val) {
    return  this.sanitizer.bypassSecurityTrustHtml(val);
   }


  updateTrackSlotFormZoomValidators() {
    if (this.trackSlotForm.get('track_slot').get('embedded_video_stream').get('source').value === EEmbeddedVideoStreamSources.ZOOM) {
      this.trackSlotForm.get('track_slot').get('embedded_video_stream').get('zoom_host_email').setValidators([Validators.required, Validators.email]);
      this.trackSlotForm.get('track_slot').get('embedded_video_stream').get('zoom_password').setValidators(Validators.required);
    } else {
      this.trackSlotForm.get('track_slot').get('embedded_video_stream').get('zoom_host_email').clearValidators();
      this.trackSlotForm.get('track_slot').get('embedded_video_stream').get('zoom_password').clearValidators();
    }

    this.trackSlotForm.get('track_slot').get('embedded_video_stream').get('zoom_host_email').updateValueAndValidity();
    this.trackSlotForm.get('track_slot').get('embedded_video_stream').get('zoom_password').updateValueAndValidity();
  }



  updateEventLocationTrackFormZoomValidators() {
    if (this.eventLocationTrackForm.get('event_location_track').get('embedded_video_stream').get('source').value === EEmbeddedVideoStreamSources.ZOOM) {
      this.eventLocationTrackForm.get('event_location_track').get('embedded_video_stream').get('zoom_host_email').setValidators([Validators.required, Validators.email]);
      this.eventLocationTrackForm.get('event_location_track').get('embedded_video_stream').get('zoom_password').setValidators(Validators.required);
    } else {
      this.eventLocationTrackForm.get('event_location_track').get('embedded_video_stream').get('zoom_host_email').clearValidators();
      this.eventLocationTrackForm.get('event_location_track').get('embedded_video_stream').get('zoom_password').clearValidators();
    }

    this.eventLocationTrackForm.get('event_location_track').get('embedded_video_stream').get('zoom_host_email').updateValueAndValidity();
    this.eventLocationTrackForm.get('event_location_track').get('embedded_video_stream').get('zoom_password').updateValueAndValidity();
  }


}
