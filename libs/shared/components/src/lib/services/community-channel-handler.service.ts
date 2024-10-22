import { Injectable } from '@angular/core';
import { CommunityChannelChatChannel } from '@commudle/shared-channels';
import { IPage, IPageInfo, IPagination, IUserMessage } from '@commudle/shared-models';
import { CableService, DiscussionService, ToastrService } from '@commudle/shared-services';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { CommunityChannelsService } from '@commudle/shared-services';
@Injectable({
  providedIn: 'root',
})
export class CommunityChannelHandlerService {
  CommunityChannelChatChannel!: CommunityChannelChatChannel;
  scrollToMessageId!: number;

  private messages = new BehaviorSubject<IPage<IUserMessage>[]>([]);
  messages$ = this.messages.asObservable();

  private pinnedMessages = new BehaviorSubject<IUserMessage[]>([]);
  pinnedMessages$ = this.pinnedMessages.asObservable();

  private isMessageLoading = new BehaviorSubject<boolean>(true);
  isMessageLoading$ = this.isMessageLoading.asObservable();

  private permittedActions = new BehaviorSubject<string[]>([]);
  permittedActions$ = this.permittedActions.asObservable();

  private pageInfo = new BehaviorSubject<IPageInfo>({
    has_previous_page: false,
    has_next_page: false,
    start_cursor: '',
    end_cursor: '',
  });
  pageInfo$ = this.pageInfo.asObservable();

  private loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();

  private _discussionParent = '';
  private _discussionId!: number;

  constructor(
    private discussionService: DiscussionService,
    private cableService: CableService,
    private toastrService: ToastrService,
    private communityChannelsService: CommunityChannelsService,
  ) {}

  init(discussionId: number, discussionParent: string, fromLastRead?: boolean, after?: string) {
    this._discussionId = discussionId;
    this._discussionParent = discussionParent;

    if (after) {
      this.pageInfo.next({
        has_previous_page: false,
        start_cursor: '',
        has_next_page: true,
        end_cursor: after,
      });
      this.getMessagesAround();
    } else {
      this.getMessages(fromLastRead);
    }

    this.CommunityChannelChatChannel = new CommunityChannelChatChannel({ room: this._discussionId });
    this.cableService.subscribe(this.CommunityChannelChatChannel);

    this.handleChatChannel();
  }

  destroy() {
    this.CommunityChannelChatChannel.disconnect();
    this.messages.next([]);
    this.permittedActions.next([]);
    this.pageInfo.next({
      has_previous_page: false,
      has_next_page: false,
      start_cursor: '',
      end_cursor: '',
    });
    this.scrollToMessageId = undefined;
  }

  sendMessage(content: string) {
    // if (!this.permittedActions.value.includes('add') || this.permittedActions.value.includes('blocked')) {
    //   return;
    // }

    this.CommunityChannelChatChannel.add(content);
  }

  sendReply(parentId: number, content: string) {
    if (this.permittedActions.value.includes('blocked')) {
      return;
    }

    this.CommunityChannelChatChannel.reply(parentId, content);
  }

  sendFlag(messageId: number) {
    if (!this.permittedActions.value.includes('flag') || this.permittedActions.value.includes('blocked')) {
      return;
    }

    this.CommunityChannelChatChannel.flag(messageId);
  }

  sendDelete(messageId: number) {
    if (this.permittedActions.value.includes('blocked')) {
      return;
    }

    this.CommunityChannelChatChannel.delete(messageId);
  }

  pin(messageId: number) {
    this.CommunityChannelChatChannel.pin(messageId);
  }

  unPin(messageId: number) {
    this.CommunityChannelChatChannel.unPin(messageId);
  }

  edit(message: IUserMessage, update_message) {
    this.CommunityChannelChatChannel.update(message.id, update_message);
  }

  addMessage(message: IUserMessage, cursor: string) {
    this.messages.next([{ data: message, cursor }, ...this.messages.value]);
  }

  addReply(parent_id: number, reply_message: IUserMessage) {
    const messages = this.messages.value.map((message) => {
      if (message.data.id === parent_id) {
        message.data.user_messages = [...message.data.user_messages, reply_message];
      }
      return message;
    });
    this.messages.next(messages);
  }

  pinnedMessage(channelOrFormId) {
    this.communityChannelsService.getPinnedMessages(channelOrFormId).subscribe((data) => {
      this.pinnedMessages.next(data);
    });
  }

  updatePinnedMessage(message: IUserMessage) {
    const currentPinnedMessages = this.pinnedMessages.getValue();
    const updatedPinnedMessages = [...currentPinnedMessages, message];

    this.pinnedMessages.next(updatedPinnedMessages);
  }

  removePinnedMessage(message: IUserMessage) {
    const currentPinnedMessages = this.pinnedMessages.getValue();
    const updatedPinnedMessages = currentPinnedMessages.filter((msg) => msg !== message);

    this.pinnedMessages.next(updatedPinnedMessages);
  }

  handleChatChannel() {
    this.CommunityChannelChatChannel.on('message', (data) => {
      switch (data.action) {
        case 'set_permissions':
          this.permittedActions.next(data.permitted_actions);
          break;
        case 'add':
          this.addMessage(data.user_message, data.cursor);
          break;
        case 'reply':
          this.addReply(data.parent_id, data.user_message);
          break;
        case 'flag':
          if (data.parent_type === 'Discussion') {
            const messages = this.messages.value.map((message) => {
              if (message.data.id === data.user_message_id) {
                message.data.flags_count += data.flag;
              }
              return message;
            });
            this.messages.next(messages);
            // eslint-disable-next-line no-dupe-else-if
          } else if (data.parent_type === 'Discussion') {
            const messages = this.messages.value.map((message) => {
              if (message.data.id === data.parent_id) {
                message.data.user_messages = message.data.user_messages.map((reply) => {
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
        case 'delete':
          if (data.parent_type === 'Discussion') {
            const messages = this.messages.value.filter((message) => message.data.id !== data.user_message_id);
            this.messages.next(messages);
          }
          break;

        case 'update':
          if (data.parent_type === 'Discussion') {
            const messages = this.messages.value.filter((message) => {
              if (message.data.id === data.user_message.id) {
                message.data.content = data.user_message.content;
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

  getMessages(fromLastRead?: boolean) {
    // if (!this.loading.value) {
    this.loading.next(true);
    this._getMessages(fromLastRead).subscribe((data) => {
      this.messages.next(data.page);
      this.pageInfo.next(data.page_info);
      this.isMessageLoading.next(false);
      // TODO: FInd a better way to do this
      if (fromLastRead && !this.scrollToMessageId) {
        if (this.messages.value.map((message) => message.data.read).includes(false)) {
          this.scrollToMessageId = this.messages.value[this.messages.value.length - 1].data.id;
        } else {
          this.scrollToMessageId = 0;
        }
      }
      this.loading.next(false);
    });
    // }
  }

  getMessagesAfter() {
    if (!this.loading.value) {
      this.loading.next(true);
      this._getMessagesAfter().subscribe((data) => {
        this.messages.next([...this.messages.value, ...data.page]);
        this.pageInfo.next({
          ...this.pageInfo.value,
          has_next_page: data.page_info.has_next_page,
          end_cursor: data.page_info.end_cursor,
        });
        this.loading.next(false);
      });
    } else {
      this.loading.next(false);
    }
  }

  getMessagesBefore() {
    if (!this.loading.value) {
      this.loading.next(true);
      this._getMessagesBefore().subscribe((data) => {
        this.messages.next([...data.page, ...this.messages.value]);
        this.pageInfo.next({
          ...this.pageInfo.value,
          has_previous_page: data.page_info.has_previous_page,
          start_cursor: data.page_info.start_cursor,
        });
        this.loading.next(false);
      });
    }
  }

  getMessagesAround() {
    if (!this.loading.value) {
      this.loading.next(false);
      // TODO: Make this better
      this._getMessagesAfter().subscribe((data) => {
        this.isMessageLoading.next(true);
        this.messages.next(data.page);
        this.pageInfo.next(data.page_info);
        this._getMessagesBefore().subscribe((value) => {
          this.messages.next([...value.page, ...this.messages.value]);
          this.pageInfo.next({
            ...this.pageInfo.value,
            has_previous_page: value.page_info.has_previous_page,
            start_cursor: value.page_info.start_cursor,
          });
          this.scrollToMessageId = value.page[value.page.length - 1]?.data?.id || data.page[0]?.data?.id || 0;
          this.loading.next(false);
        });
      });
    }
  }

  private _getMessages(fromLastRead?: boolean) {
    switch (this._discussionParent) {
      case 'channels':
        return this.discussionService.getCommunityBuildMessages(this._discussionId, { limit: 10 }, fromLastRead);
      default:
        return from([]);
    }
  }

  private _getMessagesBefore(): Observable<IPagination<IUserMessage>> {
    if (this.pageInfo.value.has_previous_page) {
      switch (this._discussionParent) {
        case 'channels':
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
        case 'channels':
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
