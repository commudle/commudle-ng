import {AfterViewChecked, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {IUser} from 'projects/shared-models/user.model';
import {ILab} from 'projects/shared-models/lab.model';
import {AppUsersService} from 'projects/commudle-admin/src/app/services/app-users.service';
import {ICommunityBuild} from 'projects/shared-models/community-build.model';
import {IUserRolesUser} from 'projects/shared-models/user_roles_user.model';

@Component({
  selector: 'app-user-content',
  templateUrl: './user-content.component.html',
  styleUrls: ['./user-content.component.scss']
})
export class UserContentComponent implements OnInit, AfterViewChecked {

  @Input() user: IUser;

  labs: ILab[] = [];
  communities: IUserRolesUser[] = [];
  builds: ICommunityBuild[] = [];

  communityNavButtonsHeight: number;
  labNavButtonsHeight: number;

  @ViewChild('communityCards') communityCards: ElementRef;
  @ViewChild('labCards') labCards: ElementRef;

  constructor(
    private appUsersService: AppUsersService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    // Get the user's labs
    this.appUsersService.labs(this.user.username).subscribe(value => this.labs = value.labs);
    // Get the user's communities
    this.appUsersService.communities(this.user.username).subscribe(value => this.communities = value.user_roles_users);
    // Get the user's builds
    this.appUsersService.communityBuilds(this.user.username).subscribe(value => this.builds = value.community_builds);
  }

  ngAfterViewChecked(): void {
    // Set height of community navigation buttons
    this.communityNavButtonsHeight = this.communityCards.nativeElement.offsetHeight / 2 + 23;
    // Set height of lab navigation buttons
    this.labNavButtonsHeight = this.labCards.nativeElement.offsetHeight / 2 + 23;
    // Manually trigger change detection for the current component because we need to set the height of navigation buttons dynamically
    this.cdr.detectChanges();
  }

  // Check if the given element is scrollable
  isScrollable(element: HTMLDivElement) {
    return element.offsetWidth < element.scrollWidth;
  }

  scrollLeft(element: HTMLDivElement) {
    // Scroll left by two cards when width > 1000px else scroll left by one card
    element.scrollTo({
      left: (element.scrollLeft - 315 * (window.innerWidth > 1000 ? 2 : 1)),
      behavior: 'smooth'
    });
  }

  scrollRight(element: HTMLDivElement) {
    // Scroll right by two cards when width > 1000px else scroll left by one card
    element.scrollTo({
      left: (element.scrollLeft + 315 * (window.innerWidth > 1000 ? 2 : 1)),
      behavior: 'smooth'
    });
  }

}
