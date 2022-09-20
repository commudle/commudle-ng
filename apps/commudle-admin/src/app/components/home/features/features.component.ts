import { Component, OnInit } from '@angular/core';
import { SeoService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.setTags(
      'Features',
      'From being able to manage a large community, to organizing engaging events, commudle has everything!',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }
}
