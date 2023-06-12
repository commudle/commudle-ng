import { Component, Input, OnInit } from '@angular/core';
import { CommunityBuildsService } from 'apps/commudle-admin/src/app/services/community-builds.service';

@Component({
  selector: 'commudle-featured-projects',
  templateUrl: './featured-projects.component.html',
  styleUrls: ['./featured-projects.component.scss'],
})
export class FeaturedProjectsComponent implements OnInit {
  @Input() communityBuild;
  constructor() {}

  ngOnInit(): void {}
}
