import { Component, Input } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from '@commudle/shared-services';
import { NbDialogRef } from '@commudle/theme';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { EInvitationStatus } from 'apps/shared-models/hackathon-user-response.model';

@Component({
  selector: 'commudle-hackathon-status-filter-general-emails',
  templateUrl: './hackathon-status-filter-general-emails.component.html',
  styleUrls: ['./hackathon-status-filter-general-emails.component.scss'],
})
export class HackathonStatusFilterGeneralEmailsComponent {
  @Input() hackathonId: number;
  message = '';
  subject = '';
  faXmark = faXmark;
  isLoading = false;
  selectedRecipient = 'all';
  EInvitationStatus = EInvitationStatus;
  selectedStatus = '';

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
    protected dialogRef: NbDialogRef<HackathonStatusFilterGeneralEmailsComponent>,
  ) {}

  SendStatusFilterGeneralMailer() {
    this.isLoading = true;
    this.hackathonService
      .StatusFilterGeneralEmail(this.hackathonId, this.message, this.subject, this.selectedStatus)
      .subscribe(
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
    this.message = '';
    this.subject = '';
    this.isLoading = false;
    this.dialogRef.close();
  }
}
