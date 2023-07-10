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
  speakersTagsLength: number;
  tags: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.speakersTagsLength = Object.keys(this.speaker.tags).length;
  }

  getTagNames() {
    this.tags = Object.values(this.speaker.tags).map((tag) => tag.name);
    return this.tags;
  }
}
