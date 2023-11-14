import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'commudle-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss'],
})
export class BookPageComponent implements OnInit {
  constructor() {}

  feature1 = {
    image: '',
    heading: 'Measure your performance',
    subheading: 'Stay connected with your team and make quick decisions wherever you are.',
  };

  feature2 = {
    image: '',
    heading: 'Build your website',
    subheading: 'A tool that lets you build a dream website even if you know nothing about web design or programming.',
  };

  ngOnInit(): void {
    console.log(this.feature1.heading);
  }
}
