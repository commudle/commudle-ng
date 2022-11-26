import { Component, OnDestroy, OnInit } from '@angular/core';
import { IMainNewsletter } from 'apps/shared-models/main-newsletter.model';
import { SeoService } from 'apps/shared-services/seo.service';
import { MainNewslettersService } from '../../services/main-newsletters.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit, OnDestroy {
  page = 1;
  count = 10;
  newsletters: IMainNewsletter[];
  isLoading = true;

  constructor(private mainNewsLettersService: MainNewslettersService, private seoService: SeoService) {}

  ngOnInit(): void {
    this.getNewsLetters();
    this.seoService.noIndex(true);
  }

  ngOnDestroy(): void {
    this.seoService.noIndex(false);
  }

  getNewsLetters() {
    this.isLoading = true;
    this.mainNewsLettersService.adminIndex(this.page, this.count).subscribe((data) => {
      this.newsletters = data.main_newsletters;
      this.page += 1;
      this.isLoading = false;
    });
  }
}
