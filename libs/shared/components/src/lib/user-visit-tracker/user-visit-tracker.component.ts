import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICurrentUser } from '@commudle/shared-models';
import { LibAuthwatchService, UserVisitsService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-user-visit-tracker',
  templateUrl: './user-visit-tracker.component.html',
  styleUrls: ['./user-visit-tracker.component.scss'],
})
export class UserVisitTrackerComponent implements OnInit {
  currentUser: ICurrentUser;
  currentRoute;

  constructor(
    private router: Router,
    private location: Location,
    private userVisitsService: UserVisitsService,
    private authWatchService: LibAuthwatchService,
  ) {}

  ngOnInit() {
    this.currentRoute = this.router.url;

    this.userVisits();
    this.userVisitsService.receiveData();
  }

  userVisits() {
    // create a visit if the route changes
    this.router.events.subscribe(() => {
      if (this.location.path() !== this.currentRoute) {
        this.sendLog();
      }
    });

    // create a visit if the user changes
    this.authWatchService.currentUser$.subscribe(() => this.sendLog());
  }

  sendLog() {
    this.currentRoute = this.location.path();
    this.userVisitsService.subscribe(this.currentRoute);
  }
}
