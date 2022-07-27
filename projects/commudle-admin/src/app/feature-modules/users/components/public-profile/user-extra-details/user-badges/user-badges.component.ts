import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { UserProfileMenuService } from 'projects/commudle-admin/src/app/feature-modules/users/services/user-profile-menu.service';
import { AppUsersService } from 'projects/commudle-admin/src/app/services/app-users.service';
import { IBadge } from 'projects/shared-models/badge.model';
import { IUser } from 'projects/shared-models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-badges',
  templateUrl: './user-badges.component.html',
  styleUrls: ['./user-badges.component.scss'],
})
export class UserBadgesComponent implements OnChanges, OnDestroy {
  @Input() user: IUser;

  @Output() showBadges: EventEmitter<boolean> = new EventEmitter<boolean>();

  badges: IBadge[] = [];

  subscriptions: Subscription[] = [];

  constructor(private appUsersService: AppUsersService, public userProfileMenuService: UserProfileMenuService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user) {
      this.getBadges();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getBadges(): void {
    this.subscriptions.push(
      this.appUsersService.badges(this.user.username).subscribe((value) => {
        this.badges = value.badges;
        this.showBadges.emit(this.badges.length !== 0);
        this.userProfileMenuService.addMenuItem('badges', this.badges.length > 0);
      }),
    );
  }
}
