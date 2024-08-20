import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'commudle-speaker-slides',
  templateUrl: './speaker-slides.component.html',
  styleUrls: ['./speaker-slides.component.scss'],
})
export class SpeakerSlidesComponent implements OnInit {
  speakerSlides = [];
  skeletonLoaderCard = true;
  total = 0;
  loading = true;

  constructor() {}

  ngOnInit(): void {}

  getSpeakersSlidesList() {}
}
