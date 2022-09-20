import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IMiniUserProfile, IUser } from '@commudle/shared-models';
import { AppUsersService, UserChatsService } from '@commudle/shared-services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-mini-user-profile',
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

  constructor(
    private userChatsService: UserChatsService,
    private appUsersService: AppUsersService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.appUsersService.getProfile(this.username).subscribe((response) => {
        this.user = response;
      }),
    );

    // on route change, close the mini profile
    this.subscriptions.push(
      this.router.events.subscribe(() => {
        this.closeMiniProfile.emit(true);
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
