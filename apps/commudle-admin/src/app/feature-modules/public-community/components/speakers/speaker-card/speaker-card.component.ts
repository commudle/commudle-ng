import {Component, Input, OnInit} from '@angular/core';
import {IUser} from '@commudle/shared-models';

@Component({
  selector: 'commudle-speaker-card',
  templateUrl: './speaker-card.component.html',
  styleUrls: ['./speaker-card.component.scss'],
})
export class SpeakerCardComponent implements OnInit {

  @Input() speaker: IUser;

  constructor() {
  }

  ngOnInit(): void {
  }

}
