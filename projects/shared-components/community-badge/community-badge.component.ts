import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ICommunity } from 'projects/shared-models/community.model';

@Component({
  selector: 'app-community-badge',
  templateUrl: './community-badge.component.html',
  styleUrls: ['./community-badge.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityBadgeComponent implements OnInit {
  @Input() community: ICommunity;
  @Input() background: string;

  constructor() {}

  ngOnInit() {}
}
