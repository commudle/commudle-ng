import { Component, Input } from '@angular/core';
import { IUser } from '@commudle/shared-models';
@Component({
  selector: 'commudle-interested-members',
  templateUrl: './interested-members.component.html',
  styleUrls: ['./interested-members.component.scss'],
})
export class InterestedMembersComponent {
  @Input() users: IUser[];
  @Input() totalCount: number;
}
