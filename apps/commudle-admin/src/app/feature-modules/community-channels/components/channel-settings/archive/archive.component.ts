/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatchStringValidator } from 'apps/shared-helper-modules/custom-validators.validator';
import { EDiscussionType } from 'apps/commudle-admin/src/app/feature-modules/community-channels/model/discussion-type.enum';
import { CommunityChannelManagerService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channel-manager.service';
import { Router } from '@angular/router';
@Component({
  selector: 'commudle-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
})
export class ArchiveComponent {
  @Input() channelId;
  @Output() updateForm = new EventEmitter<string>();
  @ViewChild('archiveDialogBox') archiveDialogBox: TemplateRef<any>;

  discussionType = EDiscussionType;

  archiveForm;

  constructor(
    private fb: FormBuilder,
    private communityChannelManagerService: CommunityChannelManagerService,
    private router: Router,
  ) {
    this.archiveForm = this.fb.group({
      confirmation: ['', [Validators.required, MatchStringValidator('YES')]],
    });
  }

  submitForm() {
    this.communityChannelManagerService.deleteChannel(this.channelId, true);
    const currentUrl = this.router.url;
    this.router.navigate([currentUrl.substring(0, currentUrl.lastIndexOf('/'))]);
    this.formUpdate();
  }

  formUpdate() {
    this.updateForm.emit('updated');
  }
}
