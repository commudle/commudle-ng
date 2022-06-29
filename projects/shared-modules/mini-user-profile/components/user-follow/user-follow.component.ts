import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, TemplateRef } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { AppUsersService } from 'projects/commudle-admin/src/app/services/app-users.service';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { IUser } from 'projects/shared-models/user.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-follow',
  templateUrl: './user-follow.component.html',
  styleUrls: ['./user-follow.component.scss'],
})
export class UserFollowComponent implements OnChanges, OnDestroy {
  @Input() username: string;
  @Input() showIcon = true;

  @Output() userFollowed: EventEmitter<any> = new EventEmitter<any>();

  user: IUser;
  currentUser: ICurrentUser;
  isFollowing = false;

  subscriptions: Subscription[] = [];

  constructor(
    private appUsersService: AppUsersService,
    private authWatchService: LibAuthwatchService,
    private nbDialogService: NbDialogService,
  ) {}

  ngOnChanges(): void {
    // Get user's data
    this.subscriptions.push(this.appUsersService.getProfile(this.username).subscribe((data) => (this.user = data)));

    // Get logged in user
    this.subscriptions.push(
      this.authWatchService.currentUser$.subscribe((data) => {
        this.currentUser = data;
        this.checkFollowing();
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((value) => value.unsubscribe());
  }

  checkFollowing() {
    if (this.currentUser) {
      this.subscriptions.push(
        this.appUsersService.check_followee(this.username).subscribe((value) => (this.isFollowing = value)),
      );
    }
  }

  toggleFollow(ref?: NbDialogRef<any>) {
    this.subscriptions.push(
      this.appUsersService.toggleFollow(this.username).subscribe(() => {
        this.checkFollowing();
        if (ref) {
          ref.close();
        }
        this.userFollowed.emit();
      }),
    );
  }

  openDialog(ref: TemplateRef<any>) {
    if (this.isFollowing) {
      this.toggleFollow();
    } else {
      this.nbDialogService.open(ref);
    }
  }
}
