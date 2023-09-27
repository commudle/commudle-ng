import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdd, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'commudle-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {
  @Input() answers: string[];
  showAnswers = [];
  faAdd = faAdd;
  faMinus = faMinus;

  @Input() questions: string[] = [
    'Do I need to purchase any other platform when I setup a Community on Commudle?',
    'How many Communities can I host on Commudle?',
    "I'm looking to build a career in DevRel, how can Commudle be useful in that?",
    'I want to display activities from Commudle on my website, is it possible?',
    'Will you help me migrate from other platforms?',
    'I lead a Design Community, is Commudle for me?',
    'Does Commudle support paid ticket events?',
  ];
  constructor() {}

  ngOnInit(): void {}

  toggleShowAnswers(index: number) {
    this.showAnswers[index] = !this.showAnswers[index];
  }
}
