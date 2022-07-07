import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
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
  styleUrls: ['./user-feed.component.scss'],
})
export class UserFeedComponent implements OnInit, OnChanges, OnDestroy {
  @Input() user: IUser;

  currentUser: ICurrentUser;
  posts: IPost[];

  subscriptions: Subscription[] = [];

  constructor(
    private appUsersService: AppUsersService,
    private nbToastrService: NbToastrService,
    private authWatchService: LibAuthwatchService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(this.authWatchService.currentUser$.subscribe((data) => (this.currentUser = data)));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user) {
      this.getPosts();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((value) => value.unsubscribe());
  }

  getPosts() {
    this.subscriptions.push(
      this.appUsersService.posts(this.user.username).subscribe((value) => (this.posts = value.posts)),
    );
  }

  deletePost(postId: number) {
    this.subscriptions.push(
      this.appUsersService.deletePost(postId).subscribe(() => {
        this.nbToastrService.success('Post has been deleted successfully!', 'Success');
        this.getPosts();
      }),
    );
  }
}
