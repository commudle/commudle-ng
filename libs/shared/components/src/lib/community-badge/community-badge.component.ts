import { Component, OnInit, Input } from '@angular/core';
import { ICommunity } from '@commudle/shared-models';

@Component({
  selector: 'commudle-community-badge',
  templateUrl: './community-badge.component.html',
  styleUrls: ['./community-badge.component.scss']
})
export class CommunityBadgeComponent implements OnInit {

  @Input() community: ICommunity;
  @Input() background: string;

  constructor() { }

  ngOnInit() {
  }

}
