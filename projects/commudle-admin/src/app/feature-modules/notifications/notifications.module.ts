import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsPopoverComponent } from './components/notifications-popover/notifications-popover.component';
import { NotificationsPageComponent } from './components/notifications-page/notifications-page.component';
import { NbBadgeModule, NbCardModule, NbIconModule, NbListModule } from '@nebular/theme';
import { InfiniteScrollModule } from 'projects/shared-modules/infinite-scroll/infinite-scroll.module';

@NgModule({
  declarations: [NotificationsPopoverComponent, NotificationsPageComponent],
  imports: [
    CommonModule,
    InfiniteScrollModule,

    //Nebular
    NbListModule,
    NbCardModule,
    NbIconModule,
    NbBadgeModule,
  ],
  exports: [NotificationsPopoverComponent, NotificationsPageComponent],
})
export class NotificationsModule {}
