import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ICommunityChannel } from 'projects/shared-models/community-channel.model';
import { CommunityChannelManagerService } from '../../services/community-channel-manager.service';

@Component({
  selector: 'app-channel-settings',
  templateUrl: './channel-settings.component.html',
  styleUrls: ['./channel-settings.component.scss']
})
export class ChannelSettingsComponent implements OnInit, OnDestroy {
  @ViewChild('settingsTemplate', {static: true}) settingsTemplate: TemplateRef<any>;
  subscriptions = [];
  channel: ICommunityChannel;
  dialogRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialogService: NbDialogService,
    private communityChannelManagerService: CommunityChannelManagerService
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe(data => {
        this.setChannel(data.community_channel_id);
      })
    )
  }


  ngOnDestroy() {
    this.dialogRef.close();
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  // function to find and set the correct selected channel
  setChannel(channelId) {
    this.openDialog();
    this.channel = this.communityChannelManagerService.findChannel(channelId);
  }


  openDialog() {
    this.dialogRef = this.dialogService.open(this.settingsTemplate, {autoFocus: true});
    this.dialogRef.onClose.subscribe(() => {
      this.router.navigate([{outlets: {p: null}}], {relativeTo: this.activatedRoute.parent});
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
