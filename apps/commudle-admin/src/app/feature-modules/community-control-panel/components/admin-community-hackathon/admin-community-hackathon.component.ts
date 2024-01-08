import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'commudle-admin-community-hackathon',
  templateUrl: './admin-community-hackathon.component.html',
  styleUrls: ['./admin-community-hackathon.component.scss'],
})
export class AdminCommunityHackathonComponent implements OnInit {
  parentId: number;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.parentId = this.activatedRoute.parent.parent.snapshot.params.community_id;
  }
}
