import { Component, Input, OnInit } from '@angular/core';
import { ISpeakerResource } from '@commudle/shared-models';

@Component({
  selector: 'commudle-user-past-event-card',
  templateUrl: './user-past-event-card.component.html',
  styleUrls: ['./user-past-event-card.component.scss'],
})
export class UserPastEventCardComponent implements OnInit {
  @Input() pastEvent: ISpeakerResource;

  constructor() {}

  ngOnInit(): void {}
}
