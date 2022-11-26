import { Component, OnInit, Input } from '@angular/core';
import { ICommunity } from 'apps/shared-models/community.model';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {
  @Input() community: ICommunity;
  constructor() { }

  ngOnInit() {
  }

}
