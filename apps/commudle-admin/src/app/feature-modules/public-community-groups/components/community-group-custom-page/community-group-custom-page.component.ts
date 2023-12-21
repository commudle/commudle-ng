import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomPageService } from 'apps/commudle-admin/src/app/services/custom-page.service';
import { ICustomPage } from 'apps/shared-models/custom-page.model';
import { Subscription, combineLatest } from 'rxjs';

@Component({
  selector: 'commudle-community-group-custom-page',
  templateUrl: './community-group-custom-page.component.html',
  styleUrls: ['./community-group-custom-page.component.scss'],
})
export class CommunityGroupCustomPageComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  page: ICustomPage;

  constructor(private activatedRoute: ActivatedRoute, private customPageService: CustomPageService) {}

  ngOnInit() {
    combineLatest([this.activatedRoute.params, this.activatedRoute.parent.data]).subscribe(([params, data]) => {
      const pageSlug = params.page_slug;
      const communityGroupId = data.community_group.slug;
      this.getCustomPage(pageSlug, communityGroupId);
    });
  }

  getCustomPage(pageSlug, communityGroupId) {
    this.subscriptions.push(
      this.customPageService.getPShow(pageSlug, communityGroupId, 'CommunityGroup').subscribe((data) => {
        this.page = data;
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
