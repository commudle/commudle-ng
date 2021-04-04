import {Component, Input, OnInit} from '@angular/core';
import {ISpeakerResource} from 'projects/shared-models/speaker_resource.model';

@Component({
  selector: 'app-user-past-event-card',
  templateUrl: './user-past-event-card.component.html',
  styleUrls: ['./user-past-event-card.component.scss']
})
export class UserPastEventCardComponent implements OnInit {

  @Input() pastEvent: ISpeakerResource;

  constructor() {
  }

  ngOnInit(): void {
  }

}
