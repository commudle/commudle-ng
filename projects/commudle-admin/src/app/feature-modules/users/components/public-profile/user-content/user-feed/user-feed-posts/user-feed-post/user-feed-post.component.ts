import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPost} from 'projects/shared-models/post.model';
import {IUser} from 'projects/shared-models/user.model';
import {ICurrentUser} from 'projects/shared-models/current_user.model';

@Component({
  selector: 'app-user-feed-post',
  templateUrl: './user-feed-post.component.html',
  styleUrls: ['./user-feed-post.component.scss']
})
export class UserFeedPostComponent implements OnInit {

  @Input() user: IUser;
  @Input() currentUser: ICurrentUser;
  @Input() post: IPost;

  @Output() deletePost: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onDeletePost(): void {
    this.deletePost.emit(this.post.id);
  }

}
