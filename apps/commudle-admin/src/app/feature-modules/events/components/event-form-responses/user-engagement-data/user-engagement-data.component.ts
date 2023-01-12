import { Component, Input, OnInit } from '@angular/core';
import { UserCommunityEngagementDataService } from 'apps/commudle-admin/src/app/services/user-community-engagement-data.service';
import { IDataFormEntityResponseGroup } from 'apps/shared-models/data_form_entity_response_group.model';
import { IUser } from 'apps/shared-models/user.model';
import { IUserCommunityEngagementData } from 'apps/shared-models/user_community_engagement_data.model';

@Component({
  selector: 'app-user-engagement-data',
  templateUrl: './user-engagement-data.component.html',
  styleUrls: ['./user-engagement-data.component.scss'],
})
export class UserEngagementDataComponent implements OnInit {
  @Input() userResponse: IDataFormEntityResponseGroup;
  @Input() communityId: number;
  users: IUser;
  engagementData: IUserCommunityEngagementData;

  constructor(private userCommunityEngagementDataService: UserCommunityEngagementDataService) {}

  ngOnInit(): void {
    this.users = this.userResponse.user;
    this.getEngagementData(this.users);
  }

  getEngagementData(user) {
    this.userCommunityEngagementDataService
      .getUserCommunityEngagementData(user.id, this.communityId)
      .subscribe((data: IUserCommunityEngagementData) => {
        this.engagementData = data;
      });
  }
}
