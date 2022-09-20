import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICurrentUser } from '@commudle/shared-models';
import { IPost } from '@commudle/shared-models';
import { IUser } from '@commudle/shared-models';

@Component({
  selector: 'commudle-user-feed-posts',
  templateUrl: './user-feed-posts.component.html',
  styleUrls: ['./user-feed-posts.component.scss'],
})
export class UserFeedPostsComponent implements OnInit {
  @Input() user: IUser;
  @Input() currentUser: ICurrentUser;
  @Input() posts: IPost[];

  @Output() deletePost: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  onDeletePost(postId: number): void {
    this.deletePost.emit(postId);
  }
}
