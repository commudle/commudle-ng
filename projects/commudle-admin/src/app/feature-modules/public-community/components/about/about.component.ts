import { Component, OnInit } from '@angular/core';
import { SeoService } from 'projects/shared-services/seo.service';
import { ActivatedRoute } from '@angular/router';
import { UserRolesUsersService } from 'projects/commudle-admin/src/app/services/user_roles_users.service';
import { ICommunity } from 'projects/shared-models/community.model';
import { EUserRoles } from 'projects/shared-models/enums/user_roles.enum';
import { IUser } from 'projects/shared-models/user.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  community: ICommunity = null;
  EUserRoles = EUserRoles;
  organizers: IUser[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private userRolesUsersService: UserRolesUsersService,
    private seoService : SeoService,
  ) {}

  setMeta() {
    this.seoService.setTitle(`${this.community.name}`);
    this.seoService.setTag('og:title', `${this.community.name}`);
    this.seoService.setTag('twitter:title', `${this.community.name}`);
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.community = data.community;
      this.setMeta();
      this.getOrganizers([EUserRoles.ORGANIZER, EUserRoles.EVENT_VOLUNTEER]);
    });
  }

  getOrganizers(roles: EUserRoles[]) {
    this.organizers = [];
    roles.forEach((role) => {
      this.userRolesUsersService.pGetCommunityLeadersByRole(this.community.id, role).subscribe((data) => {
        this.organizers = this.organizers.concat(data.users);
      });
    });
  }
}
