import {Component, Input, OnInit} from '@angular/core';
import {ICommunity} from 'projects/shared-models/community.model';

@Component({
  selector: 'app-communities-list-card',
  templateUrl: './communities-list-card.component.html',
  styleUrls: ['./communities-list-card.component.scss']
})
export class CommunitiesListCardComponent implements OnInit {

  @Input() community: ICommunity;

  constructor() {
  }

  ngOnInit(): void {
  }

}
