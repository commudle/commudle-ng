import { NbDialogService } from '@commudle/theme';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { ISponsor } from 'apps/shared-models/sponsor.model';
@Component({
  selector: 'commudle-hackathon-control-panel-sponsor',
  templateUrl: './hackathon-control-panel-sponsor.component.html',
  styleUrls: ['./hackathon-control-panel-sponsor.component.scss'],
})
export class HackathonControlPanelSponsorComponent implements OnInit {
  sponsorForm: FormGroup;
  hackathonSlug = '';
  icons = {
    faPlus,
  };

  sponsors: ISponsor[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private nbDialogService: NbDialogService,
    private fb: FormBuilder,
    private hackathonService: HackathonService,
  ) {
    this.sponsorForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      // logo: [File, Validators.required],
      tier_name: ['', Validators.required],
      link: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.activatedRoute.parent.paramMap.subscribe((params) => {
      this.hackathonSlug = params.get('hackathon_id');
      this.indexSponsors(params.get('hackathon_id'));
    });
  }

  openSponsorDialogBox(dialog) {
    this.nbDialogService.open(dialog);
  }

  indexSponsors(hackathonId) {
    this.hackathonService.indexSponsors(hackathonId).subscribe((data: ISponsor[]) => {
      this.sponsors = data;
    });
  }

  createSponsor() {
    this.hackathonService.createSponsor(this.sponsorForm.value, this.hackathonSlug).subscribe((data) => {
      if (data) this.sponsors.unshift(data);
    });
  }
}
