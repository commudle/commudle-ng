import { IUser } from 'projects/shared-models/user.model';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppUsersService } from 'projects/commudle-admin/src/app/services/app-users.service';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss']
})
export class PublicProfileComponent implements OnInit, OnDestroy {
  user: IUser;
  currentUser: ICurrentUser;
  subscriptions = [];


  constructor(
    private activatedRoute: ActivatedRoute,
    private authWatchService: LibAuthwatchService,
    private usersService: AppUsersService
  ) { }

  ngOnInit(): void {
    this.usersService.getProfile(this.activatedRoute.snapshot.params.username).subscribe(
      data => {
        this.user = data;
      }
    )


    this.subscriptions.push(
      this.authWatchService.currentUser$.subscribe(
        data => {
          this.currentUser = data;
        }
      )
    );
  }

  ngOnDestroy() {
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }

}
