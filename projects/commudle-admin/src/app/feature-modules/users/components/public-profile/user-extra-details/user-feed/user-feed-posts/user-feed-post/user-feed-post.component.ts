import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { IPost } from 'projects/shared-models/post.model';
import { IUser } from 'projects/shared-models/user.model';

@Component({
  selector: 'app-user-feed-post',
  templateUrl: './user-feed-post.component.html',
  styleUrls: ['./user-feed-post.component.scss'],
})
export class UserFeedPostComponent implements OnInit {
  @Input() user: IUser;
  @Input() currentUser: ICurrentUser;
  @Input() post: IPost;

  @Output() deletePost: EventEmitter<number> = new EventEmitter<number>();

  constructor(private nbDialogService: NbDialogService) {}

  ngOnInit(): void {}

  onDeletePost(ref: NbDialogRef<any>): void {
    this.deletePost.emit(this.post.id);
    ref.close();
  }

  openDialog(ref: TemplateRef<any>) {
    this.nbDialogService.open(ref);
  }
}
