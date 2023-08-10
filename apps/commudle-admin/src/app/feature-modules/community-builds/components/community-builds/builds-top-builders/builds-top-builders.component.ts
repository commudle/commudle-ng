import { Component, Input, OnInit } from '@angular/core';
import { CommunityBuildsService } from 'apps/commudle-admin/src/app/services/community-builds.service';
import { IUser } from 'apps/shared-models/user.model';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';
import { LabsService } from 'apps/commudle-admin/src/app/feature-modules/labs/services/labs.service';

@Component({
  selector: 'commudle-builds-top-builders',
  templateUrl: './builds-top-builders.component.html',
  styleUrls: ['./builds-top-builders.component.scss'],
})
export class BuildsTopBuildersComponent implements OnInit {
  @Input() backgroundColor: string;
  @Input() heading: string;
  @Input() subHeading: string;
  @Input() parentType: string;
  @Input() toolTipText: string;
  topBuilders: IUser[] = [];
  page = 1;
  count = 5;
  total: number;
  isLoading = false;
  canLoadMore = true;
  timePeriod: string;
  month = true;
  year = false;
  allTime = false;
  options;
  staticAssets = staticAssets;
  showSkeletonCard = true;
  showSpinner = false;

  constructor(private communityBuildsService: CommunityBuildsService, private labsService: LabsService) {
    this.options = ['This Month', 'This Year', 'All Time'];
  }

  ngOnInit(): void {
    switch (this.parentType) {
      case 'builds': {
        this.getCommunityBuilds();
        break;
      }
      case 'labs': {
        this.getLabs();
        break;
      }
    }
  }

  getCommunityBuilds() {
    if (!this.isLoading && (!this.total || this.topBuilders.length < this.total)) {
      this.isLoading = true;
      this.communityBuildsService
        .pGetTopBuilders(this.count, this.page, this.month, this.year, this.allTime)
        .subscribe((data) => {
          this.topBuilders = this.topBuilders.concat(data.users);
          this.page += 1;
          this.total = data.total;
          this.showSkeletonCard = false;
          this.isLoading = false;
          this.showSpinner = false;
          if (this.topBuilders.length >= this.total) {
            this.canLoadMore = false;
          }
        });
    }
  }

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
    this.showSkeletonCard = true;
    this.page = 1;
    this.topBuilders = [];
    this.parentType === 'builds' ? this.getCommunityBuilds() : this.getLabs();
  }

  getLabs() {
    if (!this.isLoading && (!this.total || this.topBuilders.length < this.total)) {
      this.isLoading = true;
      this.labsService.pGetTopBuilders(this.count, this.page, this.month, this.year, this.allTime).subscribe((data) => {
        this.topBuilders = this.topBuilders.concat(data.users);
        this.page += 1;
        this.total = data.total;
        this.showSkeletonCard = false;
        this.isLoading = false;
        this.showSpinner = false;
        if (this.topBuilders.length >= this.total) {
          this.canLoadMore = false;
        }
      });
    }
  }
}
