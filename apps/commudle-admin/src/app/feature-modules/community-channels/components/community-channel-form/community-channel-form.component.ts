import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { CommunityChannelManagerService } from '../../services/community-channel-manager.service';
import { CommunityChannelsService } from '../../services/community-channels.service';

@Component({
  selector: 'app-community-channel-form',
  templateUrl: './community-channel-form.component.html',
  styleUrls: ['./community-channel-form.component.scss'],
})
export class CommunityChannelFormComponent implements OnInit {
  @Input() existingChannel: ICommunityChannel;
  @Input() presetGroupName;

  @Output() saved = new EventEmitter();

  uploadedLogoImageFile: File;
  uploadedLogoImage;

  // community channel form
  communityChannelForm;

  subscriptions = [];

  constructor(
    private communityChannelManagerService: CommunityChannelManagerService,
    private communityChannelsService: CommunityChannelsService,
    private fb: FormBuilder,
    private toastLogService: LibToastLogService,
  ) {
    this.communityChannelForm = this.fb.group({
      logo: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      group_name: [''],
      is_private: [false, Validators.required],
      is_readonly: [false, Validators.required],
    });
  }

  ngOnInit() {
    if (this.presetGroupName) {
      this.communityChannelForm.patchValue({
        group_name: this.presetGroupName,
      });
    }

    if (this.existingChannel) {
      this.communityChannelForm.patchValue({
        name: this.existingChannel.name,
        description: this.existingChannel.description,
        group_name: this.existingChannel.group_name,
        is_private: this.existingChannel.is_private,
        is_readonly: this.existingChannel.is_readonly,
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
      this.communityChannelManagerService.createChannel(formData);
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
      this.communityChannelsService.deleteLogo(this.existingChannel.id).subscribe((data) => {
        if (data) {
          this.existingChannel.logo = null;
          this.communityChannelManagerService.findAndUpdateChannel(this.existingChannel);
        }
      });
    }
  }

  updateChannel(formData) {
    this.communityChannelsService.update(this.existingChannel.id, formData).subscribe((data) => {
      this.existingChannel = data;
      this.communityChannelManagerService.findAndUpdateChannel(data);
      this.toastLogService.successDialog('Updated', 3000);
    });
  }
}
