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
  UPDATE: 'update',
  FLAG: 'flag',
  DELETE: 'delete',
  TOGGLE_BLOCK: 'toggle_block',
  ERROR: 'error',
  CHANGE_PERMISSION: 'change_permission',
  READ_MESSAGE: 'read_message',
  PIN: 'pin',
  UNPIN: 'unpin',
} as const;

type Message = {
  action: (typeof ACTIONS)[keyof typeof ACTIONS];
  permitted_actions: (typeof ACTIONS)[keyof typeof ACTIONS][];
  user_message: IUserMessage;
  cursor: string;
  user_message_id: number;
  parent_id: number;
  parent_type: 'Discussion';
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

  async delete(messageId: number) {
    return this.perform('receive', {
      perform: ACTIONS.DELETE,
      data: {
        user_message_id: messageId,
      },
    });
  }

  async vote(messageId: number) {
    return this.perform('receive', {
      perform: ACTIONS.VOTE,
      data: {
        user_message_id: messageId,
      },
    });
  }

  async update(messageId: number, content: string) {
    return this.perform('receive', {
      perform: ACTIONS.UPDATE,
      data: {
        user_message_id: messageId,
        user_message: { content },
      },
    });
  }

  async block(messageId: number) {
    return this.perform('receive', {
      perform: ACTIONS.TOGGLE_BLOCK,
      data: {
        user_message_id: messageId,
      },
    });
  }

  async error(messageId: number) {
    return this.perform('receive', {
      perform: ACTIONS.ERROR,
      data: {
        user_message_id: messageId,
      },
    });
  }

  async ChangePermission(messageId: number) {
    return this.perform('receive', {
      perform: ACTIONS.CHANGE_PERMISSION,
      data: {
        user_message_id: messageId,
      },
    });
  }

  async ReadMessage(messageId: number) {
    return this.perform('receive', {
      perform: ACTIONS.READ_MESSAGE,
      data: {
        user_message_id: messageId,
      },
    });
  }

  async pin(messageId: number) {
    return this.perform('receive', {
      perform: ACTIONS.PIN,
      data: {
        user_message_id: messageId,
      },
    });
  }

  async unPin(messageId: number) {
    return this.perform('receive', {
      perform: ACTIONS.UNPIN,
      data: {
        user_message_id: messageId,
      },
    });
  }
}
