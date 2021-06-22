import { AfterViewChecked, Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppUsersService } from 'projects/commudle-admin/src/app/services/app-users.service';
import { ICommunityBuild } from 'projects/shared-models/community-build.model';
import { ILab } from 'projects/shared-models/lab.model';
import { ISpeakerResource } from 'projects/shared-models/speaker_resource.model';
import { IUser } from 'projects/shared-models/user.model';
import { IUserRolesUser } from 'projects/shared-models/user_roles_user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-contributions',
  templateUrl: './user-contributions.component.html',
  styleUrls: ['./user-contributions.component.scss']
})
export class UserContributionsComponent implements OnInit, OnDestroy, AfterViewChecked {

  user: IUser;

  labs: ILab[] = [];
  communities: IUserRolesUser[] = [];
  builds: ICommunityBuild[] = [];
  pastEvents: ISpeakerResource[] = [];

  subscriptions: Subscription[] = [];

  @ViewChildren('content') sections: QueryList<any>;
  @ViewChildren('navigation') navigations: QueryList<any>;

  constructor(
    private appUsersService: AppUsersService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.activatedRoute.parent.params.subscribe(data => this.getUserData(data.username)));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }

  ngAfterViewChecked(): void {
    this.sections.forEach((section, idx) => {
      if (!this.isScrollable(section.nativeElement)) {
        this.navigations.toArray()[idx].nativeElement.classList.remove('active');
      }
    });
  }

  getUserData(username: string): void {
    this.subscriptions.push(this.appUsersService.getProfile(username).subscribe(data => {
      this.user = data;
      this.getPastEvents();
      this.getCommunities();
      this.getLabs();
      this.getBuilds();
    }));
  }

  // Get the user's past events
  getPastEvents(): void {
    this.subscriptions.push(this.appUsersService.speakerResources(this.user.username).subscribe(value => {
      this.pastEvents = value.speaker_resources;
    }));
  }

  // Get the user's communities
  getCommunities(): void {
    this.subscriptions.push(this.appUsersService.communities(this.user.username).subscribe(value => {
      this.communities = value.user_roles_users;
      // TODO: If some community is undefined then remove it, is that required?
      this.communities.forEach(community => {
        if (!community.community) {
          this.communities.splice(this.communities.indexOf(community), 1);
        }
      });
    }));
  }

  // Get the user's labs
  getLabs(): void {
    this.subscriptions.push(this.appUsersService.labs(this.user.username).subscribe(value => {
      this.labs = value.labs;
    }));
  }

  // Get the user's builds
  getBuilds(): void {
    this.subscriptions.push(this.appUsersService.communityBuilds(this.user.username).subscribe(value => {
      this.builds = value.community_builds;
    }));
  }

  // Check if the given element is scrollable
  isScrollable(element: HTMLDivElement) {
    return element.offsetWidth < element.scrollWidth;
  }

  scrollElement(event: MouseEvent, direction: number) {
    // @ts-ignore
    const element = event.srcElement.parentElement.previousSibling;
    element.scrollTo({
      left: (element.scrollLeft + direction * 294),
      behavior: 'smooth'
    });
  }

}
