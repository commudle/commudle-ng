import { Component, OnInit, Input } from '@angular/core';
import { ICommunityBuild, CBuildTypeDisplay } from 'projects/shared-models/community-build.model';
import * as moment from 'moment';

@Component({
  selector: 'app-community-build-h-list-item',
  templateUrl: './community-build-h-list-item.component.html',
  styleUrls: ['./community-build-h-list-item.component.scss']
})
export class CommunityBuildHListItemComponent implements OnInit {
  moment = moment;
  buildDescription;

  CBuildTypeDisplay = CBuildTypeDisplay;

  @Input() communityBuild: ICommunityBuild;

  constructor() { }

  ngOnInit() {
    this.buildDescription = this.communityBuild.description.replace(/<[^>]*>/g, '');
  }
}
