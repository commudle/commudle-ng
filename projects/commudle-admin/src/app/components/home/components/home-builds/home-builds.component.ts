import {Component, OnInit} from '@angular/core';
import {ICommunityBuild} from 'projects/shared-models/community-build.model';
import {HomeService} from 'projects/commudle-admin/src/app/services/home.service';

@Component({
  selector: 'app-home-builds',
  templateUrl: './home-builds.component.html',
  styleUrls: ['./home-builds.component.scss']
})
export class HomeBuildsComponent implements OnInit {

  builds: ICommunityBuild[] = [];

  constructor(
    private homeService: HomeService
  ) {
  }

  ngOnInit(): void {
    this.getBuilds();
  }

  getBuilds() {
    this.homeService.pCommunityBuilds().subscribe(value => this.builds = value.community_builds.slice(0, 3));
  }

}
