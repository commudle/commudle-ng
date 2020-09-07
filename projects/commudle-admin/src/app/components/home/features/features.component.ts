import { Title, Meta } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {

  constructor(
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit() {
    this.setMeta();
  }

  setMeta() {
    this.title.setTitle('Features')
    this.meta.updateTag({
      name: 'description',
      content: 'From being able to manage a large community, to organizing engaging events, commudle has everything!'
    });
    this.meta.updateTag(
      {
        name: 'og:image',
        content: `https://commudle.com/assets/images/commudle-logo192.png`
      });
    this.meta.updateTag(
      {
        name: 'og:image:secure_url',
        content: `https://commudle.com/assets/images/commudle-logo192.png`
      });
    this.meta.updateTag({ name: 'og:title', content: `Features | Commudle` });
    this.meta.updateTag({
      name: 'og:description',
      content: 'From being able to manage a large community, to organizing engaging events, commudle has everything!'
    });
    this.meta.updateTag({ name: 'og:type', content: 'website'});

    this.meta.updateTag(
      {
        name: 'twitter:image',
        content: `https://commudle.com/assets/images/commudle-logo192.png`
      });
    this.meta.updateTag(
      { name: 'twitter:title', content: `Features | Commudle` }
      );

    this.meta.updateTag({
      name: 'twitter:description',
      content: 'From being able to manage a large community, to organizing engaging events, commudle has everything!'
    });
  }

}
