import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
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
import { AuthService } from '@commudle/shared-services';
import { CommunityChannelHandlerService } from 'libs/shared/components/src/lib/services/community-channel-handler.service';

@Component({
  selector: 'commudle-channel-discussion',
  templateUrl: './channel-discussion.component.html',
  styleUrls: ['./channel-discussion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelDiscussionComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() discussionId!: number;
  @Input() discussionParent = '';
  @Input() fromLastRead = false;

  hasRequestedFirstTime = true;

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
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
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
            this.changeDetectorRef.detectChanges();
          }
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.communityChannelHandlerService.destroy();
  }
}
