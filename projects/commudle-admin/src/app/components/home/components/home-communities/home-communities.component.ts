import {Component, OnInit} from '@angular/core';
import {ICommunity} from 'projects/shared-models/community.model';
import {HomeService} from 'projects/commudle-admin/src/app/services/home.service';

@Component({
  selector: 'app-home-communities',
  templateUrl: './home-communities.component.html',
  styleUrls: ['./home-communities.component.scss']
})
export class HomeCommunitiesComponent implements OnInit {

  communities: ICommunity[] = [];

  constructor(
    private homeService: HomeService
  ) {
  }

  ngOnInit(): void {
    this.getCommunities()
  }

  getCommunities(): void {
    this.homeService.communities().subscribe(value => this.communities = value.communities);
  }

}
