import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from '@commudle/shared-models';
import { UserChatsService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-user-profile-card-large',
  templateUrl: './user-profile-card-large.component.html',
  styleUrls: ['./user-profile-card-large.component.scss'],
})
export class UserProfileCardLargeComponent implements OnInit {
  @Input() user: IUser;
  @Input() maxNameLength = 50;
  @Input() maxUserNameLength = 50;
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
