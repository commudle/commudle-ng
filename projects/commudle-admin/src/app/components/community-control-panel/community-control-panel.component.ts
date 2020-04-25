import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ICommunity } from 'projects/shared-models/community.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-community-control-panel',
  templateUrl: './community-control-panel.component.html',
  styleUrls: ['./community-control-panel.component.scss']
})
export class CommunityControlPanelComponent implements OnInit {
  community: ICommunity;
  constructor(
    private titleService: Title
  ) { }

  ngOnInit() { }


  setCommunity(community) {
    this.community = community;
    this.setTitle();
  }

  setTitle() {
    this.titleService.setTitle(`${this.community.name} | Community Admin`);
  }

}
