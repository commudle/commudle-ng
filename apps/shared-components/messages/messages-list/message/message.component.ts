import { Component, ElementRef, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { InViewportDirective } from '@commudle/in-viewport';
import { SeoService } from '@commudle/shared-services';
import { faGrin } from '@fortawesome/free-regular-svg-icons';
import { NoWhitespaceValidator } from 'apps/shared-helper-modules/custom-validators.validator';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { IUserMessage } from 'apps/shared-models/user_message.model';
// import { UserMessageReceiptHandlerService } from '@commudle/shared-services';
import * as moment from 'moment';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  providers: [InViewportDirective],
})
export class MessageComponent implements OnInit {
  @Input() canReply: boolean;
  @Input() message: IUserMessage;
  @Input() currentUser: ICurrentUser;
  @Input() allActions;
  @Input() permittedActions;
  @Output() sendReply: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendFlag: EventEmitter<number> = new EventEmitter<number>();
  @Output() sendDelete = new EventEmitter();

  moment = moment;

  showReplyForm = false;
  showEmojiPicker = false;
  isVotingBlocked = false;

  replyForm;

  @ViewChild('messageInput') messageInput: ElementRef<HTMLInputElement>;

  faGrin = faGrin;

  constructor(
    private fb: FormBuilder,
    // private userMessageReceiptHandlerService: UserMessageReceiptHandlerService,
    private injector: Injector,
    private seoService: SeoService,
  ) {
    this.replyForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200), NoWhitespaceValidator]],
    });
  }

  ngOnInit(): void {
    console.log(this.message, 'message');
    this.seoSchema();
  }

  emitReply(): void {
    if (this.replyForm.valid) {
      this.sendReply.emit(this.replyForm.value);
      this.replyForm.reset();
      this.replyForm.updateValueAndValidity();
      this.showReplyForm = false;
      this.showEmojiPicker = false;
    }
  }

  emitFlag(messageId: number): void {
    this.sendFlag.emit(messageId);
  }

  emitDelete(messageId: number, isSelfMessage: boolean): void {
    this.sendDelete.emit({ messageId, isSelfMessage });
  }

  addEmoji(event): void {
    this.replyForm.patchValue({
      content: (this.replyForm.get('content').value || '').concat(`${event.emoji.native}`),
    });
    this.messageInput.nativeElement.focus();
  }

  markAsRead(messageId: number, { visible }: { visible: boolean }): void {
    // if (messageId && visible) {
    //   this.userMessageReceiptHandlerService.addMessageReceipt(messageId, new Date());
    // }
  }

  seoSchema() {
    this.seoService.setSchema({
      '@context': 'https://schema.org',
      '@type': 'DiscussionForumPosting',
      headline: 'Comments',
      text: this.removeHtmlTags(this.message.content),
      author: {
        '@type': 'Person',
        name: this.message.user.name ? this.message.user.name : this.message.user.username,
        url: `https://www.commudle.com/users/${this.message.user.username}`,
      },
      datePublished: this.message.created_at,
      comment: this.getUserMessages(),
    });
  }

  getUserMessages() {
    const resultArray = [];

    for (const userMessage of this.message.user_messages) {
      if (userMessage) {
        const transformedMessage = {
          '@type': 'Comment',
          text: this.removeHtmlTags(userMessage.content),
          author: {
            '@type': 'Person',
            name: userMessage.user.name ? userMessage.user.name : userMessage.user.username,
            url: `https://www.commudle.com/users/${userMessage.user.username}`,
          },
          datePublished: userMessage.created_at,
        };

        resultArray.push(transformedMessage);
      }
    }

    return resultArray;
  }

  removeHtmlTags(content): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    return doc.body.textContent || '';
  }
}
