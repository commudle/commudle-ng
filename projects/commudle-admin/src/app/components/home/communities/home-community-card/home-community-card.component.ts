import { Component, Input, OnInit } from '@angular/core';
import { ICommunity } from 'projects/shared-models/community.model';

@Component({
  selector: 'app-home-community-card',
  templateUrl: './home-community-card.component.html',
  styleUrls: ['./home-community-card.component.scss']
})
export class HomeCommunityCardComponent implements OnInit {
  @Input() community: ICommunity;
  constructor() { }

  ngOnInit() {
  }

}
