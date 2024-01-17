import { countries_details } from '@commudle/shared-services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@commudle/theme';
import { faPlus, faFileImage, faXmark } from '@fortawesome/free-solid-svg-icons';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { IHackathonPrize } from 'apps/shared-models/hackathon-prize.model';
import { IHackathonTrack } from 'apps/shared-models/hackathon-track.model';
import { IHackathon } from 'apps/shared-models/hackathon.model';

@Component({
  selector: 'commudle-hackathon-control-panel-prize',
  templateUrl: './hackathon-control-panel-prize.component.html',
  styleUrls: ['./hackathon-control-panel-prize.component.scss'],
})
export class HackathonControlPanelPrizeComponent implements OnInit {
  prizeForm: FormGroup;
  hackathonTracks: IHackathonTrack[];
  hackathon: IHackathon;
  icons = {
    faPlus,
    faFileImage,
    faXmark,
  };
  hackathonPrizes: IHackathonPrize[];
  countryDetails = countries_details;

  tinyMCE = {
    min_height: 200,
    menubar: false,
    convert_urls: false,
    placeholder: 'Write description for Prize',
    content_style:
      "@import url('https://fonts.googleapis.com/css?family=Inter'); body {font-family: 'Inter'; font-size: 16px !important;}",
    plugins:
      'emoticons advlist lists autolink link charmap preview anchor image visualblocks code charmap codesample insertdatetime table code help wordcount autoresize media',
    toolbar:
      'bold italic backcolor | codesample emoticons | link | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | media code | removeformat | table',
    default_link_target: '_blank',
    branding: false,
  };

  constructor(
    private nbDialogService: NbDialogService,
    private fb: FormBuilder,
    private hackathonService: HackathonService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.prizeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      no_of_winners: ['', Validators.required],
      prize_amount: ['', Validators.required],
      currency_type: ['₹', Validators.required],
      order: ['', Validators.required],
      hackathon_track_id: '',
      hackathon_id: '',
    });
  }

  ngOnInit() {
    this.activatedRoute.parent.parent.paramMap.subscribe((params) => {
      this.fetchTracks(params.get('hackathon_id'));
      this.fetchPrizes(params.get('hackathon_id'));
      this.fetchHackathon(params.get('hackathon_id'));
    });
  }

  fetchHackathon(hackathonId) {
    this.hackathonService.showHackathon(hackathonId).subscribe((data: IHackathon) => {
      this.hackathon = data;
    });
  }

  fetchTracks(hackathonId) {
    this.hackathonService.indexTracks(hackathonId).subscribe((data: IHackathonTrack[]) => {
      this.hackathonTracks = data;
    });
  }

  fetchPrizes(hackathonId) {
    this.hackathonService.getPrizesByHackathon(hackathonId).subscribe((data) => {
      this.hackathonPrizes = data;
    });
  }

  openSponsorDialogBox(dialog, prize?: IHackathonPrize, index?) {
    // this.prizeForm.reset();
    if (prize) {
      this.prizeForm.patchValue({
        name: prize.name,
        describe: prize.description,
        no_of_winners: prize.no_of_winners,
        prize_amount: prize.prize_amount,
      });
    }
    this.prizeForm.patchValue({
      order: this.hackathonPrizes.length + 1,
      hackathon_id: this.hackathon.id,
    });
    this.nbDialogService.open(dialog, {
      context: { index: index, prize: prize },
    });
  }

  createPrize() {
    this.hackathonService.createPrize(this.prizeForm.value).subscribe((data) => {
      console.log('🚀 ~ HackathonControlPanelPrizeComponent ~ this.hackathonService.createPrize ~ data:', data);
    });
  }

  updatePrize(id, index) {
    console.log('🚀 ~ HackathonControlPanelPrizeComponent ~ updatePrize ~ id, index:', id, index);
  }
}
