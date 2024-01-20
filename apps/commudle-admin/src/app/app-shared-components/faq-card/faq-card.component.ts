import { Component, Input, OnInit } from '@angular/core';
import { IFaq } from '@commudle/shared-models';
import { faAdd, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'commudle-faq-card',
  templateUrl: './faq-card.component.html',
  styleUrls: ['./faq-card.component.scss'],
})
export class FaqCardComponent implements OnInit {
  @Input() faq: IFaq;
  showAnswers = [];
  icons = { faAdd, faMinus };

  showAnswer = false;

  constructor() {}

  ngOnInit() {}

  toggleShowAnswers() {
    this.showAnswer = !this.showAnswer;
  }
}
