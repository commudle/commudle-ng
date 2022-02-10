import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage-card',
  templateUrl: './homepage-card.component.html',
  styleUrls: ['./homepage-card.component.scss'],
})
export class HomepageCardComponent implements OnInit {
  @Input() content: { title: string; subtitle: string; image: string };

  constructor() {}

  ngOnInit(): void {}
}
