import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef} from '@angular/core';
import {IUser} from 'projects/shared-models/user.model';
import {AppUsersService} from 'projects/commudle-admin/src/app/services/app-users.service';
import {Subscription} from 'rxjs';
import {ICurrentUser} from 'projects/shared-models/current_user.model';
import {NbDialogRef, NbDialogService} from '@nebular/theme';

@Component({
  selector: 'app-user-follow',
  templateUrl: './user-follow.component.html',
  styleUrls: ['./user-follow.component.scss']
})
export class UserFollowComponent implements OnInit, OnDestroy {

  @Input() user: IUser;
  @Input() currentUser: ICurrentUser;

  @Output() userFollowed: EventEmitter<any> = new EventEmitter<any>();

  isFollowing = false;

  subscriptions: Subscription[] = [];

  constructor(
    private appUsersService: AppUsersService,
    private nbDialogService: NbDialogService
  ) {
  }

  ngOnInit(): void {
    this.checkFollowing();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }

  checkFollowing() {
    if (this.currentUser) {
      this.subscriptions.push(this.appUsersService.check_followee(this.user.username).subscribe(value => this.isFollowing = value));
    }
  }

  toggleFollow(ref: NbDialogRef<any>) {
    this.subscriptions.push(this.appUsersService.toggleFollow(this.user.username).subscribe(value => {
      this.checkFollowing();
      ref.close();
      this.userFollowed.emit();
    }));
  }

  openDialog(ref: TemplateRef<any>) {
    this.nbDialogService.open(ref);
  }

}
