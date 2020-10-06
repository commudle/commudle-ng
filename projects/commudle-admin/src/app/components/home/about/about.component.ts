import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit() {
    this.setMeta();
  }

  setMeta() {
    this.title.setTitle('About');
    this.meta.updateTag({ name: 'description', content: `We aim to provide a platform where all the amazing content, ranging from slides, to sessions (even links to those) are all at one place. We want to know what those amazing side projects you have built, even if it's yet to be given those finishing touches.`});


    this.meta.updateTag({ name: 'og:image', content: 'https://commudle.com/assets/images/commudle-logo192.png' });
    this.meta.updateTag({ name: 'og:image:secure_url', content: 'https://commudle.com/assets/images/commudle-logo192.png' });
    this.meta.updateTag({ name: 'og:title', content: `About` });
    this.meta.updateTag({ name: 'og:description', content: `We aim to provide a platform where all the amazing content, ranging from slides, to sessions (even links to those) are all at one place. We want to know what those amazing side projects you have built, even if it's yet to be given those finishing touches.`});
    this.meta.updateTag( { name: 'og:type', content: 'website'});

    this.meta.updateTag({ name: 'twitter:image', content: 'https://commudle.com/assets/images/commudle-logo192.png' });
    this.meta.updateTag({ name: 'twitter:title', content: `About` });
    this.meta.updateTag({ name: 'twitter:description', content: `We aim to provide a platform where all the amazing content, ranging from slides, to sessions (even links to those) are all at one place. We want to know what those amazing side projects you have built, even if it's yet to be given those finishing touches.`});
  }



}
