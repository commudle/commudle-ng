/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatchStringValidator } from 'apps/shared-helper-modules/custom-validators.validator';
import { EDiscussionType } from 'apps/commudle-admin/src/app/feature-modules/community-channels/model/discussion-type.enum';
import { CommunityChannelManagerService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channel-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-channel',
  templateUrl: './delete-channel.component.html',
  styleUrls: ['./delete-channel.component.scss'],
})
export class DeleteChannelComponent {
  @Input() channelId;
  @Input() currentUrl: string;
  @Output() updateForm = new EventEmitter<string>();

  discussionType = EDiscussionType;

  deleteForm;

  constructor(
    private fb: FormBuilder,
    private communityChannelManagerService: CommunityChannelManagerService,
    private router: Router,
  ) {
    this.deleteForm = this.fb.group({
      confirmation: ['', [Validators.required, MatchStringValidator('YES')]],
    });
  }

  submitForm() {
    this.communityChannelManagerService.deleteChannel(this.channelId, this.discussionType.CHANNEL);
    this.formUpdate();
    this.router.navigate([this.currentUrl]);
  }

  formUpdate() {
    this.updateForm.emit('updated');
  }
}
