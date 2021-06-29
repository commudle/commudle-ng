import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUserRolesUser } from 'projects/shared-models/user_roles_user.model';
import { ActivatedRoute } from '@angular/router';
import { UserRolesUsersService } from 'projects/commudle-admin/src/app/services/user_roles_users.service';
import { ICommunityGroup } from 'projects/shared-models/community-group.model';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-community-group-team',
  templateUrl: './community-group-team.component.html',
  styleUrls: ['./community-group-team.component.scss']
})
export class CommunityGroupTeamComponent implements OnInit, OnDestroy {
  private subscriptions = [];
  team: IUserRolesUser[] = [];
  communityGroup: ICommunityGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userRolesUserService: UserRolesUsersService,
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.activatedRoute.parent.params.subscribe(
      data => {
        this.getTeam(data.community_group_id);
      }
    ));

    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe(
        data => {
          this.communityGroup = data.community_group;
          this.setMeta();
        }
      )
    )
  }

  ngOnDestroy() {
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  getTeam(communityGroupId) {
    this.userRolesUserService.pGetCommunityGroupLeaders(communityGroupId).subscribe(
      data => {
        this.team = data.user_roles_users;
      }
    );
  }

  setMeta() {
    this.title.setTitle(`Team | ${this.communityGroup.name}`);
    this.meta.updateTag({ name: 'description', content: `${this.communityGroup.mini_description}`});


    this.meta.updateTag({ name: 'og:image', content: `Team | ${this.communityGroup.logo.i350}` });
    this.meta.updateTag({ name: 'og:image:secure_url', content: `${this.communityGroup.logo.i350}` });
    this.meta.updateTag({ name: 'og:title', content: `Team | ${this.communityGroup.name}` });
    this.meta.updateTag({ name: 'og:description', content: `${this.communityGroup.mini_description}`});
    this.meta.updateTag( { name: 'og:type', content: 'website'});

    this.meta.updateTag({ name: 'twitter:image', content: `${this.communityGroup.logo.i350}` });
    this.meta.updateTag({ name: 'twitter:title', content: `Team | ${this.communityGroup.name}` });
    this.meta.updateTag({ name: 'twitter:description', content: `Fill the form for ${this.communityGroup.mini_description}`});
  }


}
