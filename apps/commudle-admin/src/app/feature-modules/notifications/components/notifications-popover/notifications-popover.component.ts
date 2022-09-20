import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'commudle-notifications-popover',
  templateUrl: './notifications-popover.component.html',
  styleUrls: ['./notifications-popover.component.scss'],
})
export class NotificationsPopoverComponent implements OnInit {
  @Output() closePopover: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
