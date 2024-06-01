import { Component, Input } from '@angular/core';
import { ICommunityBuild, CBuildTypeDisplay } from '@commudle/shared-models';
import moment from 'moment';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';

@Component({
  selector: 'commudle-build-card',
  templateUrl: './build-card.component.html',
  styleUrls: ['./build-card.component.scss'],
})
export class BuildCardComponent {
  @Input() communityBuild: ICommunityBuild;
  staticAssets = staticAssets;
  moment = moment;

  CBuildTypeDisplay = CBuildTypeDisplay;
}
