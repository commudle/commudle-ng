import { Component, Input, OnInit } from '@angular/core';
import { IDataFormEntityResponseGroup, IUser, IUserCommunityEngagementData } from '@commudle/shared-models';
import { UserCommunityEngagementDataService } from '../../../../../services/user-community-engagement-data.service';

@Component({
  selector: 'commudle-user-engagement-data',
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
