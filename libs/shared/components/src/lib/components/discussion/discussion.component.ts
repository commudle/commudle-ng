import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { IEditorValidator } from '@commudle/editor';
import { AuthService } from '@commudle/shared-services';
import { DiscussionHandlerService } from '../../services/discussion-handler.service';

@Component({
  selector: 'commudle-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscussionComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() discussionId!: number;
  @Input() discussionParent: 'builds' | '' = '';
  @Input() fromLastRead = true;

  hasRequestedFirstTime = true;

  validators: IEditorValidator = {
    required: true,
    minLength: 1,
    maxLength: 200,
    noWhitespace: true,
  };

  @ViewChildren('messagesListRef', { read: ViewContainerRef }) messagesListRefs: QueryList<HTMLDivElement>;

  constructor(public discussionHandlerService: DiscussionHandlerService, public authService: AuthService) {}

  ngOnInit(): void {
    this.discussionHandlerService.init(this.discussionId, this.discussionParent, this.fromLastRead);
  }

  ngAfterViewInit() {
    // TODO: Find a better way to do this
    this.messagesListRefs.changes.subscribe((value) => {
      this.discussionHandlerService.pageInfo$.subscribe((pageInfo) => {
        if (
          value.last.element.nativeElement.scrollHeight <= value.last.element.nativeElement.clientHeight &&
          pageInfo.has_next_page
        ) {
          if (this.hasRequestedFirstTime) {
            this.discussionHandlerService.getMessagesAfter();
            this.hasRequestedFirstTime = false;
          }
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.discussionHandlerService.destroy();
  }
}
