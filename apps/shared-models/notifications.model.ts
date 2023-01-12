import { INotification } from './notification.model';

export interface INotifications {
  notifications: INotification[];
  count: number;
  page: number;
  total: number;
}
