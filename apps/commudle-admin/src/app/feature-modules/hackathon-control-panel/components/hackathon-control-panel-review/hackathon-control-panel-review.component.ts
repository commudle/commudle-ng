/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { IHackathonUserResponses } from 'apps/shared-models/hackathon-user-responses.model';
import * as moment from 'moment';
import { RoundService, ToastrService, NoteService } from '@commudle/shared-services';
import { NbDialogRef, NbDialogService } from '@commudle/theme';
import {
  EDbModels,
  EHackathonRegistrationStatus,
  EHackathonRegistrationStatusColor,
  INote,
  IRound,
} from '@commudle/shared-models';
import { IHackathonUserResponse } from 'apps/shared-models/hackathon-user-response.model';
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IHackathon, EHackathonStatus } from 'apps/shared-models/hackathon.model';

@Component({
  selector: 'commudle-hackathon-control-panel-review',
  templateUrl: './hackathon-control-panel-review.component.html',
  styleUrls: ['./hackathon-control-panel-review.component.scss'],
})
export class HackathonControlPanelReviewComponent implements OnInit, OnDestroy {
  userResponses: IHackathonUserResponses[];
  hackathon: IHackathon;
  moment = moment;
  EHackathonRegistrationStatus = EHackathonRegistrationStatus;
  EHackathonRegistrationStatusColor = EHackathonRegistrationStatusColor;
  hackathonRounds: IRound[];
  selectedUserDetails: IHackathonUserResponse;
  faXmark = faXmark;
  faPlus = faPlus;
  notesForm;
  notes: INote[];
  dialogRef: NbDialogRef<unknown>;
  EHackathonStatus = EHackathonStatus;
  roundSelectionForEmail = 0;
  message = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private hackathonService: HackathonService,
    private toastrService: ToastrService,
    private nbDialogService: NbDialogService,
    private roundService: RoundService,
    private noteService: NoteService,
    private fb: FormBuilder,
  ) {
    this.notesForm = this.fb.group({
      note: this.fb.array([]),
    });
  }

  get notesList() {
    return this.notesForm.get('note') as FormArray;
  }

  ngOnInit() {
    this.activatedRoute.parent.paramMap.subscribe((params) => {
      this.fetchUserResponses(params.get('hackathon_id'));
      this.fetchHackathon(params.get('hackathon_id'));
      this.indexRounds(params.get('hackathon_id'));
    });
  }

  fetchHackathon(hackathonId) {
    this.hackathonService.showHackathon(hackathonId).subscribe((data: IHackathon) => {
      this.hackathon = data;
    });
  }

  ngOnDestroy(): void {
    this.dialogRef?.close();
  }

  fetchUserResponses(hackathonId) {
    this.hackathonService.indexUserResponses(hackathonId).subscribe((data: IHackathonUserResponses[]) => {
      this.userResponses = data;
    });
  }

  optionChanged(event, teamId, index) {
    const value = event.target ? event.target.value : event;
    this.hackathonService.changeTeamStatus(teamId, value).subscribe((data) => {
      this.toastrService.successDialog('Details has been updated successfully');
      this.userResponses[index].team = data;
    });
  }

  indexRounds(hackathonId) {
    this.roundService.indexRounds(hackathonId, EDbModels.HACKATHON).subscribe((data: IRound[]) => {
      this.hackathonRounds = data;
    });
  }

  openDialogBox(dialog, teamId, index) {
    this.hackathonService.showUserResponsesByTeam(teamId).subscribe((data: IHackathonUserResponses) => {
      const team = data.team;
      const userResponse = data.user_responses;
      this.notesIndex(data.team.id);
      this.selectedUserDetails = userResponse[0];
      this.dialogRef = this.nbDialogService.open(dialog, {
        context: { team: team, index: index, userResponse: userResponse },
      });
    });
  }

  openRoundSelectionUpdateEmailDialogBox(dialog) {
    this.dialogRef = this.nbDialogService.open(dialog);
  }
  changeRoundOption(event, teamId, index) {
    this.hackathonService.changeTeamRound(teamId, event.target.value).subscribe((data) => {
      this.toastrService.successDialog('Details has been updated successfully');
      this.userResponses[index].team.round = data.round;
    });
  }

  displayUserData(user) {
    this.selectedUserDetails = user;
  }

  addNote(noteText = '') {
    this.notesList.push(this.fb.group({ value: new FormControl(noteText, [Validators.required]) }));
  }

  removeNote(index) {
    this.notesList.removeAt(index);
  }

  updateNotes(teamId) {
    for (const note of this.notesForm.value.note) {
      if (note.value !== '') {
        const formData = new FormData();
        formData.append('note[text]', note.value);
        this.noteService.createNote(formData, EDbModels.HACKATHON_TEAM, teamId).subscribe((data) => {
          for (let index = 0; index < this.notesList.length; index++) {
            this.removeNote(index);
          }
          this.notes.push(data);
        });
      }
    }
  }

  notesIndex(teamId) {
    this.noteService.indexNotes(teamId, EDbModels.HACKATHON_TEAM).subscribe((data) => {
      this.notes = data;
      if (this.notes.length === 0) {
        this.addNote();
      }
    });
  }

  generateTeamRegistrationStatusNotification(teamId) {
    this.hackathonService.generateTeamRegistrationStatusNotification(teamId).subscribe((data) => {
      if (data) {
        this.toastrService.successDialog('Emails sent successfully');
      }
    });
  }

  OverallRoundSelectionUpdateEmail() {
    if (this.roundSelectionForEmail > 0) {
      this.hackathonService
        .OverallRoundSelectionUpdateEmail(this.hackathon.id, this.roundSelectionForEmail, this.message)
        .subscribe((data) => {
          if (data) this.toastrService.successDialog('Emails sent successfully');
        });
    }
  }
}
