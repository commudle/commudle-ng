import { ToastrService } from '@commudle/shared-services';
import { Component, Input } from '@angular/core';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { NbDialogRef } from '@commudle/theme';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'commudle-hackathon-winner-announcement-emailer',
  templateUrl: './hackathon-winner-announcement-emailer.component.html',
  styleUrls: ['./hackathon-winner-announcement-emailer.component.scss'],
})
export class HackathonWinnerAnnouncementEmailerComponent {
  @Input() hackathonId: number;
  message = '';
  faXmark = faXmark;
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
    private hackathonService: HackathonService,
    private toastrService: ToastrService,
    protected dialogRef: NbDialogRef<HackathonWinnerAnnouncementEmailerComponent>,
  ) {}

  SendWinnerAnnouncementMailer() {
    this.isLoading = true;
    this.hackathonService.WinnerAnnouncementEmail(this.hackathonId, this.message).subscribe(
      (data) => {
        if (data) {
          this.toastrService.successDialog('Email sent successfully, Will be delivered soon!');
        }
        this.closeDialogBox();
      },
      () => {
        this.closeDialogBox();
      },
    );
  }

  closeDialogBox() {
    this.isLoading = false;
    this.message = '';
    this.dialogRef.close();
  }
}
