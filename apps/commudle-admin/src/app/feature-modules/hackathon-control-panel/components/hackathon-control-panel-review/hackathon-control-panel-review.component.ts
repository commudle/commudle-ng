/* eslint-disable @nx/enforce-module-boundaries */
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
  EInvitationStatus,
  IHackathonTeam,
  IHackathonUserResponse,
  INote,
  IRound,
} from '@commudle/shared-models';
import { faXmark, faPlus, faCheck, faUpRightFromSquare, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IHackathon, EHackathonStatus } from 'apps/shared-models/hackathon.model';
import { HackathonUserResponsesService } from 'apps/commudle-admin/src/app/services/hackathon-user-responses.service';
import { HackathonOverallRoundSelectionUpdateEmailComponent } from 'apps/commudle-admin/src/app/feature-modules/hackathon-control-panel/components/hackathon-control-panel-emails/hackathon-overall-round-selection-update-email/hackathon-overall-round-selection-update-email.component';

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
  faCheck = faCheck;
  faUpRightFromSquare = faUpRightFromSquare;
  faEnvelope = faEnvelope;
  notesForm;
  notes: INote[];
  dialogRef: NbDialogRef<unknown>;
  EHackathonStatus = EHackathonStatus;
  roundSelectionForEmail = 0;
  message = '';
  selectedTeamDetails: IHackathonTeam;
  selectedUserResponsesDetails: IHackathonUserResponse[];
  communityId: string | number;
  EInvitationStatus = EInvitationStatus;
  selectedResponse;

  tinyMCE = {
    height: 200,
    menubar: false,
    convert_urls: false,
    content_style:
      "@import url('https://fonts.googleapis.com/css?family=Inter'); body {font-family: 'Inter'; font-size: 16px !important;}",
    plugins: [
      'advlist',
      'autolink',
      'lists',
      'link',
      'image',
      'charmap',
      'preview',
      'anchor',
      'searchreplace',
      'visualblocks',
      'code',
      'fullscreen',
      'insertdatetime',
      'media',
      'table',
      'code',
      'help',
      'wordcount',
    ],
    toolbar:
      'h2  h3  h4  h5 fontsize | undo redo | formatselect | bold italic backcolor forecolor | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat | help',
    font_size_formats: '8px 10px 12px 14px 16px 18px 20px 22px 24px',
    license_key: 'gpl',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private hackathonService: HackathonService,
    private toastrService: ToastrService,
    private nbDialogService: NbDialogService,
    private roundService: RoundService,
    private noteService: NoteService,
    private fb: FormBuilder,
    private hurService: HackathonUserResponsesService,
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
      this.communityId = params.get('community_id');
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
      this.selectedTeamDetails = data;
    });
  }

  indexRounds(hackathonId) {
    this.roundService.indexRounds(hackathonId, EDbModels.HACKATHON).subscribe((data: IRound[]) => {
      this.hackathonRounds = data;
    });
  }

  openDialogBox(dialog, teamId, index) {
    this.hackathonService.showUserResponsesByTeam(teamId).subscribe((data: IHackathonUserResponses) => {
      this.selectedTeamDetails = data.team;
      this.selectedUserResponsesDetails = data.user_responses;
      this.notesIndex(data.team.id);
      this.selectedUserDetails = this.selectedUserResponsesDetails[0];
      this.getQuestionAnswer();
      this.dialogRef = this.nbDialogService.open(dialog, {
        context: { team: this.selectedTeamDetails, index: index, userResponse: this.selectedUserResponsesDetails },
      });
    });
  }
  getQuestionAnswer() {
    this.selectedResponse = [];
    this.hurService.getDataFormResponses(this.selectedUserDetails.id).subscribe((data) => {
      this.selectedResponse = data;
    });
  }

  openRoundSelectionUpdateEmailDialogBox() {
    this.dialogRef = this.nbDialogService.open(HackathonOverallRoundSelectionUpdateEmailComponent, {
      context: {
        hackathonId: this.hackathon.id,
      },
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
    this.getQuestionAnswer();
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
    });
  }

  generateTeamRegistrationStatusNotification(teamId) {
    this.hackathonService.generateTeamRegistrationStatusNotification(teamId).subscribe((data) => {
      if (data) {
        this.selectedTeamDetails.acceptance_mail_sent = true;
        this.toastrService.successDialog('Emails are being delivered!');
        this.selectedTeamDetails.acceptance_mail_sent = true;
      }
    });
  }

  OverallRoundSelectionUpdateEmail() {
    if (this.roundSelectionForEmail > 0) {
      this.hackathonService
        .OverallRoundSelectionUpdateEmail(this.hackathon.id, this.roundSelectionForEmail, this.message)
        .subscribe((data) => {
          if (data) this.toastrService.successDialog('Emails are being delivered!');
        });
    }
  }

  destroyNote(noteId, index) {
    this.noteService.destroyNote(noteId).subscribe((data) => {
      if (data) this.notes.splice(index, 1);
    });
  }

  sendTeamDetailsCsv() {
    this.hackathonService.sendTeamDetailCsv(this.hackathon.id).subscribe((data) => {
      if (data) {
        this.toastrService.successDialog('CSV is being generated, it will be emailed to you shortly!');
      }
    });
  }
}
