import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotificationsPageComponent } from './components/notifications-page/notifications-page.component';

const routes = [
  {
    path: '',
    component: NotificationsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationRoutingModule {}