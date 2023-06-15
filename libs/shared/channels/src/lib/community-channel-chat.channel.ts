import { Channel } from '@anycable/web';
import { IUserMessage } from '@commudle/shared-models';

type Params = {
  room: number;
};

const ACTIONS = {
  SET_PERMISSIONS: 'set_permissions',
  ADD: 'add',
  REPLY: 'reply',
  VOTE: 'vote',
  FLAG: 'flag',
  DELETE_ANY: 'delete_any',
  DELETE_SELF: 'delete_self',
  ERROR: 'error',
  BLOCKED: 'blocked',
} as const;

type Message = {
  action: (typeof ACTIONS)[keyof typeof ACTIONS];
  permitted_actions: (typeof ACTIONS)[keyof typeof ACTIONS][];
  user_message: IUserMessage;
  cursor: string;
  user_message_id: number;
  parent_id: number;
  parent_type: 'UserMessage' | 'Discussion';
  flag: -1 | 0 | 1;
  message: string;
};

export class CommunityChannelChatChannel extends Channel<Params, Message> {
  static identifier = 'ApplicationCable::V2::Channels::DiscussionCommunityChannelChannel';

  async add(content: string) {
    return this.perform('receive', {
      perform: ACTIONS.ADD,
      data: {
        user_message: { content },
      },
    });
  }

  async reply(parentId: number, content: string) {
    return this.perform('receive', {
      perform: ACTIONS.REPLY,
      data: {
        user_message_id: parentId,
        reply_message: { content },
      },
    });
  }

  async flag(messageId: number) {
    return this.perform('receive', {
      perform: ACTIONS.FLAG,
      data: {
        user_message_id: messageId,
      },
    });
  }

  async deleteSelf(messageId: number) {
    return this.perform('receive', {
      perform: ACTIONS.DELETE_SELF,
      data: {
        user_message_id: messageId,
      },
    });
  }

  async deleteAny(messageId: number) {
    return this.perform('receive', {
      perform: ACTIONS.DELETE_ANY,
      data: {
        user_message_id: messageId,
      },
    });
  }
}
