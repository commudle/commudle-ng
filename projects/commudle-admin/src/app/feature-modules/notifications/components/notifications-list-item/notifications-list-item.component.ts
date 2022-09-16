import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ENotificationParentTypes } from 'projects/shared-models/enums/notification_parent_types.enum';
import { ENotificationSenderTypes } from 'projects/shared-models/enums/notification_sender_types.enum';
import { INotificationMessage } from 'projects/shared-models/notification.model';
import { ENotificationStatuses } from 'projects/shared-models/enums/notification_statuses.enum';

@Component({
  selector: 'app-notifications-list-item',
  templateUrl: './notifications-list-item.component.html',
  styleUrls: ['./notifications-list-item.component.scss'],
})
export class NotificationsListItemComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() notificationMessage: INotificationMessage[] = [];

  @Output() notificationClicked: EventEmitter<any> = new EventEmitter();

  @ViewChild('viewPort') viewPort: ElementRef;

  @Output() markRead: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.notificationMessage) {
      this.replaceLinkValue();
    }
  }

  ngAfterViewInit() {
    const threshold = 1; // how much % of the element is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              this.markRead.emit(); // emit the function to mark message as read
            }, 5000); // time for 5 Sec
            observer.disconnect(); // disconnect if you want to stop observing else it will rerun every time its back in view.
          }
        });
      },
      { threshold },
    );
    observer.observe(this.viewPort.nativeElement); //observe the native element
  }

  // handlebar replacement value using path
  getValue(path: string, content: any) {
    const value = path.split('.');
    return value.reduce((acc, curr) => acc[curr], content);
  }

  replaceLinkValue() {
    this.notificationMessage
      .filter((message) => message.type === 'link' && message.value.startsWith('{{') && message.value.endsWith('}}'))
      .forEach((message) => {
        message.value = this.getValue(message.value.replace(/{{|}}/g, ''), message);
      });
  }

  redirectTo(notificationMessage: INotificationMessage) {
    let value = notificationMessage.sender || notificationMessage.entity || notificationMessage.parent;
    let type = notificationMessage.sender_type || notificationMessage.entity_type || notificationMessage.parent_type;
    let slug = value['username'] || value['slug'];

    switch (type) {
      case ENotificationSenderTypes.USER:
        this.router.navigate(['/users', slug]);
        break;
      case ENotificationParentTypes.COMMUNITY_BUILD:
        this.router.navigate(['/builds', slug]);
        break;
      case ENotificationParentTypes.LAB:
        this.router.navigate(['/labs', slug]);
        break;
    }

    this.notificationClicked.emit();
  }
}
