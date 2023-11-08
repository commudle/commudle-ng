import { Component, OnInit } from '@angular/core';
import { NewsletterService } from 'apps/commudle-admin/src/app/services/newsletter.service';
import { INewsletter } from 'apps/shared-models/newsletter.model';

@Component({
  selector: 'commudle-newsletter-form',
  templateUrl: './newsletter-form.component.html',
  styleUrls: ['./newsletter-form.component.scss'],
})
export class NewsletterFormComponent implements OnInit {
  constructor(private newsletterService: NewsletterService) {}

  ngOnInit() {}
}
