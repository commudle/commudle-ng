import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IDiscussionFollower} from '../../../../../../../shared-models/discussion-follower.model';
import {ICurrentUser} from '../../../../../../../shared-models/current_user.model';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss']
})
export class ChatsListComponent implements OnInit {

  @Input() allPersonalChatUsers: IDiscussionFollower[];
  @Input() currentUser: ICurrentUser;
  @Output() getChat: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }
}
