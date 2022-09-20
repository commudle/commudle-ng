import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ENotificationParentTypes } from '@commudle/shared-models';
import { ENotificationSenderTypes } from '@commudle/shared-models';
import { INotificationMessage } from '@commudle/shared-models';

@Component({
  selector: 'commudle-notifications-list-item',
  templateUrl: './notifications-list-item.component.html',
  styleUrls: ['./notifications-list-item.component.scss'],
})
export class NotificationsListItemComponent implements OnInit, OnChanges {
  @Input() notificationMessage: INotificationMessage[] = [];

  @Output() notificationClicked: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.notificationMessage) {
      this.replaceLinkValue();
    }
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
