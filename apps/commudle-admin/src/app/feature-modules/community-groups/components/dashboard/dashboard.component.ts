import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunityGroupsService } from 'apps/commudle-admin/src/app/services/community-groups.service';
import { ICommunityGroup } from 'apps/shared-models/community-group.model';
import { SeoService } from 'apps/shared-services/seo.service';
import { Subscription } from 'rxjs';
import { faUsers, faBuilding, faCalendar, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  communityGroup: ICommunityGroup;
  subscriptions: Subscription[] = [];

  sidebarExpanded = false;

  //font-awesome
  faCalendar = faCalendar;
  faUsers = faUsers;
  faPenToSquare = faPenToSquare;
  faBuilding = faBuilding;

  constructor(
    private activatedRoute: ActivatedRoute,
    private communityGroupsService: CommunityGroupsService,
    private seoService: SeoService,
  ) {}

  ngOnInit() {
    this.seoService.noIndex(true);
    this.subscriptions.push(
      this.activatedRoute.params.subscribe((data) => {
        this.communityGroupsService.show(data.community_group_id).subscribe((data) => {
          this.communityGroup = data;

          this.seoService.setTitle(`Dashboard | ${this.communityGroup.name}`);
        });
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.seoService.noIndex(false);
  }
}
