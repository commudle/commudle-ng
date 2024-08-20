import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'commudle-speaker-slides-card',
  templateUrl: './speaker-slides-card.component.html',
  styleUrls: ['./speaker-slides-card.component.scss'],
})
export class SpeakerSlidesCardComponent implements OnInit {
  @Input() item: any;
  constructor() {}

  ngOnInit(): void {}
}
