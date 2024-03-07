import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFaq } from '@commudle/shared-models';
import { faAdd, faMinus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'commudle-faq-card',
  templateUrl: './faq-card.component.html',
  styleUrls: ['./faq-card.component.scss'],
})
export class FaqCardComponent implements OnInit {
  @Input() faq: IFaq;
  @Input() isAdmin = false;
  @Output() destroyFaqEvent: EventEmitter<IFaq> = new EventEmitter();
  @Output() editFaqEvent: EventEmitter<IFaq> = new EventEmitter();
  showAnswers = [];
  icons = { faAdd, faMinus, faTrash, faEdit };

  showAnswer = false;

  constructor() {}

  ngOnInit() {}

  toggleShowAnswers() {
    this.showAnswer = !this.showAnswer;
  }
  deleteFaq(faq) {
    this.destroyFaqEvent.emit(faq);
  }
  editFaq(faq) {
    this.editFaqEvent.emit(faq);
  }
}
