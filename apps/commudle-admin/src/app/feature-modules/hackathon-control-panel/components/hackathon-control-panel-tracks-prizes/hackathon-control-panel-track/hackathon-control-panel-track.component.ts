import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IHackathonTrack } from '@commudle/shared-models';
import { NbDialogService } from '@commudle/theme';
import { faPlus, faFileImage, faXmark } from '@fortawesome/free-solid-svg-icons';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';

@Component({
  selector: 'commudle-hackathon-control-panel-track',
  templateUrl: './hackathon-control-panel-track.component.html',
  styleUrls: ['./hackathon-control-panel-track.component.scss'],
})
export class HackathonControlPanelTrackComponent implements OnInit {
  trackForm: FormGroup;

  icons = {
    faPlus,
    faFileImage,
    faXmark,
  };
  hackathonTracks: IHackathonTrack[];
  hackathonSlug = '';

  tinyMCE = {
    min_height: 200,
    menubar: false,
    convert_urls: false,
    placeholder: 'About',
    content_style:
      "@import url('https://fonts.googleapis.com/css?family=Inter'); body {font-family: 'Inter'; font-size: 16px !important;}",
    plugins: 'emoticons lists preview table autoresize media',
    toolbar: 'bullist numlist emoticons bold italic | backcolor  media table',
    default_link_target: '_blank',
    branding: false,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private nbDialogService: NbDialogService,
    private fb: FormBuilder,
    private hackathonService: HackathonService,
  ) {
    this.trackForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      problem_statement: '',
    });
  }

  ngOnInit() {
    this.activatedRoute.parent.parent.paramMap.subscribe((params) => {
      this.hackathonSlug = params.get('hackathon_id');
      this.indexTracks(params.get('hackathon_id'));
    });
  }

  openSponsorDialogBox(dialog, track?: IHackathonTrack, index?) {
    this.trackForm.reset();
    if (track) {
      this.trackForm.patchValue({
        name: track.name,
        description: track.description,
        problem_statement: track.problem_statement,
      });
    }
    this.nbDialogService.open(dialog, {
      context: { index: index, track: track },
    });
  }

  confirmDeleteDialogBox(dialog, trackId, index) {
    this.nbDialogService.open(dialog, {
      context: { index: index, trackId: trackId },
    });
  }

  indexTracks(hackathonId) {
    this.hackathonService.indexTracks(hackathonId).subscribe((data: IHackathonTrack[]) => {
      this.hackathonTracks = data;
    });
  }

  createTrack() {
    this.hackathonService.createTrack(this.trackForm.value, this.hackathonSlug).subscribe((data) => {
      if (data) this.hackathonTracks.unshift(data);
      this.trackForm.reset();
    });
  }

  updateTrack(trackId, index) {
    this.hackathonService.updateTrack(this.trackForm.value, trackId).subscribe((data) => {
      this.hackathonTracks[index] = data;
    });
  }

  destroyTrack(trackId, index) {
    this.hackathonService.destroyTrack(trackId).subscribe((data) => {
      if (data) this.hackathonTracks.splice(index, 1);
    });
  }
}
