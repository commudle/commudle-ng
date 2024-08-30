import { Component, Input, OnInit } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { EDbModels, IHackathon, IRound } from '@commudle/shared-models';
import { RoundService, ToastrService } from '@commudle/shared-services';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { NbDialogRef } from '@commudle/theme';
@Component({
  selector: 'commudle-hackathon-overall-round-selection-update-email',
  templateUrl: './hackathon-overall-round-selection-update-email.component.html',
  styleUrls: ['./hackathon-overall-round-selection-update-email.component.scss'],
})
export class HackathonOverallRoundSelectionUpdateEmailComponent implements OnInit {
  @Input() hackathonId: number | string;
  faXmark = faXmark;
  roundSelection = 0;
  hackathonRounds: IRound[];
  message: string;
  isLoading = false;

  tinyMCE = {
    min_height: 300,
    menubar: false,
    convert_urls: false,
    placeholder: 'Write additional message',
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
    private dialogRef: NbDialogRef<HackathonOverallRoundSelectionUpdateEmailComponent>,
  ) {}

  ngOnInit() {
    this.indexRounds();
  }

  indexRounds() {
    this.roundService.indexRounds(this.hackathonId, EDbModels.HACKATHON).subscribe((data: IRound[]) => {
      this.hackathonRounds = data;
    });
  }

  OverallRoundSelectionUpdateEmail() {
    if (this.roundSelection > 0) {
      this.isLoading = true;
      this.hackathonService
        .OverallRoundSelectionUpdateEmail(this.hackathonId, this.roundSelection, this.message)
        .subscribe((data) => {
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
  }

  closePopup() {
    this.dialogRef.close();
  }
}
