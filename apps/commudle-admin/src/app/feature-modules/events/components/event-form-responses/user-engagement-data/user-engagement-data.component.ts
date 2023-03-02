import { Component, Input, OnInit } from '@angular/core';
import { UserCommunityEngagementDataService } from 'apps/commudle-admin/src/app/services/user-community-engagement-data.service';
import { IUser } from 'apps/shared-models/user.model';
import { IUserCommunityEngagementData } from 'apps/shared-models/user_community_engagement_data.model';

@Component({
  selector: 'app-user-engagement-data',
  templateUrl: './user-engagement-data.component.html',
  styleUrls: ['./user-engagement-data.component.scss'],
})
export class UserEngagementDataComponent implements OnInit {
  @Input() user: IUser;
  @Input() communityId: number;
  engagementData: IUserCommunityEngagementData;

  constructor(private userCommunityEngagementDataService: UserCommunityEngagementDataService) {}

  ngOnInit(): void {
    this.getEngagementData();
  }

  getEngagementData() {
    this.userCommunityEngagementDataService
      .getUserCommunityEngagementData(this.user.id, this.communityId)
      .subscribe((data: IUserCommunityEngagementData) => {
        this.engagementData = data;
      });
  }
}
