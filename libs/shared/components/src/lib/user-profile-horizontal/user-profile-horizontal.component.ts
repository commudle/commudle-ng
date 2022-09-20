import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '@commudle/shared-models';
import { UserChatsService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-user-profile-horizontal',
  templateUrl: './user-profile-horizontal.component.html',
  styleUrls: ['./user-profile-horizontal.component.scss'],
})
export class UserProfileHorizontalComponent implements OnInit {
  @Input() user: IUser;
  @Input() size: string;
  @Input() aboutMe: boolean;
  @Input() socialMediaLinks: boolean;
  @Input() showLiveStatus: boolean;

  constructor(private userChatsService: UserChatsService) {}

  ngOnInit() {}

  openChatWithUser() {
    this.userChatsService.changeFollowerId(this.user.id);
  }
}
