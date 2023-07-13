import { EUserRoles } from 'apps/shared-models/enums/user_roles.enum';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@commudle/theme';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { CommunityChannelManagerService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channel-manager.service';
import { SeoService } from 'apps/shared-services/seo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-channel-settings',
  templateUrl: './channel-settings.component.html',
  styleUrls: ['./channel-settings.component.scss'],
})
export class ChannelSettingsComponent implements OnInit, OnDestroy {
  @Input() channelId;
  @Input() invite = false;
  @Input() discussionType;
  @Output() updateForm = new EventEmitter<string>();

  @ViewChild('settingsTemplate', { static: true }) settingsTemplate: TemplateRef<any>;
  subscriptions: Subscription[] = [];
  channel: ICommunityChannel;
  dialogRef;
  EUserRoles = EUserRoles;

  allChannelsRoles = {};
  channelRoles = [];

  constructor(
    private dialogService: NbDialogService,
    private communityChannelManagerService: CommunityChannelManagerService,
    private seoService: SeoService,
  ) {}

  ngOnInit() {
    this.seoService.noIndex(true);
    this.setChannel(this.channelId);

    this.subscriptions.push(
      this.communityChannelManagerService.allChannelRoles$.subscribe((data) => {
        this.allChannelsRoles = data;
      }),
    );
  }

  ngOnDestroy() {
    this.dialogRef.close();
    this.seoService.noIndex(false);
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  // function to find and set the correct selected channel
  setChannel(channelId) {
    this.openDialog();
    this.channel = this.communityChannelManagerService.findChannel(channelId);
  }

  openDialog() {
    this.dialogRef = this.dialogService.open(this.settingsTemplate, { autoFocus: true });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  updateChannelForm(event?) {
    this.updateForm.emit(event);
  }
}
