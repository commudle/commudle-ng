import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { AppUsersService } from 'projects/commudle-admin/src/app/services/app-users.service';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { IPost } from 'projects/shared-models/post.model';
import { IUser } from 'projects/shared-models/user.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.scss']
})
export class UserFeedComponent implements OnInit, OnDestroy {

  user: IUser;
  currentUser: ICurrentUser;

  posts: IPost[];

  subscriptions: Subscription[] = [];

  constructor(
    private appUsersService: AppUsersService,
    private nbToastrService: NbToastrService,
    private activatedRoute: ActivatedRoute,
    private authWatchService: LibAuthwatchService
  ) {
  }

  ngOnInit(): void {
    // Get user's data
    this.subscriptions.push(this.activatedRoute.parent.params.subscribe(data => {
      this.getUserData(data.username);
    }));

    // Get logged in user
    this.subscriptions.push(this.authWatchService.currentUser$.subscribe(data => {
      this.currentUser = data;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }

  // Get user's data
  getUserData(username: string) {
    this.subscriptions.push(this.appUsersService.getProfile(username).subscribe(data => {
      this.user = data;
      this.getPosts();
    }));
  }

  getPosts() {
    // Get the user's posts
    this.subscriptions.push(this.appUsersService.posts(this.user.username).subscribe(value => {
      this.posts = value.posts;
    }));
  }

  deletePost(postId: number) {
    this.subscriptions.push(this.appUsersService.deletePost(postId).subscribe(value => {
      this.nbToastrService.success('Post has been deleted successfully!', 'Success');
      this.getPosts();
    }));
  }

}
