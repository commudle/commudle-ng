import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '@commudle/shared-models';
import { NbDialogService } from '@commudle/theme';
import { AppUsersService } from 'apps/commudle-admin/src/app/services/app-users.service';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { IHackathonJudge } from 'apps/shared-models/hackathon-judge.model';
import { faFileImage, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'commudle-hackathon-control-panel-speaker-judge',
  templateUrl: './hackathon-control-panel-speaker-judge.component.html',
  styleUrls: ['./hackathon-control-panel-speaker-judge.component.scss'],
})
export class HackathonControlPanelSpeakerJudgeComponent implements OnInit {
  fetchSpeakerJudge: FormGroup;
  speakerRegistrationForm: FormGroup;
  imageUrl: string;
  imageBlob: Blob;
  judges: IHackathonJudge[];
  icons = {
    faFileImage,
    faXmark,
  };
  hackathonSlug = '';
  @ViewChild('judgeForm', { static: true }) judgeFormDialog: TemplateRef<any>;

  constructor(
    private fb: FormBuilder,
    private hackathonService: HackathonService,
    private dialogService: NbDialogService,
    private appUsersService: AppUsersService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
  ) {
    this.fetchSpeakerJudge = this.fb.group({
      email: ['', Validators.required],
    });

    this.speakerRegistrationForm = this.fb.group({
      name: ['', Validators.required],
      about: ['', Validators.required],
      email: ['', Validators.required],
      company: ['', Validators.required],
      designation: ['', Validators.required],
      username: ['', Validators.required],
      twitter: ['', this.urlValidator],
      linkedin: ['', this.urlValidator],
      website: ['', this.urlValidator],
    });
  }

  ngOnInit() {
    this.activatedRoute.parent.parent.paramMap.subscribe((params) => {
      this.hackathonSlug = params.get('hackathon_id');
      this.indexJudges(params.get('hackathon_id'));
    });
  }

  urlValidator(control) {
    if (control.value && !/^(http|https)/.test(control.value)) {
      return { invalidUrl: true };
    }
    return null;
  }

  indexJudges(hackathonId) {
    this.hackathonService.indexJudge(hackathonId).subscribe((data: IHackathonJudge[]) => {
      this.judges = data;
    });
  }

  fetchSpeakerJudgeDetails() {
    this.appUsersService.getProfileByEmail(this.fetchSpeakerJudge.get('email').value).subscribe((data: IUser) => {
      this.speakerRegistrationForm.reset();
      if (data) {
        if (data.photo.url) {
          this.imageUrl = data.photo.url;
          this.fetchImageBlob();
        }
        this.speakerRegistrationForm.patchValue({
          name: data.name,
          about: data.about_me,
          email: data.email,
          designation: data.designation,
          twitter: data.twitter ? data.twitter : '',
          linkedin: data.linkedin ? data.linkedin : '',
          website: data.personal_website ? data.personal_website : '',
          username: data.username,
        });
      }
      this.dialogService.open(this.judgeFormDialog);
      this.fetchSpeakerJudge.reset();
    });
  }

  openEditJudgeDialogBox(dialog, judge: IHackathonJudge, index) {
    this.speakerRegistrationForm.patchValue({
      name: judge.name,
      about: judge.about,
      email: judge.email,
      designation: judge.designation,
      twitter: judge.twitter ? judge.twitter : '',
      linkedin: judge.linkedin ? judge.linkedin : '',
      website: judge.website ? judge.website : '',
      username: judge.username,
      company: judge.company,
    });
    this.imageUrl = judge.profile_image?.url;

    this.dialogService.open(dialog, {
      context: { index: index, judge: judge },
    });
  }

  fetchImageBlob() {
    this.http.get(this.imageUrl, { responseType: 'blob' }).subscribe((blob: Blob) => {
      this.imageBlob = blob;
    });
  }

  createJudge() {
    const formData = new FormData();
    const formValue: Record<string, string | Blob> = this.speakerRegistrationForm.value;

    // Append form values to formData
    Object.entries(formValue).forEach(([key, value]) => {
      formData.append(`hackathon_judge[${key}]`, value);
    });

    if (this.imageUrl.length > 0) {
      formData.append('profile_image', this.imageBlob);
    }

    this.hackathonService.createJudge(formData, this.hackathonSlug).subscribe((data: IHackathonJudge) => {
      this.judges.unshift(data);
    });
  }

  onImageChange(event: any) {
    this.imageBlob = null;
    const file = event.target.files[0];

    if (file) {
      this.imageBlob = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = '';
        this.imageUrl = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }

  updateJudge(JudgeId, index) {
    const formData = new FormData();
    const formValue: Record<string, string | Blob> = this.speakerRegistrationForm.value;

    // Append form values to formData
    Object.entries(formValue).forEach(([key, value]) => {
      formData.append(`hackathon_judge[${key}]`, value);
    });

    if (this.imageUrl.length > 0) {
      formData.append('profile_image', this.imageBlob);
    }

    this.hackathonService.updateJudge(formData, JudgeId).subscribe((data: IHackathonJudge) => {
      this.judges[index] = data;
    });
  }

  removeBannerImage() {
    this.imageUrl = '';
    this.imageBlob = null;
  }

  confirmDeleteDialogBox(dialog, judgeId, index) {
    this.dialogService.open(dialog, {
      context: { index: index, judgeId: judgeId },
    });
  }

  destroyJudge(JudgeId, index) {
    this.hackathonService.destroyJudge(JudgeId).subscribe((data) => {
      if (data) this.judges.splice(index, 1);
    });
  }
}
