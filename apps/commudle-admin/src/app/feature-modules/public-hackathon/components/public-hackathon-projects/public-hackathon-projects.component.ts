import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunityBuild } from '@commudle/shared-models';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { IHackathon } from 'apps/shared-models/hackathon.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-public-hackathon-projects',
  templateUrl: './public-hackathon-projects.component.html',
  styleUrls: ['./public-hackathon-projects.component.scss'],
})
export class PublicHackathonProjectsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  communityBuilds: ICommunityBuild[];
  hackathon: IHackathon;
  isLoading = true;
  constructor(private hackathonService: HackathonService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.hackathon = data.hackathon;
        this.indexHackathonProjects();
      }),
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  indexHackathonProjects() {
    this.subscriptions.push(
      this.hackathonService.pIndexProjects(this.hackathon.id).subscribe((data: ICommunityBuild[]) => {
        this.communityBuilds = data;
        this.isLoading = false;
      }),
    );
  }
}
