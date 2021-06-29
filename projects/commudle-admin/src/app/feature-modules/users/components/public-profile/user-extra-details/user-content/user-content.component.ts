import {Component, Input, OnInit} from '@angular/core';
import {IUser} from 'projects/shared-models/user.model';
import {ICurrentUser} from 'projects/shared-models/current_user.model';

@Component({
  selector: 'app-user-content',
  templateUrl: './user-content.component.html',
  styleUrls: ['./user-content.component.scss']
})
export class UserContentComponent implements OnInit {

  @Input() user: IUser;
  @Input() currentUser: ICurrentUser;

  tabs = [
    {
      title: 'Contributions',
      route: ['contributions'],
    },
    {
      title: 'Social',
      route: ['social'],
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
