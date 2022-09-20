import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPoll } from '@commudle/shared-models';

@Component({
  selector: 'commudle-poll-form',
  templateUrl: './poll-form.component.html',
  styleUrls: ['./poll-form.component.scss']
})
export class PollFormComponent implements OnInit {
  @Input() poll: IPoll;
  @Output() pollData = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  submitPoll(pollData) {
    this.pollData.emit(pollData);
  }

}
