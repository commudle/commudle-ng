import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { EDiscussionType } from '@commudle/shared-models';
import { NbDialogRef } from '@commudle/theme';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { SeoService } from 'apps/shared-services/seo.service';

@Component({
  selector: 'commudle-channel-settings',
  templateUrl: './channel-settings.component.html',
  styleUrls: ['./channel-settings.component.scss'],
})
export class ChannelSettingsComponent implements OnInit, OnDestroy {
  @Input() channel: ICommunityChannel;
  @Input() invite = false;
  @Input() discussionType: EDiscussionType;
  @Input() currentUrl: string; //After updates it will redirect to that url
  @Output() updateForm = new EventEmitter<string>();

  constructor(private seoService: SeoService, private dialogRef: NbDialogRef<ChannelSettingsComponent>) {}

  ngOnInit() {
    this.seoService.noIndex(true);
  }

  ngOnDestroy() {
    this.seoService.noIndex(false);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  updateChannelForm(event?) {
    this.updateForm.emit(event);
  }
}
