import { NbDialogService } from '@commudle/theme';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlus, faFileImage, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { IHackathonSponsor } from 'apps/shared-models/hackathon-sponsor';
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
    faFileImage,
    faXmark,
  };
  imagePreview: string;

  hackathonSponsors: IHackathonSponsor[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private nbDialogService: NbDialogService,
    private fb: FormBuilder,
    private hackathonService: HackathonService,
  ) {
    this.sponsorForm = this.fb.group({
      name: ['', Validators.required],
      description: '',
      logo: [null, Validators.required],
      tier_name: ['', Validators.required],
      link: ['', this.urlValidator],
      tier_priority: [1, Validators.required],
    });
  }

  ngOnInit() {
    this.activatedRoute.parent.paramMap.subscribe((params) => {
      this.hackathonSlug = params.get('hackathon_id');
      this.indexSponsors(params.get('hackathon_id'));
    });
  }

  urlValidator(control) {
    if (control.value && !/^https?:\/\//.test(control.value)) {
      return { invalidUrl: true };
    }
    return null;
  }

  openSponsorDialogBox(dialog, hackathonSponsor?: IHackathonSponsor, index?) {
    this.imagePreview = '';
    if (hackathonSponsor) {
      this.sponsorForm.patchValue({
        name: hackathonSponsor.sponsor.name,
        description: hackathonSponsor.sponsor.description,
        logo: [null, Validators.required],
        tier_name: hackathonSponsor.tier_name,
        link: hackathonSponsor.sponsor.link,
        tier_priority: hackathonSponsor.tier_priority,
      });
      this.imagePreview = hackathonSponsor.sponsor.logo.url;
    }

    this.nbDialogService.open(dialog, {
      context: { index: index, sponsor: hackathonSponsor },
    });
  }

  openConfirmDeleteDialogBox(dialog, sponsorId, index) {
    this.nbDialogService.open(dialog, {
      context: { index: index, sponsorId: sponsorId },
    });
  }

  indexSponsors(hackathonId) {
    this.hackathonService.indexSponsors(hackathonId).subscribe((data: IHackathonSponsor[]) => {
      this.hackathonSponsors = data;
    });
  }

  onFileChange(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.sponsorForm.patchValue({
      logo: file,
    });
    this.sponsorForm.get('logo').updateValueAndValidity();

    // Display image preview
    this.previewImage(file);
  }

  previewImage(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  removeBannerImage() {
    this.imagePreview = '';
    this.sponsorForm.patchValue({
      logo: '',
    });
  }

  createSponsor() {
    const formData = new FormData();

    Object.keys(this.sponsorForm.value).forEach((key) => {
      const value = this.sponsorForm.value[key];

      if (value instanceof File) {
        formData.append('sponsor[' + key + ']', value, value.name); // Append the file with its name
      } else if (key !== 'logo') {
        formData.append('sponsor[' + key + ']', value);
      }
    });
    this.hackathonService.createSponsor(formData, this.hackathonSlug).subscribe((data) => {
      if (data) this.hackathonSponsors.unshift(data);
      this.sponsorForm.reset();
    });
  }

  destroySponsor(sponsor, index) {
    this.hackathonService.destroySponsor(this.hackathonSponsors[index].id).subscribe((data) => {
      if (data) this.hackathonSponsors.splice(index, 1);
    });
  }

  updateSponsor(sponsorId, index) {
    const formData = new FormData();

    Object.keys(this.sponsorForm.value).forEach((key) => {
      const value = this.sponsorForm.value[key];

      if (value instanceof File) {
        formData.append('sponsor[' + key + ']', value, value.name); // Append the file with its name
      } else if (key !== 'logo') {
        formData.append('sponsor[' + key + ']', value);
      }
    });
    this.hackathonService.updateSponsor(formData, sponsorId).subscribe((data) => {
      if (data) this.hackathonSponsors[index] = data;
      this.sponsorForm.reset();
    });
  }
}
