import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-community-events-list',
  templateUrl: './community-events-list.component.html',
  styleUrls: ['./community-events-list.component.scss']
})
export class CommunityEventsListComponent implements OnInit {
  faPlusSquare = faPlusSquare;
  communityId;
  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.communityId = this.activatedRoute.snapshot.parent.params['name'];
  }

}
