import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomPageService } from 'apps/commudle-admin/src/app/services/custom-page.service';
import { ICustomPage } from 'apps/shared-models/custom-page.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-custom-page',
  templateUrl: './custom-page.component.html',
  styleUrls: ['./custom-page.component.scss'],
})
export class CustomPageComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  page: ICustomPage;
  constructor(private activatedRoute: ActivatedRoute, private customPageService: CustomPageService) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const pageSlug = params.page_slug;
      this.getCustomPage(pageSlug);
    });
  }

  getCustomPage(pageSlug) {
    this.subscriptions.push(
      this.customPageService.getShow(pageSlug).subscribe((data) => {
        this.page = data;
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
