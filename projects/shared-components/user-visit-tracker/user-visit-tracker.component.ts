import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserVisitsService } from '../../shared-services/user-visits.service';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { Router, NavigationEnd, Event } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-user-visit-tracker',
  templateUrl: './user-visit-tracker.component.html',
  styleUrls: ['./user-visit-tracker.component.scss']
})
export class UserVisitTrackerComponent implements OnInit {
  currentUser: ICurrentUser;
  currentRoute;

  constructor(
    private router: Router,
    private location: Location,
    private userVisitsService: UserVisitsService,
    private authWatchService: LibAuthwatchService
  ) {

   }

  ngOnInit() {
    this.currentRoute = this.router.url;
    this.authWatchService.currentUser$.subscribe(currentUser => {
      this.currentUser = currentUser;
    });

    this.userVisits();
    this.userVisitsService.receiveData();
  }

  userVisits() {
    this.router.events.subscribe(val => {
      if (this.location.path() !== this.currentRoute) {
        this.currentRoute = this.location.path();
        console.log(this.currentRoute);
        this.userVisitsService.subscribe(this.currentRoute);
      }
    });
  }

}
