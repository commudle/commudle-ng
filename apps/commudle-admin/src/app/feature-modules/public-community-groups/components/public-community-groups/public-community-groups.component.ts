import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-public-community-groups',
  templateUrl: './public-community-groups.component.html',
  styleUrls: ['./public-community-groups.component.scss'],
})
export class PublicCommunityGroupsComponent implements OnInit {
  subscriptions: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // this.subscriptions.push(this.activatedRoute.parent.params.subscribe((data) => {}));
  }
}
