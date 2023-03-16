import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-community-group-channels',
  templateUrl: './community-group-channels.component.html',
  styleUrls: ['./community-group-channels.component.scss'],
})
export class CommunityGroupChannelsComponent implements OnInit {
  subscriptions: Subscription[] = [];
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe((data) => {
        console.log(data);
        // this.getCommunities(data.community_group_id);
      }),
    );
  }
}
