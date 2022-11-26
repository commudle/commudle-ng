import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationsStore } from 'apps/commudle-admin/src/app/feature-modules/notifications/store/notifications.store';
import { SeoService } from 'apps/shared-services/seo.service';

@Component({
  selector: 'app-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.scss'],
})
export class NotificationsPageComponent implements OnInit, OnDestroy {
  trackMarkAllAsRead = false;
  result;

  constructor(private seoService: SeoService, private notificationsStore: NotificationsStore) {}

  ngOnInit(): void {
    this.seoService.noIndex(true);
    this.seoService.setTags(
      'Notifications',
      'View all notifications',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }

  ngOnDestroy(): void {
    this.seoService.noIndex(false);
  }

  markAllAsRead() {
    this.result = this.notificationsStore.markAllAsRead();
    if (this.result) {
      this.trackMarkAllAsRead = !this.trackMarkAllAsRead;
    }
  }
}
