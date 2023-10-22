import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomPageService } from 'apps/commudle-admin/src/app/services/custom-page.service';
import { ICustomPage } from 'apps/shared-models/custom-page.model';
import { Subscription, combineLatest } from 'rxjs';

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
    combineLatest([this.activatedRoute.params, this.activatedRoute.parent.data]).subscribe(([params, data]) => {
      const pageSlug = params.page_slug;
      const communityId = data.community.id;
      this.getCustomPage(pageSlug, communityId);
    });
  }

  getCustomPage(pageSlug, communityId) {
    this.subscriptions.push(
      this.customPageService.getPShow(pageSlug, communityId, 'Kommunity').subscribe((data) => {
        this.page = data;
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
