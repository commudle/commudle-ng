import { Component, OnInit, Input } from '@angular/core';
import { ICommunity } from 'projects/shared-models/community.model';

@Component({
  selector: 'app-community-badge',
  templateUrl: './community-badge.component.html',
  styleUrls: ['./community-badge.component.scss']
})
export class CommunityBadgeComponent implements OnInit {
  @Input() community: ICommunity;

  constructor() { }

  ngOnInit() {
  }

}
