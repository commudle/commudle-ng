import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'commudle-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {
  @Input() answers: string[];
  showAnswers = false;

  questions: string[] = ['Question 1', 'Question 2', 'Question 3'];
  constructor() {}

  ngOnInit(): void {}

  toggleShowAnswers(index: number) {
    this.showAnswers[index] = !this.showAnswers[index];
  }
}
