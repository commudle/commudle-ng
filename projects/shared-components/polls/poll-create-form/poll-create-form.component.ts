import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { IQuestionType } from 'projects/shared-models/question_type.model';


@Component({
  selector: 'app-poll-create-form',
  templateUrl: './poll-create-form.component.html',
  styleUrls: ['./poll-create-form.component.scss']
})
export class PollCreateFormComponent implements OnInit {

  @Output() newPoll = new EventEmitter();

  constructor(
  ) { }

  ngOnInit() {

  }

  createPoll(pollData) {
    this.newPoll.emit(pollData);
  }

}
