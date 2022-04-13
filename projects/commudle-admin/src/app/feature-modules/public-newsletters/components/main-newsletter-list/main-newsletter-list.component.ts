import { Component, OnDestroy, OnInit } from '@angular/core';
import { IMainNewsletter } from 'projects/shared-models/main-newsletter.model';
import { Subscription } from 'rxjs';
import { PublicNewslettersService } from 'projects/commudle-admin/src/app/feature-modules/public-newsletters/services/public-newsletters.service';

@Component({
  selector: 'app-newsletters',
  templateUrl: './main-newsletter-list.component.html',
  styleUrls: ['./main-newsletter-list.component.scss']
})
export class MainNewsletterList implements OnInit, OnDestroy {

  newsletters: IMainNewsletter[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private publicNewslettersService: PublicNewslettersService
  ) { }

  ngOnInit(): void {
    this.getPublishedNewsletters();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getFirstImageUrl(data: string): string {
    let element = document.createElement('div');
    element.innerHTML = data;
    let images = element.getElementsByTagName('img');
    return images[0].src;
  }

  getPublishedNewsletters() {
    this.subscriptions.push(
      this.publicNewslettersService.publicIndex().subscribe((data) => {
        this.newsletters = data.main_newsletters;
      })
    )
  }
}
