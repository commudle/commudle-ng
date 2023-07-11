/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatchStringValidator } from 'apps/shared-helper-modules/custom-validators.validator';
import { EDiscussionType } from 'apps/commudle-admin/src/app/feature-modules/community-channels/model/discussion-type.enum';
import { CommunityChannelManagerService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channel-manager.service';

@Component({
  selector: 'app-archive-channel',
  templateUrl: './archive-channel.component.html',
  styleUrls: ['./archive-channel.component.scss'],
})
export class ArchiveChannelComponent {
  @Input() channelId;
  @Output() updateForm = new EventEmitter<string>();

  discussionType = EDiscussionType;

  deleteForm;

  constructor(private fb: FormBuilder, private communityChannelManagerService: CommunityChannelManagerService) {
    this.deleteForm = this.fb.group({
      confirmation: ['', [Validators.required, MatchStringValidator('YES')]],
    });
  }

  submitForm() {
    this.communityChannelManagerService.deleteChannel(this.channelId, this.discussionType.CHANNEL);
    window.location.reload();
    this.formUpdate();
  }

  formUpdate() {
    this.updateForm.emit('updated');
  }
}
