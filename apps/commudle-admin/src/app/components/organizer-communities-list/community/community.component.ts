import { Component, OnInit, Input } from '@angular/core';
import { ICommunity } from '@commudle/shared-models';

@Component({
  selector: 'commudle-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {
  @Input() community: ICommunity;
  constructor() { }

  ngOnInit() {
  }

}
