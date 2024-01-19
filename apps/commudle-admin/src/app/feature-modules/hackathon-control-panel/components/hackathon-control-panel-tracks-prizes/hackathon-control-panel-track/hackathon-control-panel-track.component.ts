import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@commudle/theme';
import { faPlus, faFileImage, faXmark } from '@fortawesome/free-solid-svg-icons';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { IHackathonTrack } from 'apps/shared-models/hackathon-track.model';

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
    placeholder: 'Write description for hackathon track',
    content_style:
      "@import url('https://fonts.googleapis.com/css?family=Inter'); body {font-family: 'Inter'; font-size: 16px !important;}",
    plugins:
      'emoticons advlist lists autolink link charmap preview anchor image visualblocks code charmap codesample insertdatetime table code help wordcount autoresize media',
    toolbar:
      'h1  h2  h3  h4  h5  h6 fontsize | bold italic backcolor | codesample emoticons | link | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | media code | removeformat | table',
    default_link_target: '_blank',
    branding: false,
    font_size_formats: '12pt 14pt 16pt 18pt 24pt',
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
        describe: track.description,
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
