import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { faBell, faFlask, faLightbulb, faUser, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { NbPopoverDirective } from '@nebular/theme';
import { NotificationsPopoverComponent } from 'projects/commudle-admin/src/app/feature-modules/notifications/components/notifications-popover/notifications-popover.component';
import { NotificationStateService } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/notification-state.service';
import { NotificationChannel } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/websockets/notification-channel';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss'],
})
export class NavbarMenuComponent implements OnInit, OnDestroy {
  currentUser: ICurrentUser;

  faLightbulb = faLightbulb;
  faFlask = faFlask;
  faUserFriends = faUserFriends;
  faBell = faBell;
  faUser = faUser;

  notificationCount = 0;
  notificationIconHighlight = false;
  notificationsPopoverComponent = NotificationsPopoverComponent;
  @ViewChildren(NbPopoverDirective) popovers: QueryList<NbPopoverDirective>;

  subscriptions: Subscription[] = [];

  constructor(
    private notificationChannel: NotificationChannel,
    private notificationStateService: NotificationStateService,
    private authwatchService: LibAuthwatchService,
  ) {}

  ngOnInit(): void {
    this.receiveData();

    this.authwatchService.currentUser$.subscribe((currentUser) => {
      this.currentUser = currentUser;
    });

    this.subscriptions.push(
      this.notificationStateService.closeNotificationPopover$.subscribe((value) => {
        if (value) {
          this.popovers.forEach((popover) => {
            if (popover.context === 'notificationsPopover') {
              popover.hide();
            }
          });

          this.notificationStateService.setCloseNotificationPopover(false);
        }
      }),
    );

    this.subscriptions.push(
      combineLatest(
        this.notificationStateService.notificationPageState$,
        this.notificationStateService.notificationPopoverState$,
      ).subscribe(([notificationPageState, notificationPopoverState]) => {
        this.notificationIconHighlight = notificationPageState || notificationPopoverState;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  receiveData() {
    this.subscriptions.push(
      this.notificationChannel.notificationData$.subscribe((data) => {
        if (data) {
          switch (data.action) {
            case this.notificationChannel.ACTIONS.NEW_NOTIFICATION: {
              this.notificationCount++;
            }
          }
        }
      }),
    );
  }

  resetCount() {
    if (this.notificationCount > 0) {
      this.notificationCount = 0;
    }
  }
}
