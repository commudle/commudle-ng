import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UserRolesUsersService } from 'projects/commudle-admin/src/app/services/user_roles_users.service';
import { ICommunity } from 'projects/shared-models/community.model';
import { EUserRoles } from 'projects/shared-models/enums/user_roles.enum';
import { IUser } from 'projects/shared-models/user.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  community: ICommunity;
  EUserRoles = EUserRoles;
  organizers: IUser[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private userRolesUsersService: UserRolesUsersService,
    private meta: Meta,
    private title: Title
  ) {
  }

  setMeta() {
    this.title.setTitle(`${this.community.name}`);
    this.meta.updateTag({ name: 'og:title', content: `${this.community.name}` });
    this.meta.updateTag({ name: 'twitter:title', content: `${this.community.name}` });
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.community = data.community;
      this.setMeta();
      this.getOrganizers([EUserRoles.ORGANIZER, EUserRoles.EVENT_VOLUNTEER]);
    });
  }

  getOrganizers(roles: EUserRoles[]) {
    this.organizers = []
    roles.forEach(role => {
      this.userRolesUsersService.pGetCommunityLeadersByRole(this.community.id, role).subscribe(data => {
        this.organizers = this.organizers.concat(data.users);
      });
    });
  }

}
