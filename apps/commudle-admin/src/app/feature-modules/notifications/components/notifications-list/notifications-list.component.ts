import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import * as moment from 'moment';
import { ENotificationStatuses } from 'apps/shared-models/enums/notification_statuses.enum';
import { INotification } from 'apps/shared-models/notification.model';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { NotificationsStore } from 'apps/commudle-admin/src/app/feature-modules/notifications/store/notifications.store';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { ENotificationSenderTypes } from 'apps/shared-models/enums/notification_sender_types.enum';
import { GoogleTagManagerService } from 'apps/commudle-admin/src/app/services/google-tag-manager.service';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss'],
})
export class NotificationsListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() markAllAsRead: boolean;
  @Output() closePopover: EventEmitter<any> = new EventEmitter();

  @ViewChild('notificationRef') notificationRef: ElementRef;

  currentUser: ICurrentUser;

  notifications: INotification[] = [];

  page = 1;
  count = 10;
  total: number;
  isLoading = false;
  canLoadMore = true;
  showLoader = false;

  ENotificationStatuses = ENotificationStatuses;
  ENotificationSenderTypes = ENotificationSenderTypes;
  moment = moment;

  subscriptions: Subscription[] = [];

  constructor(
    private notificationsStore: NotificationsStore,
    private authWatchService: LibAuthwatchService,
    private gtm: GoogleTagManagerService,
  ) {}

  ngOnInit(): void {
    this.authWatchService.currentUser$.subscribe((currentUser: ICurrentUser) => {
      this.currentUser = currentUser;
    });

    this.getNotifications();
    this.receiveData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.markAllAsRead) {
      this.notifications.forEach((notification) => (notification.status = ENotificationStatuses.READ));
    }
  }

  ngAfterViewInit() {
    const options = {
      root: null,
      threshold: 1,
    };

    const observer = new IntersectionObserver(this.checkIntersection.bind(this), options);
    observer.observe(this.notificationRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  checkIntersection(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.showLoader = true;
      } else {
        this.showLoader = false;
      }
    });
  }

  changeStatus(status: ENotificationStatuses, notification: INotification) {
    this.notificationsStore.changeStatus(status, notification);
    if (status === ENotificationStatuses.INTERACTED) {
      this.closePopover.emit();
    } else {
      this.gtmService();
    }
  }

  getNotifications() {
    if (!this.total || this.notifications.length < this.total) {
      if (this.isLoading) {
        return;
      } else {
        this.notificationsStore.getUserNotifications(this.page, this.count);
        this.isLoading = true;
        this.subscriptions.push(
          this.notificationsStore.userNotifications$.subscribe((value) => {
            if (value.notifications) {
              this.notifications = _.uniqBy(this.notifications.concat(value.notifications), 'id');
              this.page++;
              this.total = value.total;
              this.isLoading = false;
              if (this.notifications.length >= this.total) {
                this.canLoadMore = false;
              }
            }
          }),
        );
      }
    }
  }

  receiveData() {
    this.subscriptions.push(
      this.notificationsStore.newUserNotifications$.subscribe((data) => {
        if (this.notifications.length != 0 && this.currentUser.id == data.filter_object_id) {
          if (!this.notifications.find((notification) => notification.id == data.id)) {
            this.notifications.unshift(data);
          }
        }
      }),
    );

    this.subscriptions.push(
      this.notificationsStore.updateUserNotifications$.subscribe((data) => {
        const idx = this.notifications.findIndex((notification) => notification.id === data.notification_queue_id);
        if (idx != -1) {
          this.notifications[idx].status = data;
        }
      }),
    );
  }

  gtmService() {
    this.gtm.dataLayerPushEvent('click-notification-mark-as-read', {
      com_notification_type: this.ENotificationSenderTypes.USER,
    });
  }
}
