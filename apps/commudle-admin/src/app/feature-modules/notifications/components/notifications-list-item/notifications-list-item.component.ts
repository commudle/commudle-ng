import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ENotificationEntityTypes } from 'apps/shared-models/enums/notification_entity_types.enum';
import { GoogleTagManagerService } from 'apps/commudle-admin/src/app/services/google-tag-manager.service';
import { ENotificationParentTypes } from 'apps/shared-models/enums/notification_parent_types.enum';
import { ENotificationSenderTypes } from 'apps/shared-models/enums/notification_sender_types.enum';
import { INotification, INotificationMessage } from 'apps/shared-models/notification.model';

@Component({
  selector: 'app-notifications-list-item',
  templateUrl: './notifications-list-item.component.html',
  styleUrls: ['./notifications-list-item.component.scss'],
})
export class NotificationsListItemComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  timeout: any;
  observer: any;
  @Input() notificationMessage: INotificationMessage[] = [];
  @Input() notification: INotification;
  @Input() ENotificationStatusesUnread: boolean;
  @Input() notificationType;

  @Output() notificationClicked: EventEmitter<any> = new EventEmitter();

  @ViewChild('notificationRef') notificationRef: ElementRef;

  @Output() markRead: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router, private gtm: GoogleTagManagerService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.notificationMessage) {
      this.replaceLinkValue();
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      clearTimeout(this.timeout);
      this.observer.disconnect();
    }
  }

  ngAfterViewInit() {
    // TODO: change to use dedicated library
    if (this.ENotificationStatusesUnread === true) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.timeout = setTimeout(() => {
                this.markRead.emit(); // emit the function to mark message as read
              }, 5000);
            } else {
              clearTimeout(this.timeout);
            }
          });
        },
        { threshold: 1 }, // how much % of the element is in view
      );
      this.observer.observe(this.notificationRef.nativeElement);
    }
  }

  // handlebar replacement value using path
  getValue(path: string, content: any) {
    const value = path.split('.');
    return value.reduce((acc, curr) => acc[curr], content);
  }

  replaceLinkValue() {
    this.notificationMessage
      .filter((message) => message.value.startsWith('{{') && message.value.endsWith('}}'))
      .forEach((message) => {
        message.value = this.getValue(message.value.replace(/{{|}}/g, ''), message);
      });
  }

  redirectTo(notificationMessage: INotificationMessage) {
    const value =
      notificationMessage.sender ||
      notificationMessage.entity ||
      notificationMessage.parent ||
      notificationMessage.owner;
    const type =
      notificationMessage.sender_type ||
      notificationMessage.entity_type ||
      notificationMessage.parent_type ||
      notificationMessage.owner_type;
    const slug = value['username'] || value['slug'] || value['id'];
    let addQueryParams = true;
    let url: any[] = [];
    switch (type) {
      case ENotificationSenderTypes.USER:
        url = ['/users', slug];
        addQueryParams = false;
        break;
      case ENotificationParentTypes.COMMUNITY_BUILD:
        url = ['/builds', slug];
        break;
      case ENotificationParentTypes.LAB:
        url = ['/labs', slug];
        break;
      case ENotificationParentTypes.KOMMUNITY:
        url = ['/communities', slug];
        addQueryParams = false;
        break;
      case ENotificationParentTypes.EVENT:
        url = ['/event', slug];
        break;
      case ENotificationParentTypes.JOB:
        addQueryParams = false;
        url = ['/jobs', slug];
        break;
    }

    this.gtmService();
    if (
      addQueryParams &&
      this.notification.entity_type == ENotificationEntityTypes.USER_MESSAGE &&
      this.notification.entity_id
    ) {
      this.router.navigate(url, { queryParams: { user_message_id: this.notification.entity_id } });
    } else {
      this.router.navigate(url);
    }

    this.notificationClicked.emit();
  }

  gtmService() {
    this.gtm.dataLayerPushEvent('click-notification', { com_notification_type: this.notificationType });
  }
}
