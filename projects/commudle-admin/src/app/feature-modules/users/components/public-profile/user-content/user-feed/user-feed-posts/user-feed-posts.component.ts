import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPost} from 'projects/shared-models/post.model';
import {IUser} from 'projects/shared-models/user.model';
import {ICurrentUser} from 'projects/shared-models/current_user.model';

@Component({
  selector: 'app-user-feed-posts',
  templateUrl: './user-feed-posts.component.html',
  styleUrls: ['./user-feed-posts.component.scss']
})
export class UserFeedPostsComponent implements OnInit {

  @Input() user: IUser;
  @Input() currentUser: ICurrentUser;
  @Input() posts: IPost[];

  @Output() deletePost: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onDeletePost(postId: number): void {
    this.deletePost.emit(postId);
  }

}
