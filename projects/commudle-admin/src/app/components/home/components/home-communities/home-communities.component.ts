import {Component, OnInit} from '@angular/core';
import {ICommunity} from 'projects/shared-models/community.model';

@Component({
  selector: 'app-home-communities',
  templateUrl: './home-communities.component.html',
  styleUrls: ['./home-communities.component.scss']
})
export class HomeCommunitiesComponent implements OnInit {

  communities: ICommunity[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  getCommunities(): void {

  }

}
