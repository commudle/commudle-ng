import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { NbTagComponent, NbTagInputAddEvent } from '@commudle/theme';
import { faClock, faInfo, faPen, faPlusCircle, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'commudle-track-slot-form',
  templateUrl: './track-slot-form.component.html',
  styleUrls: ['./track-slot-form.component.scss'],
})
export class TrackSlotFormComponent implements OnInit {
  @Input() operationType: 'create' | 'edit';
  @Input() trackSlotId;
  @Input() eventLocations;
  trackSlotForm;
  @Input() eventSpeakers;

  icons = {
    faClock,
    faInfo,
    faPen,
    faPlusCircle,
    faTrash,
    faXmark,
  };

  tags: string[] = [];
  constructor(private fb: FormBuilder) {
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

  ngOnInit(): void {}

  addSlot() {
    // this.windowRef.close();
    // const newSlot = this.trackSlotForm.get('track_slot').value;
    // const tagsAsString = this.tags.map((tag) => `${tag}`).join(' ');
    // newSlot.tags_list = tagsAsString;
    // const startTime = moment({
    //   years: newSlot.date.getFullYear(),
    //   months: newSlot.date.getMonth(),
    //   date: newSlot.date.getDate(),
    // });
    // delete newSlot['date'];
    // const sTime = newSlot['start_time'];
    // newSlot['start_time'] = startTime.set({ hour: sTime.getHours(), minute: sTime.getMinutes() }).toDate();
    // const eTime = newSlot['end_time'];
    // newSlot['end_time'] = startTime.set({ hour: eTime.getHours(), minute: eTime.getMinutes() }).toDate();
    // if (newSlot['start_time'] >= newSlot['end_time']) {
    //   this.toastLogService.warningDialog('End time should be greater than Start time!');
    //   return;
    // }
    // this.trackSlotsService.createTrackSlot(newSlot).subscribe((data) => {
    //   this.sortedTrackSlots[data.event_location_track_id].push(data);
    //   this.sortedTrackSlots[data.event_location_track_id] = this.sortTrackSlots(
    //     this.sortedTrackSlots[data.event_location_track_id],
    //   );
    //   this.trackSlotForm.reset();
    //   this.toastLogService.successDialog('Slot Added!');
    //   this.changeDetectorRef.markForCheck();
    //   this.addSession.emit(data);
    // });
  }

  editSlot(trackSlotId) {
    // this.windowRef.close();
    // const slot = this.trackSlotForm.get('track_slot').value;
    // const tagsAsString = this.tags.map((tag) => `${tag}`).join(' ');
    // slot.tags_list = tagsAsString;
    // const startTime = moment({
    //   years: slot.date.getFullYear(),
    //   months: slot.date.getMonth(),
    //   date: slot.date.getDate(),
    // });
    // delete slot['date'];
    // const sTimeNew = slot['start_time'];
    // slot['start_time'] = startTime.set({ hour: sTimeNew.getHours(), minute: sTimeNew.getMinutes() }).toDate();
    // const eTimeNew = slot['end_time'];
    // slot['end_time'] = startTime.set({ hour: eTimeNew.getHours(), minute: eTimeNew.getMinutes() }).toDate();
    // if (slot['start_time'] >= slot['end_time']) {
    //   this.toastLogService.warningDialog('End time should be greater than Start time!');
    //   return;
    // }
    // this.trackSlotsService.updateTrackSlot(slot, trackSlotId).subscribe((data) => {
    //   const eventLocationTrack = this.eventLocationTracks.find((track) =>
    //     track.track_slots.some((slot) => slot.id === trackSlotId),
    //   );
    //   if (eventLocationTrack) {
    //     eventLocationTrack.track_slots = eventLocationTrack.track_slots.map((slot) => {
    //       return slot.id === trackSlotId ? data : slot;
    //     });
    //     this.sortedTrackSlots[eventLocationTrack.id] = this.sortTrackSlots(eventLocationTrack.track_slots);
    //     this.changeDetectorRef.markForCheck();
    //   }
    //   this.updateSession.emit(data);
    //   this.toastLogService.successDialog('Slot Updated!');
    //   this.trackSlotForm.reset();
    //   this.changeDetectorRef.markForCheck();
    // });
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
