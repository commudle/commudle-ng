import { Injectable } from '@angular/core';
import { ChatChannel } from '@commudle/shared-channels';
import { IPageInfo, IPagination, IUserMessage } from '@commudle/shared-models';
import { CableService, DiscussionService, ToastrService } from '@commudle/shared-services';
import { BehaviorSubject, Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DiscussionHandlerService {
  chatChannel!: ChatChannel;

  private messages = new BehaviorSubject<IUserMessage[]>([]);
  messages$ = this.messages.asObservable();

  private permittedActions = new BehaviorSubject<string[]>([]);
  permittedActions$ = this.permittedActions.asObservable();

  private pageInfo = new BehaviorSubject<IPageInfo>({
    has_previous_page: false,
    has_next_page: false,
    start_cursor: '',
    end_cursor: '',
  });
  pageInfo$ = this.pageInfo.asObservable();

  private _discussionParent: 'builds' | '' = '';
  private _discussionId!: number;

  constructor(
    private discussionService: DiscussionService,
    private cableService: CableService,
    private toastrService: ToastrService,
  ) {}

  init(discussionId: number, discussionParent: 'builds' | '') {
    this._discussionId = discussionId;
    this._discussionParent = discussionParent;

    this.getMessages();

    this.chatChannel = new ChatChannel({ room: this._discussionId });
    this.cableService.subscribe(this.chatChannel);

    this.handleChatChannel();
  }

  sendMessage(content: string) {
    if (!this.permittedActions.value.includes('add') || this.permittedActions.value.includes('blocked')) {
      return;
    }

    this.chatChannel.add(content);
  }

  sendReply(parentId: number, content: string) {
    if (!this.permittedActions.value.includes('reply') || this.permittedActions.value.includes('blocked')) {
      return;
    }

    this.chatChannel.reply(parentId, content);
  }

  sendDelete(messageId: number, isSelfMessage: boolean) {
    if (
      !this.permittedActions.value.includes('delete_any') ||
      !this.permittedActions.value.includes('delete_self') ||
      this.permittedActions.value.includes('blocked')
    ) {
      return;
    }

    if (isSelfMessage) {
      this.chatChannel.deleteSelf(messageId);
    } else {
      this.chatChannel.deleteAny(messageId);
    }
  }

  sendFlag(messageId: number) {
    if (!this.permittedActions.value.includes('flag') || this.permittedActions.value.includes('blocked')) {
      return;
    }

    this.chatChannel.flag(messageId);
  }

  getMessages() {
    this._getMessages().subscribe((data) => {
      this.messages.next(data.page.map((page) => page.data));
      this.pageInfo.next(data.page_info);
    });
  }

  getMessagesAfter() {
    this._getMessagesAfter().subscribe((data) => {
      this.messages.next([...this.messages.value, ...data.page.map((page) => page.data)]);
      this.pageInfo.next({
        ...this.pageInfo.value,
        has_next_page: data.page_info.has_next_page,
        end_cursor: data.page_info.end_cursor,
      });
    });
  }

  getMessagesBefore() {
    this._getMessagesBefore().subscribe((data) => {
      this.messages.next([...data.page.map((page) => page.data), ...this.messages.value]);
      this.pageInfo.next({
        ...this.pageInfo.value,
        has_previous_page: data.page_info.has_previous_page,
        start_cursor: data.page_info.start_cursor,
      });
    });
  }

  addMessage(message: IUserMessage) {
    this.messages.next([message, ...this.messages.value]);
  }

  addReply(parent_id: number, reply_message: IUserMessage) {
    const messages = this.messages.value.map((message) => {
      if (message.id === parent_id) {
        message.user_messages = [...message.user_messages, reply_message];
      }
      return message;
    });
    this.messages.next(messages);
  }

  handleChatChannel() {
    this.chatChannel.on('message', (data) => {
      switch (data.action) {
        case 'set_permissions':
          this.permittedActions.next(data.permitted_actions);
          break;
        case 'add':
          this.addMessage(data.user_message);
          break;
        case 'reply':
          this.addReply(data.parent_id, data.user_message);
          break;
        case 'flag':
          if (data.parent_type === 'Discussion') {
            const messages = this.messages.value.map((message) => {
              if (message.id === data.parent_id) {
                message.flags_count += data.flag;
              }
              return message;
            });
            this.messages.next(messages);
          } else if (data.parent_type === 'UserMessage') {
            const messages = this.messages.value.map((message) => {
              if (message.id === data.parent_id) {
                message.user_messages = message.user_messages.map((reply) => {
                  if (reply.id === data.user_message_id) {
                    reply.flags_count += data.flag;
                  }
                  return reply;
                });
              }
              return message;
            });
            this.messages.next(messages);
          }
          break;
        case 'delete_any':
        case 'delete_self':
          if (data.parent_type === 'Discussion') {
            const messages = this.messages.value.filter((message) => message.id !== data.user_message_id);
            this.messages.next(messages);
          } else if (data.parent_type === 'UserMessage') {
            const messages = this.messages.value.map((message) => {
              if (message.id === data.parent_id) {
                message.user_messages = message.user_messages.filter((reply) => reply.id !== data.user_message_id);
              }
              return message;
            });
            this.messages.next(messages);
          }
          break;
        case 'error':
          this.toastrService.warningDialog(data.message, 2000);
          break;
      }
    });
  }

  findMessageIndex(messageId: number) {
    return this.messages.value.findIndex((message) => message.id === messageId);
  }

  findReplyIndex(messageId: number, replyId: number) {
    return this.messages.value[this.findMessageIndex(messageId)].user_messages.findIndex(
      (reply) => reply.id === replyId,
    );
  }

  private _getMessages() {
    switch (this._discussionParent) {
      case 'builds':
        return this.discussionService.getCommunityBuildMessages(this._discussionId, { limit: 10 });
      default:
        return from([]);
    }
  }

  private _getMessagesBefore(): Observable<IPagination<IUserMessage>> {
    if (this.pageInfo.value.has_previous_page) {
      switch (this._discussionParent) {
        case 'builds':
          return this.discussionService.getCommunityBuildMessages(this._discussionId, {
            limit: 10,
            before: this.pageInfo.value.start_cursor,
          });
        default:
          return from([]);
      }
    }

    return from([]);
  }

  private _getMessagesAfter(): Observable<IPagination<IUserMessage>> {
    if (this.pageInfo.value.has_next_page) {
      switch (this._discussionParent) {
        case 'builds':
          return this.discussionService.getCommunityBuildMessages(this._discussionId, {
            limit: 10,
            after: this.pageInfo.value.end_cursor,
          });
        default:
          return from([]);
      }
    }

    return from([]);
  }
}
