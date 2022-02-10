import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage-banner',
  templateUrl: './homepage-banner.component.html',
  styleUrls: ['./homepage-banner.component.scss'],
})
export class HomepageBannerComponent implements OnInit {
  @Input() content: {
    title: string;
    buttonText: string;
    image: string;
    type: string;
  };

  constructor() {}

  ngOnInit(): void {}
}
