import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunity } from 'apps/shared-models/community.model';

@Component({
  selector: 'commudle-community-channels',
  templateUrl: './community-channels.component.html',
  styleUrls: ['./community-channels.component.scss'],
})
export class CommunityChannelsComponent implements OnInit {
  community: ICommunity;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.community = data.community;
    });
  }
}
