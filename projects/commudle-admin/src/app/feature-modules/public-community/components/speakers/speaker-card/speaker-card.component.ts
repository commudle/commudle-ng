import {Component, Input, OnInit} from '@angular/core';
import {IUser} from 'projects/shared-models/user.model';

@Component({
  selector: 'app-speaker-card',
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
