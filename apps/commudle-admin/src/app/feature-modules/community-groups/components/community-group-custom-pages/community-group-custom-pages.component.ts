import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EDbModels } from '@commudle/shared-models';
import { ICommunityGroup } from 'apps/shared-models/community-group.model';

@Component({
  selector: 'commudle-community-group-custom-pages',
  templateUrl: './community-group-custom-pages.component.html',
  styleUrls: ['./community-group-custom-pages.component.scss'],
})
export class CommunityGroupCustomPagesComponent implements OnInit {
  communityGroup: ICommunityGroup;
  EDbModels = EDbModels;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.parent.parent.data.subscribe((data) => {
      this.communityGroup = data.community_group;
    });
  }
}
