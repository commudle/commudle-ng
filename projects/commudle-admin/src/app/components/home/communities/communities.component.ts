import { Component, OnInit } from '@angular/core';
import { CommunitiesService } from '../../../services/communities.service';
import { ICommunity } from 'projects/shared-models/community.model';

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss']
})
export class CommunitiesComponent implements OnInit {

  communities: ICommunity[] = [];

  constructor(
    private communitiesService: CommunitiesService
  ) { }

  ngOnInit() {
    this.getAllCommunities();
  }


  getAllCommunities() {
    this.communitiesService.pGetCommunities().subscribe(
      data => {
        this.communities = data.communities;
      }
    );
  }



}
