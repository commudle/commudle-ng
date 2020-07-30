import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'projects/shared-models/user.model';
import { NbWindowService } from '@nebular/theme';
import { UserChatComponent } from '../user-chat/user-chat.component';

@Component({
  selector: 'app-user-profile-horizontal',
  templateUrl: './user-profile-horizontal.component.html',
  styleUrls: ['./user-profile-horizontal.component.scss']
})
export class UserProfileHorizontalComponent implements OnInit {
  @Input() user: IUser;
  @Input() size: string;
  @Input() aboutMe: boolean;
  @Input() socialMediaLinks: boolean;

  constructor(
    private windowService: NbWindowService
  ) { }

  ngOnInit() {
  }

  openChatWithUser() {
    this.windowService.open(UserChatComponent, {
      title: 'Personal Messages',
      context: {
        discussionUserIds: [this.user.id]
      }
    });
  }

}
