import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsPopoverComponent } from './components/notifications-popover/notifications-popover.component';
import { NotificationsPageComponent } from './components/notifications-page/notifications-page.component';
import { NbCardModule, NbListModule } from '@nebular/theme';

@NgModule({
  declarations: [NotificationsPopoverComponent, NotificationsPageComponent],
  imports: [
    CommonModule,

    //Nebular
    NbListModule,
    NbCardModule,
  ],
  exports: [NotificationsPopoverComponent, NotificationsPageComponent],
})
export class NotificationsModule {}
