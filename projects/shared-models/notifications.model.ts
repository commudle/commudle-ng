import { INotification } from './notification.model';

export interface INotifications {
  notifications: INotification[];
  count: Number;
  page: Number;
  total: Number;
}
