import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private meta: Meta, private title: Title) {}

  ngOnInit() {
    this.setMeta();
  }

  setMeta() {
    this.title.setTitle('Commudle - Connect & Learn With Software Developers');

    this.meta.updateTag({
      name: 'description',
      content:
        'A community platform for software developers to connect over online events, channels, share knowledge & find jobs. Join now to build your "Developer Network".',
    });
    this.meta.updateTag({
      name: 'og:image',
      content: 'https://commudle.com/assets/images/commudle-logo192.png',
    });
    this.meta.updateTag({
      name: 'og:image:secure_url',
      content: 'https://commudle.com/assets/images/commudle-logo192.png',
    });
    this.meta.updateTag({
      name: 'og:title',
      content: 'Commudle - Connect & Learn With Software Developers',
    });
    this.meta.updateTag({
      name: 'og:description',
      content:
        'A community platform for software developers to connect over online events, channels, share knowledge & find jobs. Join now to build your "Developer Network".',
    });
    this.meta.updateTag({
      name: 'og:type',
      content: 'website',
    });
    this.meta.updateTag({
      name: 'twitter:image',
      content: 'https://commudle.com/assets/images/commudle-logo192.png',
    });
    this.meta.updateTag({
      name: 'twitter:title',
      content: 'Commudle - Connect & Learn With Software Developers',
    });
    this.meta.updateTag({
      name: 'twitter:description',
      content:
        'A community platform for software developers to connect over online events, channels, share knowledge & find jobs. Join now to build your "Developer Network".',
    });
  }

  getWindowWidth(): number {
    return window.innerWidth;
  }
}
