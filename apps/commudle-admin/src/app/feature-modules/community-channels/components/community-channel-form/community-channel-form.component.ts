import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { CommunityChannelManagerService } from '../../services/community-channel-manager.service';
import { CommunityChannelsService } from '../../services/community-channels.service';
import { EDiscussionType } from 'apps/commudle-admin/src/app/feature-modules/community-channels/model/discussion-type.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-community-channel-form',
  templateUrl: './community-channel-form.component.html',
  styleUrls: ['./community-channel-form.component.scss'],
})
export class CommunityChannelFormComponent implements OnInit {
  @Input() existingChannel: ICommunityChannel;
  @Input() presetGroupName;
  @Input() discussionType: string;
  EDiscussionType = EDiscussionType;

  @Output() saved = new EventEmitter();

  uploadedLogoImageFile: File;
  uploadedLogoImage;

  // community channel form
  communityChannelForm;

  subscriptions: Subscription[] = [];

  constructor(
    private cmService: CommunityChannelManagerService,
    private communityChannelsService: CommunityChannelsService,
    private fb: FormBuilder,
    private toastLogService: LibToastLogService,
  ) {
    this.communityChannelForm = this.fb.group({
      logo: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      group_name: ['General', this.discussionType === 'forum' ? Validators.required : ''],
      is_private: [false, Validators.required],
      is_readonly: [false, Validators.required],
      display_type: [this.discussionType],
      default: [false],
    });
  }

  ngOnInit() {
    if (this.presetGroupName) {
      this.communityChannelForm.patchValue({
        group_name: this.presetGroupName,
      });
    }
    if (this.discussionType) {
      this.communityChannelForm.patchValue({
        display_type: this.discussionType,
      });
    }

    if (this.existingChannel) {
      this.communityChannelForm.patchValue({
        name: this.existingChannel.name,
        description: this.existingChannel.description,
        group_name: this.existingChannel.group_name,
        is_private: this.existingChannel.is_private,
        is_readonly: this.existingChannel.is_readonly,
        default: this.existingChannel.default,
      });
    }
  }

  submitForm() {
    const formData: any = new FormData();

    const communityChannelFormData = this.communityChannelForm.value;
    Object.keys(communityChannelFormData).forEach((key) =>
      !(communityChannelFormData[key] == null)
        ? formData.append(`community_channel[${key}]`, communityChannelFormData[key])
        : '',
    );

    if (this.uploadedLogoImageFile) {
      formData.append('community_channel[logo]', this.uploadedLogoImageFile);
    }

    if (this.existingChannel) {
      this.updateChannel(formData);
    } else {
      if (this.discussionType === EDiscussionType.FORUM) {
        this.cmService.createForum(formData);
      } else if (this.discussionType === EDiscussionType.CHANNEL) {
        this.cmService.createChannel(formData);
      }
    }

    this.saved.emit();
  }

  displaySelectedLogo(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size > 2425190) {
        this.toastLogService.warningDialog('Image should be less than 2 Mb', 3000);
        return;
      }
      this.uploadedLogoImageFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedLogoImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeLogo() {
    this.uploadedLogoImage = null;
    this.uploadedLogoImageFile = null;
    this.communityChannelForm.get('logo').patchValue('');

    // if we are editing the community channel here, then send a request to the server to remove the logo
    if (this.existingChannel && this.existingChannel.logo) {
      this.communityChannelsService.deleteChannelForumLogo(this.existingChannel.id).subscribe((data) => {
        if (data) {
          this.existingChannel.logo = null;
          this.cmService.findAndUpdateChannel(this.existingChannel);
        }
      });
    }
  }

  updateChannel(formData) {
    this.communityChannelsService.updateChannelForum(this.existingChannel.id, formData).subscribe((data) => {
      this.existingChannel = data;
      this.cmService.findAndUpdateChannel(data);
      this.toastLogService.successDialog('Updated', 3000);
    });
  }
}
