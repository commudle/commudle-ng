import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { IHackathonUserResponses } from 'apps/shared-models/hackathon-user-responses.model';
import {
  EHackathonRegistrationStatus,
  EHackathonRegistrationStatusColor,
} from 'apps/shared-models/hackathon-team.model';
import * as moment from 'moment';
import { RoundService, ToastrService, NoteService } from '@commudle/shared-services';
import { NbDialogService } from '@commudle/theme';
import { EDbModels, INote, IRound } from '@commudle/shared-models';
import { IHackathonUserResponse } from 'apps/shared-models/hackathon-user-response.model';
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'commudle-hackathon-control-panel-review',
  templateUrl: './hackathon-control-panel-review.component.html',
  styleUrls: ['./hackathon-control-panel-review.component.scss'],
})
export class HackathonControlPanelReviewComponent implements OnInit {
  userResponses: IHackathonUserResponses[];

  moment = moment;
  EHackathonRegistrationStatus = EHackathonRegistrationStatus;
  EHackathonRegistrationStatusColor = EHackathonRegistrationStatusColor;
  hackathonRounds: IRound[];
  selectedUserDetails: IHackathonUserResponse;
  faXmark = faXmark;
  faPlus = faPlus;
  notesForm;
  notes: INote[];
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
      this.indexRounds(params.get('hackathon_id'));
      this.addNote();
    });
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
      this.nbDialogService.open(dialog, {
        context: { team: team, index: index, userResponse: userResponse },
      });
    });
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
        const formData: any = new FormData();
        formData.append('note[text]', note.value);
        this.noteService.createNote(formData, EDbModels.HACKATHON_TEAM, teamId);
      }
    }
  }

  notesIndex(teamId) {
    this.noteService.indexNotes(teamId, EDbModels.HACKATHON_TEAM).subscribe((data) => {
      this.notes = data;
    });
  }

  generateTeamRegistrationStatus(teamId) {
    this.hackathonService.generateTeamRegistrationStatus(teamId).subscribe((data) => {
      if (data) {
        this.toastrService.notificationDialog('Email Sent');
      }
    });
  }
}
