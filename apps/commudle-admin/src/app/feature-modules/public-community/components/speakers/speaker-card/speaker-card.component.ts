import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'apps/shared-models/user.model';

@Component({
  selector: 'app-speaker-card',
  templateUrl: './speaker-card.component.html',
  styleUrls: ['./speaker-card.component.scss'],
})
export class SpeakerCardComponent implements OnInit {
  @Input() speaker: IUser;
  @Input() maxUserNameLength = 20;
  @Input() isMobileWidthFull = false;
  tags: string[] = [];

  constructor() {}

  ngOnInit(): void {}

  getTagNames() {
    for (const tag of this.speaker.tags) {
      this.tags.push(tag.name);
    }
    return this.tags;
  }
}
