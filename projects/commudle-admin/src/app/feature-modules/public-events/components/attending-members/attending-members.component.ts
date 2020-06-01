import { Component, OnInit, Input } from '@angular/core';
import { IEvent } from 'projects/shared-models/event.model';
import { ICommunity } from 'projects/shared-models/community.model';
import { IUser } from 'projects/shared-models/user.model';

@Component({
  selector: 'app-attending-members',
  templateUrl: './attending-members.component.html',
  styleUrls: ['./attending-members.component.scss']
})
export class AttendingMembersComponent implements OnInit {

  @Input() event: IEvent;
  @Input() community: ICommunity;

  users: IUser[];

  constructor() { }

  ngOnInit() {
  }

}
