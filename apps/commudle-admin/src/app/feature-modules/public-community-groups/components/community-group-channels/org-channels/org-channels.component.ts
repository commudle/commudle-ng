import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunityGroup, EDbModels } from '@commudle/shared-models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-org-channels',
  templateUrl: './org-channels.component.html',
  styleUrls: ['./org-channels.component.scss'],
})
export class OrgChannelsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  communityGroup: ICommunityGroup;
  EDbModels = EDbModels;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.parent.parent.data.subscribe((data) => {
        this.communityGroup = data.community_group;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
