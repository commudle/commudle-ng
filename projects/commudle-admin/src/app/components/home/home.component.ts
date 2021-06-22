import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private meta: Meta,
    private title: Title
  ) {
  }

  ngOnInit() {
    this.setMeta();
  }

  setMeta() {
    this.title.setTitle('Commudle - Find & Connect With Developers');

    this.meta.updateTag({
      name: 'description',
      content: 'Learn from developer experts around you & grow with developer communities. Login to begin!'
    });
    this.meta.updateTag({
      name: 'og:image',
      content: 'https://commudle.com/assets/images/commudle-logo192.png'
    });
    this.meta.updateTag({
      name: 'og:image:secure_url', content: 'https://commudle.com/assets/images/commudle-logo192.png'
    });
    this.meta.updateTag({
      name: 'og:title',
      content: 'Commudle - Find & Connect With Developers'
    });
    this.meta.updateTag({
      name: 'og:description',
      content: 'Learn from developer experts around you & grow with developer communities. Login to begin!'
    });
    this.meta.updateTag({
      name: 'og:type',
      content: 'website'
    });
    this.meta.updateTag({
      name: 'twitter:image',
      content: 'https://commudle.com/assets/images/commudle-logo192.png'
    });
    this.meta.updateTag({
      name: 'twitter:title',
      content: 'Commudle - Find & Connect With Developers'
    });
    this.meta.updateTag({
      name: 'twitter:description',
      content: 'Learn from developer experts around you & grow with developer communities. Login to begin!'
    });
  }

  getWindowWidth(): number {
    return window.innerWidth;
  }

}
