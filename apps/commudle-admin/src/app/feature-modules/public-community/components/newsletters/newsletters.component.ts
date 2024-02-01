import { Component, OnInit } from '@angular/core';
import { INewsletter } from 'apps/shared-models/newsletter.model';
import { NewsletterService } from 'apps/commudle-admin/src/app/services/newsletter.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ICommunity } from '@commudle/shared-models';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'commudle-newsletters',
  templateUrl: './newsletters.component.html',
  styleUrls: ['./newsletters.component.scss'],
})
export class NewslettersComponent implements OnInit {
  subscriptions: Subscription[] = [];
  newsletters: INewsletter[];
  community: ICommunity;
  icons = {
    faArrowRight,
  };
  constructor(private newsletterService: NewsletterService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.parent.parent.data.subscribe((data) => {
        this.community = data.community;
        this.getNewsletters();
      }),
    );
  }

  getNewsletters() {
    this.subscriptions.push(
      this.newsletterService.getPIndex(this.community.id, 'Kommunity').subscribe((data) => {
        this.newsletters = data;
      }),
    );
  }
}
