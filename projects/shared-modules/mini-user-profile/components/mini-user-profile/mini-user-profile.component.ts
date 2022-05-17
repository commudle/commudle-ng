import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UserChatsService } from 'projects/commudle-admin/src/app/feature-modules/user-chats/services/user-chats.service';
import { AppUsersService } from 'projects/commudle-admin/src/app/services/app-users.service';
import { IMiniUserProfile } from 'projects/shared-models/mini-user-profile.model';
import { IUser } from 'projects/shared-models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mini-user-profile',
  templateUrl: './mini-user-profile.component.html',
  styleUrls: ['./mini-user-profile.component.scss'],
})
export class MiniUserProfileComponent implements OnInit, OnDestroy {
  @Input() username: string;
  @Input() miniUser: IMiniUserProfile;
  @Output() popupHover = new EventEmitter();
  @Output() closeMiniProfile = new EventEmitter();

  user: IUser;

  subscriptions: Subscription[] = [];

  constructor(private userChatsService: UserChatsService, private appUsersService: AppUsersService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.appUsersService.getProfile(this.username).subscribe((response) => {
        this.user = response;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((value) => value.unsubscribe());
  }

  openChatWithUser(): void {
    this.userChatsService.changeFollowerId(this.miniUser.id);
  }

  onMouseEnter() {
    this.popupHover.emit(true);
  }

  onMouseLeave() {
    this.popupHover.emit(false);
  }

  closePopup() {
    this.closeMiniProfile.emit(true);
  }
}
