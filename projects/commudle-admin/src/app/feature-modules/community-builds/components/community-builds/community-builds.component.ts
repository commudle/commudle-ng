import { Component, OnInit } from '@angular/core';
import { CommunityBuildsService } from 'projects/commudle-admin/src/app/services/community-builds.service';

@Component({
  selector: 'app-community-builds',
  templateUrl: './community-builds.component.html',
  styleUrls: ['./community-builds.component.scss']
})
export class CommunityBuildsComponent implements OnInit {

  constructor(
    private communityBuildsService: CommunityBuildsService
  ) { }

  ngOnInit() {
  }

}
