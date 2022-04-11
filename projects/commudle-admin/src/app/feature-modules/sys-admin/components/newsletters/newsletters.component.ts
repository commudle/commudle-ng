import { Component, OnInit } from '@angular/core';
import { MainNewslettersService } from 'projects/commudle-admin/src/app/feature-modules/main-newsletters/services/main-newsletters.service';
import { IMainNewsletter } from 'projects/shared-models/main-newsletter.model';

@Component({
  selector: 'app-newsletters',
  templateUrl: './newsletters.component.html',
  styleUrls: ['./newsletters.component.scss']
})
export class NewslettersComponent implements OnInit {

  newsletters: IMainNewsletter[] = [];

  constructor(
    private mainNewslettersService: MainNewslettersService
  ) { }

  ngOnInit(): void {
    this.getPublishedNewsletters();
  }

  //ALERT: the string must always be in HTML format
  getFirstImageUrl(data: string): string {
    let element = document.createElement('div');
    element.innerHTML = data;
    let images = element.getElementsByTagName('img');
    return images[0].src;
  }

  getPublishedNewsletters() {
    this.mainNewslettersService.publishedNewsletters().subscribe((data) => {
      this.newsletters = data.main_newsletters;
    })
  }
}
