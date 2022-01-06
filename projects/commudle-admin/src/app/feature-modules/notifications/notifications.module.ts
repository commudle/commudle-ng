import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbBadgeModule, NbCardModule, NbIconModule, NbListModule } from '@nebular/theme';
import { InfiniteScrollModule } from 'projects/shared-modules/infinite-scroll/infinite-scroll.module';
import { NotificationsPageComponent } from './components/notifications-page/notifications-page.component';
import { NotificationsPopoverComponent } from './components/notifications-popover/notifications-popover.component';
import { NotificationRoutingModule } from './notification-routing.module';

@NgModule({
  declarations: [NotificationsPopoverComponent, NotificationsPageComponent],
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
