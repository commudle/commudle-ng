import { IUserMessage } from './user_message.model';

export interface IUserMessages {
  user_messages: IUserMessage[];
  count: number,
  page: number
}
