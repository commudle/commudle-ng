import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'commudle-testimonial-card',
  templateUrl: './testimonial-card.component.html',
  styleUrls: ['./testimonial-card.component.scss'],
})
export class TestimonialCardComponent implements OnInit {
  @Input() testimonials: any[];
  constructor() {}

  ngOnInit(): void {}
}
