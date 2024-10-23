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
import { ActivatedRoute } from '@angular/router';
import { IEditorValidator } from '@commudle/editor';
import { InfiniteScrollDirective } from '@commudle/infinite-scroll';
import { EUserRoles, ICommunityChannel, IUserMessage } from '@commudle/shared-models';
import {
  AuthService,
  CommunityChannelsService,
  ToastrService,
  CommunityChannelManagerService,
} from '@commudle/shared-services';
import { CommunityChannelHandlerService } from '../../services/community-channel-handler.service';

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
  @Input() channelOrForum: ICommunityChannel;
  @Input() shareMessageUrl: string;
  pinnedMessages: IUserMessage[];
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
    private communityChannelManagerService: CommunityChannelManagerService,
    private communityChannelsService: CommunityChannelsService,
    private toastLogService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.communityChannelManagerService.allChannelRoles$.subscribe((data) => {
      this.channelsRoles = data;
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
    this.communityChannelHandlerService.pinnedMessage(this.channelOrForum.id);
    this.getPinnedMessages();
  }

  ngAfterViewInit() {
    // TODO: Find a better way to do this
    this.messagesListRefs.changes.subscribe((value) => {
      this.communityChannelHandlerService.pageInfo$.subscribe((pageInfo) => {
        if (
          value.last?.element?.nativeElement.scrollHeight <= value.last?.element?.nativeElement.clientHeight &&
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

  joinChannel() {
    this.communityChannelsService.joinChannel(this.channelOrForum.id).subscribe((data) => {
      if (data) {
        this.toastLogService.successDialog('Welcome to the channel!');
        location.reload();
      }
    });
  }

  getPinnedMessages() {
    this.communityChannelHandlerService.pinnedMessages$.subscribe((data) => {
      this.pinnedMessages = data;
    });
  }
}
