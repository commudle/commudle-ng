import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '@commudle/shared-models';
import { NbDialogService } from '@commudle/theme';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';

@Component({
  selector: 'commudle-hackathon-control-panel-speaker-judge',
  templateUrl: './hackathon-control-panel-speaker-judge.component.html',
  styleUrls: ['./hackathon-control-panel-speaker-judge.component.scss'],
})
export class HackathonControlPanelSpeakerJudgeComponent implements OnInit {
  fetchSpeakerJudge: FormGroup;
  speakerRegistrationForm: FormGroup;

  @ViewChild('speakerForm', { static: true }) speakerFormDialog: TemplateRef<any>;
  constructor(
    private fb: FormBuilder,
    private hackathonService: HackathonService,
    private dialogService: NbDialogService,
  ) {
    this.fetchSpeakerJudge = this.fb.group({
      email: ['', Validators.required],
    });

    this.speakerRegistrationForm = this.fb.group({
      profile_image: [null, Validators.required],
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
    this.hackathonService.fetchUserByEmail(this.fetchSpeakerJudge.get('email').value).subscribe((data: IUser) => {
      this.speakerRegistrationForm.reset();
      if (data) {
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
    });
  }
}
