import { EUserRoles } from 'apps/shared-models/enums/user_roles.enum';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@commudle/theme';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { CommunityChannelManagerService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channel-manager.service';
import { SeoService } from 'apps/shared-services/seo.service';

@Component({
  selector: 'app-channel-settings',
  templateUrl: './channel-settings.component.html',
  styleUrls: ['./channel-settings.component.scss'],
})
export class ChannelSettingsComponent implements OnInit, OnDestroy {
  @ViewChild('settingsTemplate', { static: true }) settingsTemplate: TemplateRef<any>;
  subscriptions = [];
  channel: ICommunityChannel;
  dialogRef;
  EUserRoles = EUserRoles;

  allChannelsRoles = {};
  channelRoles = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialogService: NbDialogService,
    private communityChannelManagerService: CommunityChannelManagerService,
    private seoService: SeoService,
  ) {}

  ngOnInit() {
    this.seoService.noIndex(true);
    this.subscriptions.push(
      this.activatedRoute.params.subscribe((data) => {
        this.setChannel(data.community_channel_id);
      }),
    );

    this.subscriptions.push(
      this.communityChannelManagerService.allChannelRoles$.subscribe((data) => {
        this.allChannelsRoles = data;
        this.setRoles();
      }),
    );
  }

  ngOnDestroy() {
    this.dialogRef.close();
    this.seoService.noIndex(false);
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  // function to find and set the correct selected channel
  setChannel(channelId) {
    this.openDialog();
    this.channel = this.communityChannelManagerService.findChannel(channelId);
    this.setRoles();
  }

  setRoles() {
    this.channelRoles = this.allChannelsRoles[this.channel.id];
  }

  openDialog() {
    this.dialogRef = this.dialogService.open(this.settingsTemplate, { autoFocus: true });
    this.dialogRef.onClose.subscribe(() => {
      this.router.navigate([{ outlets: { p: null } }], { relativeTo: this.activatedRoute.parent });
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
