import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { NbToastrService } from '@nebular/theme';
import { environment } from 'projects/commudle-admin/src/environments/environment';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { IsBrowserService } from 'projects/shared-services/is-browser.service';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { PushNotificationsService } from 'projects/shared-services/push-notifications.service';

@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.scss'],
})
export class PushNotificationComponent implements OnInit {
  isSubscribed = true;
  isSubscribing = false;

  constructor(
    private swPush: SwPush,
    private authWatchService: LibAuthwatchService,
    private isBrowserService: IsBrowserService,
    private pushNotificationsService: PushNotificationsService,
    private nbToastrService: NbToastrService,
  ) {}

  ngOnInit(): void {
    this.authWatchService.currentUser$.subscribe((currentUser: ICurrentUser) => {
      if (this.isBrowserService.isBrowser() && currentUser) {
        this.checkSubscription();
      }
    });
  }

  checkSubscription(): void {
    this.pushNotificationsService.checkSubscription().subscribe((isSubscribed: boolean) => {
      this.isSubscribed = isSubscribed;
    });
  }

  subscribeToPushNotifications(): void {
    this.isSubscribing = true;
    this.swPush
      .requestSubscription({ serverPublicKey: environment.vapid_public_key })
      .then((sub: PushSubscription) => {
        this.pushNotificationsService
          .createSubscription({
            endpoint: sub.endpoint,
            p256dh: sub.toJSON().keys.p256dh,
            auth: sub.toJSON().keys.auth,
          })
          .subscribe((value) => {
            if (value) {
              this.isSubscribed = value;
              this.isSubscribing = false;
              this.nbToastrService.success("You've successfully subscribed to push notifications!", 'Success');
            }
          });
      })
      .catch((err) => {
        console.error('Could not subscribe to notifications', err);
        this.nbToastrService.danger('Could not subscribe to notifications', 'Error');
      });
  }

  cancelPushNotifications(): void {
    this.pushNotificationsService.createSubscription({ endpoint: '', p256dh: '', auth: '' }).subscribe();
  }
}
