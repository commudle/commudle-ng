import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EDbModels, ICommunityGroup } from '@commudle/shared-models';

@Component({
  selector: 'commudle-community-group-channel',
  templateUrl: './community-group-channel.component.html',
  styleUrls: ['./community-group-channel.component.scss'],
})
export class CommunityGroupChannelComponent implements OnInit {
  communityGroup: ICommunityGroup;
  EDbModels = EDbModels;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.parent.data.subscribe((data) => {
      this.communityGroup = data.community_group;
    });
  }
}
