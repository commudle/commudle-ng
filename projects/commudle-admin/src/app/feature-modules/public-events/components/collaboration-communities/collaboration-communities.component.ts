import { Component, OnInit, Input } from '@angular/core';
import { ICommunity } from 'projects/shared-models/community.model';
import { IEvent } from 'projects/shared-models/event.model';

@Component({
  selector: 'app-collaboration-communities',
  templateUrl: './collaboration-communities.component.html',
  styleUrls: ['./collaboration-communities.component.scss']
})
export class CollaborationCommunitiesComponent implements OnInit {
  @Input() community: ICommunity;
  @Input() event: IEvent;

  constructor() { }

  ngOnInit() {
  }

}
