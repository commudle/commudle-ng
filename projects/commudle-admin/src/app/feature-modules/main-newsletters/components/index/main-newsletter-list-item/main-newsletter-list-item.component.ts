import { IMainNewsletter } from 'projects/shared-models/main-newsletter.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-newsletter-list-item',
  templateUrl: './main-newsletter-list-item.component.html',
  styleUrls: ['./main-newsletter-list-item.component.scss']
})
export class MainNewsletterListItemComponent implements OnInit {
  @Input() newsletter: IMainNewsletter;
  constructor() { }

  ngOnInit(): void {
  }

}
