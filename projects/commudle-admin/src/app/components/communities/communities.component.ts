import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { IsBrowserService } from 'projects/shared-services/is-browser.service';

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss'],
  providers: [IsBrowserService],
})
export class CommunitiesComponent implements OnInit {
  windowWidth: number;

  constructor(private title: Title, private meta: Meta, private isBrowserService: IsBrowserService) {}

  ngOnInit(): void {
    this.setMeta();

    if (this.isBrowserService.isBrowser()) {
      this.windowWidth = window.innerWidth;
    }
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
