import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {IUser} from 'projects/shared-models/user.model';
import {ICurrentUser} from 'projects/shared-models/current_user.model';
import {AppUsersService} from 'projects/commudle-admin/src/app/services/app-users.service';
import {IPost} from 'projects/shared-models/post.model';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.scss']
})
export class UserFeedComponent implements OnInit, OnChanges {

  @Input() user: IUser;
  @Input() currentUser: ICurrentUser;

  posts: IPost[];

  constructor(
    private appUsersService: AppUsersService,
    private nbToastrService: NbToastrService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.getPosts();
  }

  getPosts() {
    // Get the user's posts
    this.appUsersService.posts(this.user.username).subscribe(value => this.posts = value.posts);
  }

  deletePost(postId: number) {
    this.appUsersService.deletePost(postId).subscribe(value => {
      this.nbToastrService.success('Post has been deleted successfully!', 'Success');
      this.getPosts();
    })
  }

}
