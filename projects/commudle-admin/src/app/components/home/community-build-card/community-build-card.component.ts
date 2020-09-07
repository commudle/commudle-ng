import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { CBuildTypeDisplay, ICommunityBuild } from 'projects/shared-models/community-build.model';

@Component({
  selector: 'app-community-build-card',
  templateUrl: './community-build-card.component.html',
  styleUrls: ['./community-build-card.component.scss']
})
export class CommunityBuildCardComponent implements OnInit {
  moment = moment;
  CBuildTypeDisplay = CBuildTypeDisplay;

  @Input() communityBuild: ICommunityBuild;

  constructor() { }

  ngOnInit() {
  }

}
