import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbListModule,
  NbTooltipModule,
  NbUserModule,
} from '@nebular/theme';
import { InfiniteScrollModule } from 'projects/shared-modules/infinite-scroll/infinite-scroll.module';
import { NotificationsListItemComponent } from './components/notifications-list-item/notifications-list-item.component';
import { NotificationsListComponent } from './components/notifications-list/notifications-list.component';
import { NotificationsPageComponent } from './components/notifications-page/notifications-page.component';
import { NotificationsPopoverComponent } from './components/notifications-popover/notifications-popover.component';
import { NotificationRoutingModule } from './notification-routing.module';
import { CommunityNotificationComponent } from 'projects/commudle-admin/src/app/feature-modules/notifications/components/community-notification/community-notification.component';

@NgModule({
  declarations: [
    NotificationsPopoverComponent,
    NotificationsPageComponent,
    NotificationsListComponent,
    NotificationsListItemComponent,
    CommunityNotificationComponent,
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    InfiniteScrollModule,

    //Nebular
    NbListModule,
    NbCardModule,
    NbIconModule,
    NbBadgeModule,
    NbUserModule,
    NbButtonModule,
    NbTooltipModule,
  ],
  exports: [NotificationsPopoverComponent, NotificationsPageComponent, CommunityNotificationComponent],
})
export class NotificationsModule {}
