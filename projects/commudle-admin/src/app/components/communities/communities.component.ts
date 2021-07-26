import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss'],
})
export class CommunitiesComponent implements OnInit {
  windowWidth: number;

  constructor(private title: Title, private meta: Meta, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.setMeta();
    this.windowWidth = window.innerWidth;
  }

  setMeta(): void {
    this.title.setTitle('All Communities');
    this.meta.updateTag({ name: 'description', content: `Over 90 Communities and 20,000 Users are using Commudle.` });

    this.meta.updateTag({ name: 'og:image', content: 'https://commudle.com/assets/images/commudle-logo192.png' });
    this.meta.updateTag({
      name: 'og:image:secure_url',
      content: 'https://commudle.com/assets/images/commudle-logo192.png',
    });
    this.meta.updateTag({ name: 'og:title', content: `All Communities` });
    this.meta.updateTag({
      name: 'og:description',
      content: `Over 90 Communities and 20,000 Users are using Commudle.`,
    });
    this.meta.updateTag({ name: 'og:type', content: 'website' });

    this.meta.updateTag({ name: 'twitter:image', content: 'https://commudle.com/assets/images/commudle-logo192.png' });
    this.meta.updateTag({ name: 'twitter:title', content: `All Communities` });
    this.meta.updateTag({
      name: 'twitter:description',
      content: `Over 90 Communities and 20,000 Users are using Commudle.`,
    });
  }
}
