import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NoWhitespaceValidator } from 'projects/shared-helper-modules/custom-validators.validator';

@Component({
  selector: 'app-send-message-form',
  templateUrl: './send-message-form.component.html',
  styleUrls: ['./send-message-form.component.scss']
})
export class SendMessageFormComponent implements OnInit {
  @Input() disabled: boolean;
  @Output() sendMessage = new EventEmitter();

  sendUserMessageForm = this.fb.group({
    content: [
      '', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(200),
          NoWhitespaceValidator
        ]
      ]
  });


  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  emitMessage() {
    this.sendMessage.emit(this.sendUserMessageForm.value);
    this.sendUserMessageForm.reset();
  }

}
