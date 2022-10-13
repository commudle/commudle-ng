import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICommunity } from '@commudle/shared-models';

import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-public-community-notifications',
  templateUrl: './public-community-notifications.component.html',
  styleUrls: ['./public-community-notifications.component.scss'],
})
export class PublicCommunityNotificationsComponent implements OnInit {
  community: ICommunity;

  subscriptions: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.community = data.community;
      }),
    );
  }
}
