import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, TemplateRef } from '@angular/core';
import { ICurrentUser, IUser } from '@commudle/shared-models';
import { AppUsersService, LibAuthwatchService } from '@commudle/shared-services';
import { NbButtonAppearance, NbDialogService } from '@nebular/theme';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-user-follow',
  templateUrl: './user-follow.component.html',
  styleUrls: ['./user-follow.component.scss'],
})
export class UserFollowComponent implements OnChanges, OnDestroy {
  @Input() username: string;
  @Input() showIcon = true;
  @Input() appearance: NbButtonAppearance;

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

  toggleFollow() {
    this.subscriptions.push(
      this.appUsersService.toggleFollow(this.username).subscribe(() => {
        this.checkFollowing();
        this.userFollowed.emit();
      }),
    );
  }

  openDialog(ref: TemplateRef<any>) {
    this.nbDialogService.open(ref);
  }
}
