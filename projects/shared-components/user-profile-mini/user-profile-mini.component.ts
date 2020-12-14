import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'projects/shared-models/user.model';
import { NbWindowService } from '@nebular/theme';
import { UserChatComponent } from '../user-chat/user-chat.component';

@Component({
  selector: 'app-user-profile-mini',
  templateUrl: './user-profile-mini.component.html',
  styleUrls: ['./user-profile-mini.component.scss']
})
export class UserProfileMiniComponent implements OnInit {
  @Input() user: IUser;
  @Input() size: string;
  @Input() designation: boolean;
  @Input() showLiveStatus: boolean;

  constructor(
    private windowService: NbWindowService
  ) { }

  ngOnInit() {
  }


}
