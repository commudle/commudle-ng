import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEditorValidator } from '@commudle/editor';
import { InfiniteScrollDirective } from '@commudle/infinite-scroll';
import { AuthService } from '@commudle/shared-services';
import { NbDialogService } from '@commudle/theme';
import { CommunityChannelManagerService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channel-manager.service';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { EUserRoles } from 'apps/shared-models/enums/user_roles.enum';
import { CommunityChannelHandlerService } from 'libs/shared/components/src/lib/services/community-channel-handler.service';
import { UserConsentsComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-consents/user-consents.component';
import { ConsentTypesEnum } from 'apps/shared-models/enums/consent-types.enum';
import { CommunityChannelsService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channels.service';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { EDiscussionType } from 'apps/commudle-admin/src/app/feature-modules/community-channels/model/discussion-type.enum';
@Component({
  selector: 'commudle-channel-discussion',
  templateUrl: './channel-discussion.component.html',
  styleUrls: ['./channel-discussion.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelDiscussionComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @Input() discussionId!: number;
  @Input() discussionParent = '';
  @Input() fromLastRead = false;
  @Input() discussionType: string;
  @Input() channelOfForum: ICommunityChannel;
  EUserRoles = EUserRoles;
  isCommunityChannelForumAdmin = false;
  isCommunityChannelForumMember = false;

  hasRequestedFirstTime = true;
  channelsRoles = {};
  forumsRoles = {};

  validators: IEditorValidator = {
    required: true,
    minLength: 1,
    maxLength: 200,
    noWhitespace: true,
  };

  @ViewChild(InfiniteScrollDirective) infiniteScrollDirective;
  @ViewChildren('messagesListRef', { read: ViewContainerRef }) messagesListRefs: QueryList<HTMLDivElement>;

  constructor(
    public communityChannelHandlerService: CommunityChannelHandlerService,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private communityChannelManagerService: CommunityChannelManagerService, // private changeDetectorRef: ChangeDetectorRef,
    private nbDialogService: NbDialogService,
    private router: Router,
    private communityChannelsService: CommunityChannelsService,
    private toastLogService: LibToastLogService,
  ) {}

  ngOnInit(): void {
    this.communityChannelManagerService.allChannelRoles$.subscribe((data) => {
      this.channelsRoles = data;
      console.log(this.channelsRoles[this.channelOfForum.id]);
    });
    this.communityChannelManagerService.allForumRoles$.subscribe((data) => {
      this.forumsRoles = data;
    });
  }

  ngOnChanges(): void {
    this.communityChannelHandlerService.init(
      this.discussionId,
      this.discussionParent,
      this.fromLastRead,
      this.activatedRoute.snapshot.queryParamMap.get('after'),
    );
  }

  ngAfterViewInit() {
    // TODO: Find a better way to do this
    this.messagesListRefs.changes.subscribe((value) => {
      this.communityChannelHandlerService.pageInfo$.subscribe((pageInfo) => {
        if (
          value.last.element.nativeElement.scrollHeight <= value.last.element.nativeElement.clientHeight &&
          pageInfo.has_next_page
        ) {
          if (this.hasRequestedFirstTime) {
            this.communityChannelHandlerService.getMessagesAfter();
            this.hasRequestedFirstTime = false;
            // this.changeDetectorRef.detectChanges();
          }
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.communityChannelHandlerService.destroy();
  }

  joinChannelButton() {
    const dialogRef = this.nbDialogService.open(UserConsentsComponent, {
      context: {
        consentType: ConsentTypesEnum.JoinChannelButton,
        channelName: this.channelOfForum.name,
        communityName: this.channelOfForum.kommunity.name,
      },
    });
    dialogRef.componentRef.instance.consentOutput.subscribe((result) => {
      dialogRef.close();
      if (result === 'accepted') {
        this.joinChannel();
      } else {
        this.router.navigate([''], { queryParams: { decline: true } });
      }
    });
  }

  joinChannel() {
    this.communityChannelsService.joinChannel(this.channelOfForum.id).subscribe((data) => {
      if (data) {
        this.toastLogService.successDialog('Welcome to the channel!');
        location.reload();
        this.gtmService();
      }
    });
  }

  gtmService() {
    // this.gtm.dataLayerPushEvent('join-channel', {
    //   com_user_id: this.currentUser.id,
    //   com_channel_id: this.discussion.parent_id,
    // });
  }
}
