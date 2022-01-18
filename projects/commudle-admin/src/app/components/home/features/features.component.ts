import { SeoService } from 'projects/shared-services/seo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {

  constructor(
    private seoService : SeoService,
  ) { }

  ngOnInit() {
    this.setMeta();
  }

  setMeta() {

    this.seoService.setTags(
      'Features',
      'From being able to manage a large community, to organizing engaging events, commudle has everything!',
      'https://commudle.com/assets/images/commudle-logo192.png'
    );
  }

}
