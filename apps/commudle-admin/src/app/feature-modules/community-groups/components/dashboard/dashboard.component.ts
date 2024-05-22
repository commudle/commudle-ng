import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunityGroup } from 'apps/shared-models/community-group.model';
import { SeoService } from 'apps/shared-services/seo.service';
import { Subscription } from 'rxjs';
import { faUsers, faBuilding, faCalendar, faPenToSquare, faPoll, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { SidebarService } from 'apps/shared-components/sidebar/service/sidebar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  communityGroup: ICommunityGroup;
  subscriptions: Subscription[] = [];

  sidebarExpanded = true;
  showSideBar = false;

  //font-awesome
  icons = {
    faCalendar,
    faUsers,
    faPenToSquare,
    faBuilding,
    faPoll,
    faFileLines,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
    public sidebarService: SidebarService,
  ) {}

  ngOnInit() {
    this.seoService.noIndex(true);
    this.subscriptions.push(
      this.activatedRoute.data.subscribe((data) => {
        this.communityGroup = data.community_group;
        this.setMeta();
      }),
    );

    this.sidebarService.setSidebarVisibility('communityGroup', true);
  }

  ngOnDestroy(): void {
    this.seoService.noIndex(false);
  }

  setMeta() {
    this.seoService.setTags(
      `Dashboard - Admin - ${this.communityGroup.name}`,
      this.communityGroup.mini_description,
      this.communityGroup.logo.i350,
    );
  }
}
