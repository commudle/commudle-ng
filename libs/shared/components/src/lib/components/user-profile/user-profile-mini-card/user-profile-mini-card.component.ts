import { Component, Input } from '@angular/core';
import { IUser } from '@commudle/shared-models';

@Component({
  selector: 'commudle-user-profile-mini-card',
  templateUrl: './user-profile-mini-card.component.html',
  styleUrls: ['./user-profile-mini-card.component.scss'],
})
export class UserProfileMiniCardComponent {
  @Input() user: IUser;
  @Input() size: string;
  @Input() designation: boolean;
  @Input() disableAnchor = false;
}
