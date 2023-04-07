import { ICommunity, ICommunityBuild, IEvent, ILab, IUser } from '@commudle/shared-models';

export type MentionParent = 'community' | 'event' | 'lab' | 'community_build' | 'user';
export type MentionResult = (ICommunity | IEvent | ILab | ICommunityBuild | IUser) & { parent: MentionParent };

export interface IMention {
  results: MentionResult[];
}
