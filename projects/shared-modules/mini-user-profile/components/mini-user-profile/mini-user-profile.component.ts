import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserChatsService } from 'projects/commudle-admin/src/app/feature-modules/user-chats/services/user-chats.service';
import { AppUsersService } from 'projects/commudle-admin/src/app/services/app-users.service';
import { IMiniUserProfile } from 'projects/shared-models/mini-user-profile.model';
import { IUser } from 'projects/shared-models/user.model';
import { Subscription } from 'rxjs';
// import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'app-mini-user-profile',
  templateUrl: './mini-user-profile.component.html',
  styleUrls: ['./mini-user-profile.component.scss'],
})
export class MiniUserProfileComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() username: string;
  @Input() miniUser: IMiniUserProfile;
  @Output() popupHover = new EventEmitter();
  @Output() closeMiniProfile = new EventEmitter();

  user: IUser;

  subscriptions: Subscription[] = [];

  mouseLeave = false;

  constructor(
    private userChatsService: UserChatsService,
    private appUsersService: AppUsersService,
    private router: Router,
    private scrollDispatcher: ScrollDispatcher,
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
  ngAfterViewInit(): void {
    // this.scrollDispatcher.scrolled().subscribe((scrollable) => {
    //   console.log(scrollable);
    //   // if (scrollable && this.onProfile) {
    //   //   console.log('works');
    //   // this.popupHover.emit(false);
    //   // }
    // });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((value) => value.unsubscribe());
    this.popupHover.emit(false);
  }

  openChatWithUser(): void {
    this.userChatsService.changeFollowerId(this.miniUser.id);
  }

  onMouseEnter() {
    // console.log('onMouseEnter');
  }
  onMouseOver() {
    // this.mouseLeave = true;
    this.popupHover.emit(true);
    // console.log('onMouseOver');
  }

  onMouseLeave() {
    this.popupHover.emit(false);
    // console.log('onMouseLeave');
  }

  closePopup() {
    this.closeMiniProfile.emit(true);
  }
}
