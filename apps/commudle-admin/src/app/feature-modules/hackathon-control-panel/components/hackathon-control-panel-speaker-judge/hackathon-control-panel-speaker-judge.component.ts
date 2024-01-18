import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '@commudle/shared-models';
import { NbDialogService } from '@commudle/theme';
import { AppUsersService } from 'apps/commudle-admin/src/app/services/app-users.service';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { IHackathonJudge } from 'apps/shared-models/hackathon-judge.model';
import { faFileImage } from '@fortawesome/free-solid-svg-icons';
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
  judge: IHackathonJudge;
  icons = {
    faFileImage,
  };
  @ViewChild('speakerForm', { static: true }) speakerFormDialog: TemplateRef<any>;
  constructor(
    private fb: FormBuilder,
    private hackathonService: HackathonService,
    private dialogService: NbDialogService,
    private appUsersService: AppUsersService,
    private http: HttpClient,
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
      twitter: '',
      linkedin: '',
      website: '',
    });
  }

  ngOnInit() {}

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
          twitter: data.twitter,
          linkedin: data.linkedin,
          website: data.personal_website,
        });
      }
      this.dialogService.open(this.speakerFormDialog, { context: 'this is some additional data passed to dialog' });
      this.fetchSpeakerJudge.reset();
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

    this.hackathonService.createJudge(formData, 4).subscribe((data: IHackathonJudge) => {
      this.judge = data;
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

  removeBannerImage() {
    this.imageUrl = '';
    this.imageBlob = null;
  }
}
