import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CommunityBuildsService } from 'projects/commudle-admin/src/app/services/community-builds.service';
import { ICommunityBuild } from 'projects/shared-models/community-build.model';
import { SeoService } from 'projects/shared-services/seo.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-community-build',
  templateUrl: './community-build.component.html',
  styleUrls: ['./community-build.component.scss'],
})
export class CommunityBuildComponent implements OnInit {
  communityBuild: ICommunityBuild;

  constructor(
    private seoService: SeoService,
    private activatedRoute: ActivatedRoute,
    private communityBuildsService: CommunityBuildsService,
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        switchMap((data: Params) => {
          return this.communityBuildsService.pShow(data.community_build_id);
        }),
      )
      .subscribe((data: ICommunityBuild) => {
        this.communityBuild = data;

        this.seoService.setTags(
          `${data.name} | By ${data.user.name}`,
          data.description.replace(/<[^>]*>/g, '').substring(0, 160) + '...',
          data.images[0]?.url || 'https://commudle.com/assets/images/commudle-logo192.png',
        );
      });
  }
}
