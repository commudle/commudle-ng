import { Component, OnInit } from '@angular/core';
import { CommunityBuildsService } from 'apps/commudle-admin/src/app/services/community-builds.service';
import { IUser } from 'apps/shared-models/user.model';

@Component({
  selector: 'commudle-builds-top-builders',
  templateUrl: './builds-top-builders.component.html',
  styleUrls: ['./builds-top-builders.component.scss'],
})
export class BuildsTopBuildersComponent implements OnInit {
  topBuilders: IUser[] = [];
  page = 1;
  count = 10;
  total: number;
  isLoading = false;
  canLoadMore = true;
  timePeriod: string;
  month = false;
  year = false;
  allTime = false;
  options;
  constructor(private communityBuildsService: CommunityBuildsService) {
    this.options = ['This Month', 'This Year', 'All Time'];
  }

  ngOnInit(): void {
    this.getCommunityBuilds();
  }

  // getCommunityBuilds() {
  //   if (!this.isLoading && (!this.total || this.topBuilders.length < this.total)) {
  //     this.isLoading = true;
  //     this.communityBuildsService
  //       .pGetTopBuilders(this.count, this.page, this.month, this.year, this.allTime)
  //       .subscribe((data) => {
  //         this.topBuilders = data;
  //         console.log(this.topBuilders);
  //         //       this.page += 1;
  //         //       this.total = data.total;
  //         //       this.isLoading = false;
  //         //       if (this.topBuilders.length >= this.total) {
  //         //         this.canLoadMore = false;
  //         //       }
  //       });
  //   }
  // }

  filterByTags(event) {
    if (event === this.options[0]) {
      this.month = !this.month;
      this.year = false;
      this.allTime = false;
    }
    if (event === this.options[1]) {
      this.month = false;
      this.year = !this.year;
      this.allTime = false;
    }
    if (event === this.options[2]) {
      this.month = false;
      this.year = false;
      this.allTime = !this.allTime;
    }
    this.total = 0;
    this.page = 1;
    this.getCommunityBuilds();
  }

  getCommunityBuilds() {
    this.isLoading = true;
    this.communityBuildsService
      .pGetTopBuilders(this.count, this.page, this.month, this.year, this.allTime)
      .subscribe((data) => {
        this.isLoading = false;
        this.topBuilders = data.users;
        this.page = +data.page;
        this.total = data.total;
      });
  }
}
