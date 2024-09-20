import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EDbModels, IRound } from '@commudle/shared-models';
import { RoundService, ToastrService } from '@commudle/shared-services';
import { NbDialogRef } from '@commudle/theme';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';

@Component({
  selector: 'commudle-hackathon-round-general-mailer',
  templateUrl: './hackathon-round-general-mailer.component.html',
  styleUrls: ['./hackathon-round-general-mailer.component.scss'],
})
export class HackathonRoundGeneralMailerComponent implements OnInit {
  @Input() hackathonId: number | string;
  faXmark = faXmark;
  hackathonRounds: IRound[];
  isLoading = false;
  roundGeneralMailerForm: FormGroup;

  tinyMCE = {
    min_height: 300,
    menubar: false,
    convert_urls: false,
    placeholder: 'Write Message',
    content_style:
      "@import url('https://fonts.googleapis.com/css?family=Inter'); body {font-family: 'Inter'; font-size: 16px !important;}",
    plugins: [
      'emoticons',
      'advlist',
      'lists',
      'autolink',
      'link',
      'charmap',
      'preview',
      'anchor',
      'image',
      'visualblocks',
      'code',
      'charmap',
      'codesample',
      'insertdatetime',
      'table',
      'code',
      'help',
      'wordcount',
      'autoresize',
      'media',
    ],
    toolbar:
      'bold italic backcolor | codesample emoticons | link | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | media code | removeformat | table',
    default_link_target: '_blank',
    branding: false,
    license_key: 'gpl',
  };
  constructor(
    private roundService: RoundService,
    private hackathonService: HackathonService,
    private toastrService: ToastrService,
    private dialogRef: NbDialogRef<HackathonRoundGeneralMailerComponent>,
    private fb: FormBuilder,
  ) {
    this.roundGeneralMailerForm = this.fb.group({
      subject: ['', Validators.required],
      message: ['', Validators.required],
      round_id: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.indexRounds();
  }

  indexRounds() {
    this.roundService.indexRounds(this.hackathonId, EDbModels.HACKATHON).subscribe((data: IRound[]) => {
      this.hackathonRounds = data;
    });
  }

  roundGeneralMailer() {
    this.isLoading = true;
    this.hackathonService.roundGeneralEmail(this.roundGeneralMailerForm.value).subscribe((data) => {
      if (data) {
        this.toastrService.successDialog('Emails are being delivered!');
        this.closePopup();
      }
      this.isLoading = false;
    }),
      () => {
        this.isLoading = false;
      };
  }

  closePopup() {
    this.dialogRef.close();
  }
}
