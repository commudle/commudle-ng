import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'commudle-poll-create-form',
  templateUrl: './poll-create-form.component.html',
  styleUrls: ['./poll-create-form.component.scss'],
})
export class PollCreateFormComponent implements OnInit {
  @Output() newPoll = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  createPoll(pollData) {
    this.newPoll.emit(pollData);
  }
}
