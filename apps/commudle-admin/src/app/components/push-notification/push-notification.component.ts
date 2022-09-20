import { Component, OnDestroy, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { environment } from '@commudle/shared-environments';
import { ICurrentUser } from '@commudle/shared-models';
import { IsBrowserService, LibAuthwatchService, PushNotificationsService } from '@commudle/shared-services';
import { NbToastrService } from '@nebular/theme';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.scss'],
})
export class PushNotificationComponent implements OnInit, OnDestroy {
  showPopup = false;
  isLoading = false;

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
    this.cookieService.set(this.pushNotificationCookieName, 'false', 5);
  }

  removePushNotificationCookie(): void {
    this.cookieService.delete(this.pushNotificationCookieName);
  }

  listenToPushNotifications(): void {
    this.subscriptions.push(
      this.swPush.subscription.subscribe((subscription: PushSubscription | null) => {
        if (subscription === null) {
          setTimeout(() => {
            this.showPopup = !this.isPushNotificationCookieSet();
          }, 5000);
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
    this.isLoading = true;
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
          this.isLoading = false;
        }
      }),
    );
  }

  rejectPushNotifications(): void {
    this.createSubscription({ endpoint: '', p256dh: '', auth: '' }, 'rejected_by_user');
    this.setPushNotificationCookie();
  }
}
