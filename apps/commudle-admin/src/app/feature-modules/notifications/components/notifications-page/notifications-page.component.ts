import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { NotificationsService } from 'apps/commudle-admin/src/app/feature-modules/notifications/services/notifications.service';
import { SeoService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.scss'],
})
export class NotificationsPageComponent implements OnInit, OnDestroy {
  trackMarkAllAsRead = false;

  constructor(
    private notificationsService: NotificationsService,
    private seoService: SeoService,
    private nbToastrService: NbToastrService,
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
      }
    });
  }
}
