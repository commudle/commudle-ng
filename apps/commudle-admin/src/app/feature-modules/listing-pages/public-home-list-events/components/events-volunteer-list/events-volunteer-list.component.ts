import { Component, Input, OnInit } from '@angular/core';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { UserRolesUsersService } from 'apps/commudle-admin/src/app/services/user_roles_users.service';
import { IEvent } from 'apps/shared-models/event.model';
import { IPageInfo } from 'apps/shared-models/page-info.model';
import { IUser } from 'apps/shared-models/user.model';
import { IUserRolesUser } from 'apps/shared-models/user_roles_user.model';

@Component({
  selector: 'commudle-events-volunteer-list',
  templateUrl: './events-volunteer-list.component.html',
  styleUrls: ['./events-volunteer-list.component.scss'],
})
export class EventsVolunteerListComponent implements OnInit {
  @Input() event: IEvent;
  // volunteers: IUser[] = [];
  // volunteers: IUserRolesUser[] = [];
  volunteers: any;
  page_info: IPageInfo;
  total: number;
  isLoadingVolunteers = false;
  showSpinner = false;
  showSkeletonLoading = true;
  limit = 4;

  constructor(private communitiesService: CommunitiesService, private userRolesUsersService: UserRolesUsersService) {}

  ngOnInit(): void {
    this.getVolunteersList();
  }

  // getVolunteersList() {
  //   this.showSpinner = true;
  //   if (this.isLoadingVolunteers) {
  //     return;
  //   }
  //   this.isLoadingVolunteers = true;
  // this.communitiesService.getSpeakersList(this.mini, this.page_info?.end_cursor, this.limit).subscribe((data) => {
  // this.volunteers = this.volunteers.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
  // this.total = data.total;
  // this.page_info = data.page_info;
  //   this.isLoadingVolunteers = false;
  //   this.showSpinner = false;
  //   this.showSkeletonLoading = false;
  // });
  // }

  getVolunteersList() {
    // this.userRolesUsersService.getEventVolunteers(this.event.slug).subscribe((data) => {
    //   this.volunteers = data.user_roles_users;
    // });
  }
}
