import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunityGroup } from '@commudle/shared-models';
import { FooterService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-community-group-home',
  templateUrl: './community-group-home.component.html',
  styleUrls: ['./community-group-home.component.scss'],
})
export class CommunityGroupHomeComponent implements OnInit, OnDestroy {
  communityGroup: ICommunityGroup;
  private subscriptions = [];

  constructor(private activatedRoute: ActivatedRoute, private footerService: FooterService) {}

  ngOnInit() {
    this.footerService.changeFooterStatus(false);
    this.subscriptions.push(
      this.activatedRoute.data.subscribe((data) => {
        this.communityGroup = data.community_group;
      }),
    );
  }

  ngOnDestroy() {
    this.footerService.changeFooterStatus(true);

    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }
}
