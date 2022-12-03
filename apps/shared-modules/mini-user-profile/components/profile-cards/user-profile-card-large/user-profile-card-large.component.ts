import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserChatsService } from 'apps/commudle-admin/src/app/feature-modules/user-chats/services/user-chats.service';
import { IUser } from 'apps/shared-models/user.model';

@Component({
  selector: 'app-user-profile-card-large',
  templateUrl: './user-profile-card-large.component.html',
  styleUrls: ['./user-profile-card-large.component.scss'],
})
export class UserProfileCardLargeComponent implements OnInit {
  @Input() user: IUser;
  @Input() maxNameLength = 50;
  @Input() maxUserNameLength = 10;
  @Input() truncateDesignation = true;
  @Input() showFollowButton = false;
  @Input() alignFollowToRight = false;
  @Input() showAbout = false;
  @Input() showSocialLinks = false;
  @Input() activateMiniProfileDirective = true;
  @Output() componentClicked = new EventEmitter();

  constructor(private userChatsService: UserChatsService) {}

  ngOnInit(): void {}

  openChatWithUser() {
    this.userChatsService.changeFollowerId(this.user.id);
  }

  profileClicked() {
    this.componentClicked.emit(true);
  }
}
