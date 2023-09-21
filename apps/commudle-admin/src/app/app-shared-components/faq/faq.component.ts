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

  questions: string[] = ['Question 1', 'Question 2', 'Question 3'];
  constructor() {}

  ngOnInit(): void {}
}
