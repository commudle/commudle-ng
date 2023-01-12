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
} from '@commudle/theme';
import { InfiniteScrollModule } from 'apps/shared-modules/infinite-scroll/infinite-scroll.module';
import { NotificationsListItemComponent } from './components/notifications-list-item/notifications-list-item.component';
import { NotificationsListComponent } from './components/notifications-list/notifications-list.component';
import { NotificationsPageComponent } from './components/notifications-page/notifications-page.component';
import { NotificationsPopoverComponent } from './components/notifications-popover/notifications-popover.component';
import { NotificationRoutingModule } from './notification-routing.module';
import { CommunityNotificationsComponent } from 'apps/commudle-admin/src/app/feature-modules/notifications/components/community-notifications/community-notifications.component';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';

@NgModule({
  declarations: [
    NotificationsPopoverComponent,
    NotificationsPageComponent,
    NotificationsListComponent,
    NotificationsListItemComponent,
    CommunityNotificationsComponent,
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    InfiniteScrollModule,
    SharedComponentsModule,

    //Nebular
    NbListModule,
    NbCardModule,
    NbIconModule,
    NbBadgeModule,
    NbUserModule,
    NbButtonModule,
    NbTooltipModule,
  ],
  exports: [NotificationsPopoverComponent, NotificationsPageComponent, CommunityNotificationsComponent],
})
export class NotificationsModule {}
