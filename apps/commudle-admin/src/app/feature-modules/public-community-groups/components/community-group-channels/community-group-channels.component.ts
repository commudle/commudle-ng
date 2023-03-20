import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-community-group-channels',
  templateUrl: './community-group-channels.component.html',
  styleUrls: ['./community-group-channels.component.scss'],
})
export class CommunityGroupChannelsComponent implements OnInit {
  channels;
  subscriptions: Subscription[] = [];
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe((data) => {
        // this.getCommunities(data.community_group_id);
        this.channels = [
          {
            name: 'explore',
            membersCount: 40,
          },
          {
            name: 'Enrich',
            membersCount: 50,
          },
          {
            name: 'Testing',
            membersCount: 80,
          },
        ];
      }),
    );
  }
}
