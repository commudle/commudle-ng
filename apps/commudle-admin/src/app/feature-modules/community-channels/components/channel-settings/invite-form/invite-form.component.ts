import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'apps/commudle-admin/src/environments/environment';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { EUserRoles } from 'apps/shared-models/enums/user_roles.enum';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { CommunityChannelManagerService } from '../../../services/community-channel-manager.service';
import { CommunityChannelsService } from '../../../services/community-channels.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-invite-form',
  templateUrl: './invite-form.component.html',
  styleUrls: ['./invite-form.component.scss'],
})
export class InviteFormComponent implements OnInit, OnDestroy {
  @Input() channelId: number;
  @Input() forum: ICommunityChannel;
  @Output() updateForm = new EventEmitter<string>();
  communityChannel: ICommunityChannel;
  joinToken: string;
  subscriptions: Subscription[] = [];
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
    if (this.channelId) {
      this.communityChannel = this.communityChannelManagerService.findChannel(this.channelId);
    } else {
      this.communityChannel = this.forum;
    }

    this.getJoinToken();

    this.subscriptions.push(
      this.communityChannelManagerService.allChannelRoles$.subscribe((data) => {
        this.channelsRoles = data;
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  copyJoinLinkToClipboard(elementRef) {
    elementRef.select();
    document.execCommand('copy');
    elementRef.setSelectionRange(0, 0);

    this.linkCopied = true;
  }

  getJoinToken() {
    this.subscriptions.push(
      this.communityChannelsService.getJoinToken(this.communityChannel.id).subscribe((data) => {
        this.joinToken = data;
      }),
    );
  }

  refreshJoinToken() {
    this.linkCopied = false;
    this.subscriptions.push(
      this.communityChannelsService.resetJoinToken(this.communityChannel.id).subscribe((data) => {
        this.joinToken = data;
      }),
    );
  }

  sendMemberInvite() {
    this.subscriptions.push(
      this.communityChannelsService
        .inviteMembers(this.communityChannel.id, this.memberInviteForm.value)
        .subscribe((data) => {
          this.toastLogService.successDialog('Invite sent by email', 3000);
          this.memberInviteForm.reset();
          this.formUpdate();
        }),
    );
  }

  formUpdate() {
    this.updateForm.emit('updated');
  }
}
