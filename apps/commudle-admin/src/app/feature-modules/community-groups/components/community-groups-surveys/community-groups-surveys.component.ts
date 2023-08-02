import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'commudle-community-groups-surveys',
  templateUrl: './community-groups-surveys.component.html',
  styleUrls: ['./community-groups-surveys.component.scss'],
})
export class CommunityGroupsSurveysComponent implements OnInit {
  parentId;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.parent.data.subscribe((data) => {
      if (data.community_group) {
        this.parentId = data.community_group.slug;
      }
    });
  }
}
