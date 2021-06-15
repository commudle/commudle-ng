import {AfterViewChecked, Component, Input, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Subscription} from 'rxjs';
import {AppUsersService} from 'projects/commudle-admin/src/app/services/app-users.service';
import {ILab} from 'projects/shared-models/lab.model';
import {ICommunityBuild} from 'projects/shared-models/community-build.model';
import {IUserRolesUser} from 'projects/shared-models/user_roles_user.model';
import {ISpeakerResource} from 'projects/shared-models/speaker_resource.model';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-user-contributions',
  templateUrl: './user-contributions.component.html',
  styleUrls: ['./user-contributions.component.scss']
})
export class UserContributionsComponent implements OnInit, OnDestroy, AfterViewChecked {

  username = "";

  labs: ILab[];
  communities: IUserRolesUser[];
  builds: ICommunityBuild[];
  pastEvents: ISpeakerResource[];

  subscriptions: Subscription[] = [];

  @ViewChildren('content') sections: QueryList<any>;
  @ViewChildren('navigation') navigations: QueryList<any>;

  constructor(
    private appUsersService: AppUsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    //Get username from router link
    this.username = this.router.url.split('/')[2];
    // Get the user's past events
    this.subscriptions.push(this.appUsersService.speakerResources(this.username).subscribe(value => {
      this.pastEvents = value.speaker_resources;
    }));
    // Get the user's communities
    this.subscriptions.push(this.appUsersService.communities(this.username).subscribe(value => {
      this.communities = value.user_roles_users;
      // TODO: If some community is undefined then remove it, is it required?
      this.communities.forEach(community => {
        if (!community.community) {
          this.communities.splice(this.communities.indexOf(community), 1);
        }
      })
    }));
    // Get the user's labs
    this.subscriptions.push(this.appUsersService.labs(this.username).subscribe(value => {
      this.labs = value.labs;
    }));
    // Get the user's builds
    this.subscriptions.push(this.appUsersService.communityBuilds(this.username).subscribe(value => {
      this.builds = value.community_builds;
    }));
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
