import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { NotificationsService } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/notifications.service';
import { NotificationsStore } from 'projects/commudle-admin/src/app/feature-modules/notifications/store/notifications.store';
import { SeoService } from 'projects/shared-services/seo.service';

@Component({
  selector: 'app-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.scss'],
})
export class NotificationsPageComponent implements OnInit, OnDestroy {
  trackMarkAllAsRead = false;

  constructor(
    private notificationsService: NotificationsService,
    private seoService: SeoService,
    private nbToastrService: NbToastrService,
    private notificationsStore: NotificationsStore,
  ) {}

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
    this.notificationsService.markAllAsRead().subscribe((res) => {
      if (res) {
        this.nbToastrService.success('All notifications marked as read', 'Success');
        this.trackMarkAllAsRead = !this.trackMarkAllAsRead;
        this.notificationsStore.reduceUserUnreadNotificationsCount();
      }
    });
  }
}
