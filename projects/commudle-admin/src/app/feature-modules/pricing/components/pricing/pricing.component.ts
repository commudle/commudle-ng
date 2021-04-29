import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit, OnDestroy {

  constructor(
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    this.setMeta();
  }

  ngOnDestroy() {
    this.meta.removeTag("name='robots'");
  }

  setMeta() {
    // TODO Remove noindex
    this.meta.updateTag({
      name: 'robots',
      content: 'noindex'
    });
    this.title.setTitle('Pricing & Features');
    this.meta.updateTag({
      name: 'description',
      content: 'Plans for all Developer Communities, student, individual, non-profite and enterprise!'
    });
    this.meta.updateTag({name: 'og:image', content: 'https://commudle.com/assets/images/commudle-logo192.png'});
    this.meta.updateTag({name: 'og:image:secure_url', content: 'https://commudle.com/assets/images/commudle-logo192.png'});
    this.meta.updateTag({name: 'og:title', content: 'Pricing & Features'});
    this.meta.updateTag({
      name: 'og:description',
      content: 'Plans for all Developer Communities, student, individual, non-profite and enterprise!'
    });
    this.meta.updateTag({name: 'og:type', content: 'website'});

    this.meta.updateTag({name: 'twitter:image', content: 'https://commudle.com/assets/images/commudle-logo192.png'});
    this.meta.updateTag({name: 'twitter:title', content: 'Pricing & Features'});
    this.meta.updateTag({
      name: 'twitter:description',
      content: 'Plans for all Developer Communities, student, individual, non-profite and enterprise!'
    });
  }

}
