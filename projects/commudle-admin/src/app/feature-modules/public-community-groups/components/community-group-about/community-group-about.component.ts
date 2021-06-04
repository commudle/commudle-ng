import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ICommunityGroup } from 'projects/shared-models/community-group.model';

@Component({
  selector: 'app-community-group-about',
  templateUrl: './community-group-about.component.html',
  styleUrls: ['./community-group-about.component.scss']
})
export class CommunityGroupAboutComponent implements OnInit {
  communityGroup: ICommunityGroup;
  subscriptions = [];

  description;
  constructor(
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.activatedRoute.parent.data.subscribe(
      data => {
        console.log(data);
        this.communityGroup = data.community_group;
        this.description = this.sanitizer.bypassSecurityTrustHtml(this.communityGroup.description);

      }
    ));
  }

  ngOnDestroy() {
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }


}
