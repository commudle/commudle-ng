import { ICommunity, IUser } from '@commudle/shared-models';

export type MentionModel = 'community' | 'user';
export type MentionResult = (ICommunity | IUser) & { model: MentionModel };

export interface IMention {
  results: MentionResult[];
}
