import { Channel } from '@anycable/web';

type Params = {
  votable_type: string;
  votable_id: number;
};

const ACTIONS = {
  SET_PERMISSIONS: 'set_permissions',
  TOGGLE_VOTE: 'toggle_vote',
  ERROR: 'error',
  BLOCKED: 'blocked',
} as const;

type Message = {
  action: (typeof ACTIONS)[keyof typeof ACTIONS];
  permitted_actions: (typeof ACTIONS)[keyof typeof ACTIONS][];
  increment: boolean;
  user_id: number;
};

export class VoteChannel extends Channel<Params, Message> {
  static identifier = 'ApplicationCable::V2::Channels::VoteChannel';

  async toggleVote(votableType, votableId) {
    return this.perform('receive', {
      perform: ACTIONS.TOGGLE_VOTE,
      data: {
        votable_type: votableType,
        votable_id: votableId,
      },
    });
  }
}
