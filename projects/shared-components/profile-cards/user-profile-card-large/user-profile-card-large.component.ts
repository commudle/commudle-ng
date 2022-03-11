import { Component, Input, OnInit } from '@angular/core';
import { UserChatsService } from 'projects/commudle-admin/src/app/feature-modules/user-chats/services/user-chats.service';
import { IUser } from 'projects/shared-models/user.model';

@Component({
  selector: 'app-user-profile-card-large',
  templateUrl: './user-profile-card-large.component.html',
  styleUrls: ['./user-profile-card-large.component.scss'],
})
export class UserProfileCardLargeComponent implements OnInit {
  @Input() user: IUser;
  @Input() maxNameLength = 50;
  @Input() maxUserNameLength = 50;
  @Input() maxDesignationLength = 50;
  @Input() showFollowButton = false;
  @Input() alignFollowToRight = false;
  @Input() showAbout = false;
  @Input() showSocialLinks = false;

  constructor(private userChatsService: UserChatsService) {}

  ngOnInit(): void {}

  openChatWithUser() {
    this.userChatsService.changeFollowerId(this.user.id);
  }
}
