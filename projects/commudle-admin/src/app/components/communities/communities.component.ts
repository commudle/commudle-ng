import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss'],
})
export class CommunitiesComponent implements OnInit {
  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.setMeta();
  }

  setMeta(): void {
    this.title.setTitle('Communities & Experts');
    this.meta.updateTag({
      name: 'description',
      content: `Find the Developer Communities you want to join, or build your own! Grow your Developer network.`,
    });

    this.meta.updateTag({ name: 'og:image', content: 'https://commudle.com/assets/images/commudle-logo192.png' });
    this.meta.updateTag({
      name: 'og:image:secure_url',
      content: 'https://commudle.com/assets/images/commudle-logo192.png',
    });
    this.meta.updateTag({ name: 'og:title', content: `Communities & Experts` });
    this.meta.updateTag({
      name: 'og:description',
      content: `Find the Developer Communities you want to join, or build your own! Grow your Developer network.`,
    });
    this.meta.updateTag({ name: 'og:type', content: 'website' });

    this.meta.updateTag({ name: 'twitter:image', content: 'https://commudle.com/assets/images/commudle-logo192.png' });
    this.meta.updateTag({ name: 'twitter:title', content: `Communities & Experts` });
    this.meta.updateTag({
      name: 'twitter:description',
      content: `Find the Developer Communities you want to join, or build your own! Grow your Developer network.`,
    });
  }
}
