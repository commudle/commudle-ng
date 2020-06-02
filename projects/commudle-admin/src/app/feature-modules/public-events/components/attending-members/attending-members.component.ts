import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IEvent } from 'projects/shared-models/event.model';
import { ICommunity } from 'projects/shared-models/community.model';
import { IUser } from 'projects/shared-models/user.model';
import { EEventStatuses } from 'projects/shared-models/enums/event_statuses.enum';
import { DataFormEntityResponseGroupsService } from 'projects/commudle-admin/src/app/services/data-form-entity-response-groups.service';

@Component({
  selector: 'app-attending-members',
  templateUrl: './attending-members.component.html',
  styleUrls: ['./attending-members.component.scss']
})
export class AttendingMembersComponent implements OnInit {
  EEventStatuses = EEventStatuses;
  @Input() event: IEvent;
  @Input() community: ICommunity;
  @Output() hasInterestedMembers = new EventEmitter();

  users: IUser[] = [];
  totalCount = 0;

  constructor(
    private dataFormEntityResponseGroupsService: DataFormEntityResponseGroupsService
  ) { }

  ngOnInit() {
    this.getInterestedMembers();
  }


  getInterestedMembers() {
    this.dataFormEntityResponseGroupsService.pEventInterestedUsers(this.event.id).subscribe(
      data => {
        this.users = data.users;
        this.totalCount = data.total_count;

        if (this.users.length > 0) {
          this.hasInterestedMembers.emit(true);
        }
      }
    );
  }

}
