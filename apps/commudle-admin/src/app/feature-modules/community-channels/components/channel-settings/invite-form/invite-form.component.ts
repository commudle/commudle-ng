import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'apps/commudle-admin/src/environments/environment';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { EUserRoles } from 'apps/shared-models/enums/user_roles.enum';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { CommunityChannelManagerService } from '../../../services/community-channel-manager.service';
import { CommunityChannelsService } from '../../../services/community-channels.service';

@Component({
  selector: 'app-invite-form',
  templateUrl: './invite-form.component.html',
  styleUrls: ['./invite-form.component.scss'],
})
export class InviteFormComponent implements OnInit, OnDestroy {
  communityChannel: ICommunityChannel;
  joinToken: string;
  subscriptions = [];
  appURL;
  linkCopied = false;
  channelsRoles = {};
  EUserRoles = EUserRoles;
  memberInviteForm;
  isBrowser;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object,
    private communityChannelsService: CommunityChannelsService,
    private communityChannelManagerService: CommunityChannelManagerService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private toastLogService: LibToastLogService,
  ) {
    this.memberInviteForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.appURL = environment.app_url;
    this.subscriptions.push(
      this.activatedRoute.parent.params.subscribe((data) => {
        this.communityChannel = this.communityChannelManagerService.findChannel(data.community_channel_id);
        this.getJoinToken();
      }),
    );

    this.subscriptions.push(
      this.communityChannelManagerService.allChannelRoles$.subscribe((data) => {
        this.channelsRoles = data;
      }),
    );
  }

  ngOnDestroy() {
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }

  copyJoinLinkToClipboard(elementRef) {
    elementRef.select();
    document.execCommand('copy');
    elementRef.setSelectionRange(0, 0);

    this.linkCopied = true;
  }

  getJoinToken() {
    this.communityChannelsService.getJoinToken(this.communityChannel.id).subscribe((data) => {
      this.joinToken = data;
    });
  }

  refreshJoinToken() {
    this.linkCopied = false;
    this.communityChannelsService.resetJointoken(this.communityChannel.id).subscribe((data) => {
      this.joinToken = data;
    });
  }

  sendMemberInvite() {
    this.communityChannelsService
      .inviteMembers(this.communityChannel.id, this.memberInviteForm.value)
      .subscribe((data) => {
        this.toastLogService.successDialog('Invite sent by email', 3000);
        this.memberInviteForm.reset();
      });
  }
}
