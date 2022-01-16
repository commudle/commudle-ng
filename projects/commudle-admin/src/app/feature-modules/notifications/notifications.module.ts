import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsPopoverComponent } from './components/notifications-popover/notifications-popover.component';
import { NotificationsPageComponent } from './components/notifications-page/notifications-page.component';
import { NbBadgeModule, NbCardModule, NbIconModule, NbListModule } from '@nebular/theme';
import { InfiniteScrollModule } from 'projects/shared-modules/infinite-scroll/infinite-scroll.module';
import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationsListComponent } from './components/notifications-list/notifications-list.component';

@NgModule({
  declarations: [NotificationsPopoverComponent, NotificationsPageComponent, NotificationsListComponent],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    NotificationRoutingModule,

    //Nebular
    NbListModule,
    NbCardModule,
    NbIconModule,
    NbBadgeModule,
  ],
  exports: [NotificationsPopoverComponent, NotificationsPageComponent],
})
export class NotificationsModule {}
