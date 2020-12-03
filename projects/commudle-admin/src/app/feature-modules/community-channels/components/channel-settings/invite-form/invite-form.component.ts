import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'projects/commudle-admin/src/environments/environment';
import { ICommunityChannel } from 'projects/shared-models/community-channel.model';
import { CommunityChannelManagerService } from '../../../services/community-channel-manager.service';
import { CommunityChannelsService } from '../../../services/community-channels.service';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';

@Component({
  selector: 'app-invite-form',
  templateUrl: './invite-form.component.html',
  styleUrls: ['./invite-form.component.scss']
})
export class InviteFormComponent implements OnInit, OnDestroy {
  private isBrowser: boolean = isPlatformBrowser(this.platformId);
  communityChannel: ICommunityChannel;
  joinToken: string;
  subscriptions = [];
  appURL;
  linkCopied = false;

  memberInviteForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private communityChannelsService: CommunityChannelsService,
    private communityChannelManagerService: CommunityChannelManagerService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private toastLogService: LibToastLogService
  ) { }

  ngOnInit(): void {
    this.appURL = environment.app_url;
    this.subscriptions.push(
      this.activatedRoute.parent.params.subscribe(
        data => {
          this.communityChannel = this.communityChannelManagerService.findChannel(data.community_channel_id);
          this.getJoinToken();
        }
      )
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
    this.communityChannelsService.getJoinToken(this.communityChannel.id).subscribe(
      data => {
        this.joinToken = data;
      }
    );
  }

  refreshJoinToken() {
    this.linkCopied = false;
    this.communityChannelsService.resetJointoken(this.communityChannel.id).subscribe(
      data => {
        this.joinToken = data;
      }
    )
  }


  sendMemberInvite() {
    this.communityChannelsService.inviteMembers(this.communityChannel.id, this.memberInviteForm.value).subscribe(
      data => {
        this.toastLogService.successDialog('Invite sent by email', 3000);
        this.memberInviteForm.reset();
      }
    )
  }

}
