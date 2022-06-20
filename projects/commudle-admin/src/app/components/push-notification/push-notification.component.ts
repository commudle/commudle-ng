import { Component, OnDestroy, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { NbToastrService } from '@nebular/theme';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'projects/commudle-admin/src/environments/environment';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { IsBrowserService } from 'projects/shared-services/is-browser.service';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { PushNotificationsService } from 'projects/shared-services/push-notifications.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.scss'],
})
export class PushNotificationComponent implements OnInit, OnDestroy {
  showPopup = false;

  subscriptions: Subscription[] = [];

  private pushNotificationCookieName = 'commudle_push_notification';

  constructor(
    private swPush: SwPush,
    private cookieService: CookieService,
    private authWatchService: LibAuthwatchService,
    private isBrowserService: IsBrowserService,
    private pushNotificationsService: PushNotificationsService,
    private nbToastrService: NbToastrService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.authWatchService.currentUser$.subscribe((currentUser: ICurrentUser) => {
        if (currentUser && this.isBrowserService.isBrowser()) {
          if (this.swPush.isEnabled) {
            this.listenToPushNotifications();
          } else {
            this.createSubscription({ endpoint: '', p256dh: '', auth: '' }, 'rejected_by_browser');
          }
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  isPushNotificationCookieSet(): boolean {
    return this.cookieService.check(this.pushNotificationCookieName);
  }

  setPushNotificationCookie(): void {
    this.cookieService.set(this.pushNotificationCookieName, 'false');
  }

  removePushNotificationCookie(): void {
    this.cookieService.delete(this.pushNotificationCookieName);
  }

  listenToPushNotifications(): void {
    this.subscriptions.push(
      this.swPush.subscription.subscribe((subscription: PushSubscription | null) => {
        if (subscription === null) {
          this.showPopup = !this.isPushNotificationCookieSet();
        } else {
          this.createSubscription({
            endpoint: subscription.endpoint,
            p256dh: subscription.toJSON().keys.p256dh,
            auth: subscription.toJSON().keys.auth,
          });
          this.removePushNotificationCookie();
        }
      }),
    );
  }

  acceptPushNotifications(): void {
    this.swPush.requestSubscription({ serverPublicKey: environment.vapid_public_key }).catch(() => {
      this.nbToastrService.danger('Could not subscribe to notifications', 'Error');
      this.createSubscription({ endpoint: '', p256dh: '', auth: '' }, 'rejected_by_browser');
    });
  }

  createSubscription(subscription: { endpoint: string; p256dh: string; auth: string }, reason: string = ''): void {
    this.subscriptions.push(
      this.pushNotificationsService.createSubscription(subscription, reason).subscribe((value) => {
        if (value) {
          this.showPopup = false;
        }
      }),
    );
  }

  rejectPushNotifications(): void {
    this.createSubscription({ endpoint: '', p256dh: '', auth: '' }, 'rejected_by_user');
    this.setPushNotificationCookie();
  }
}
