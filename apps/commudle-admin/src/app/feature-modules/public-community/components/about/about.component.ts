import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRolesUsersService } from 'apps/commudle-admin/src/app/services/user_roles_users.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { EUserRoles } from 'apps/shared-models/enums/user_roles.enum';
import { IUser } from 'apps/shared-models/user.model';
import { SeoService } from 'apps/shared-services/seo.service';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { IEvent } from 'apps/shared-models/event.model';
import { AuthService, CommunityChannelManagerService, CommunityChannelsService } from '@commudle/shared-services';
import { EDbModels, ICommunityChannel } from '@commudle/shared-models';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

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
  isLoadingEvents = false;
  isLoading = false;
  defaultChannel: ICommunityChannel;
  currentUser: IUser;

  icons = {
    faUsers,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private userRolesUsersService: UserRolesUsersService,
    private seoService: SeoService,
    private eventsService: EventsService,
    private communityChannelsService: CommunityChannelsService,
    private communityChannelManagerService: CommunityChannelManagerService,
    private authWatchService: AuthService,
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.community = data.community;
      if (this.community.upcoming_events_count > 0) {
        this.getEvents();
      }
      this.seoService.setTitle(this.community.name);
    });
    this.setCurrentUser();
  }

  setCurrentUser() {
    this.authWatchService.currentUser$.subscribe((data) => {
      this.currentUser = data;
      this.getDefaultChannel();
      this.getOrganizers([EUserRoles.ORGANIZER, EUserRoles.EVENT_VOLUNTEER]);
      if (data) {
        this.communityChannelManagerService.setCurrentUser(data);
      }
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
    this.isLoadingEvents = true;
    this.eventsService.pGetCommunityEvents('future', this.community.id).subscribe((data) => {
      this.upcomingEvents = data.values;
      this.isLoadingEvents = false;
    });
  }

  getDefaultChannel() {
    this.communityChannelsService
      .getDefaultChannel(this.community.id, EDbModels.KOMMUNITY)
      .subscribe((data: ICommunityChannel) => {
        if (this.currentUser) this.communityChannelManagerService.getChannelRoles(data);
        this.defaultChannel = data;
      });
  }
}
