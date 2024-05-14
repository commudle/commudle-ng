import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRolesUsersService } from 'apps/commudle-admin/src/app/services/user_roles_users.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { EUserRoles } from 'apps/shared-models/enums/user_roles.enum';
import { IUser } from 'apps/shared-models/user.model';
import { SeoService } from 'apps/shared-services/seo.service';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { IEvent } from 'apps/shared-models/event.model';
import moment from 'moment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  community: ICommunity = null;
  EUserRoles = EUserRoles;
  organizers: IUser[] = [];
  events: IEvent[] = [];
  upcomingEvents: IEvent[] = [];

  isLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userRolesUsersService: UserRolesUsersService,
    private seoService: SeoService,
    private eventsService: EventsService,
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.community = data.community;
      this.getEvents();
      this.seoService.setTitle(this.community.name);
      this.getOrganizers([EUserRoles.ORGANIZER, EUserRoles.EVENT_VOLUNTEER]);
    });
  }

  getOrganizers(roles: EUserRoles[]) {
    this.isLoading = true;
    this.organizers = [];
    roles.forEach((role) => {
      this.userRolesUsersService.pGetCommunityLeadersByRole(this.community.id, role).subscribe((data) => {
        this.organizers = this.organizers.concat(data.users);
        this.isLoading = false;
      });
    });
  }

  getEvents() {
    this.isLoading = true;
    this.eventsService.pGetCommunityEvents(this.community.id).subscribe((data) => {
      this.events = data.events;
      this.events.forEach((event) => {
        if (moment(event.end_time) > moment() || event.end_time === null) {
          this.upcomingEvents.push(event);
        }
      });
      this.isLoading = false;
    });
  }
}
