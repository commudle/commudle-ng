import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { IDataFormEntityResponseGroup } from '@commudle/shared-models';
import { IUser } from '@commudle/shared-models';
import * as moment from 'moment';

@Component({
  selector: 'commudle-user-details-cell',
  templateUrl: './user-details-cell.component.html',
  styleUrls: ['./user-details-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailsCellComponent implements OnInit, OnChanges {
  moment = moment;

  @Input() userResponse: IDataFormEntityResponseGroup;
  @Input() eventDataFormEntityGroupId;
  user: IUser;

  @Output() updatedRegistrationStatus = new EventEmitter();
  @Output() updateEntryPass = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.user = this.userResponse.user;
  }

  ngOnChanges() {
    this.user = this.userResponse.user;
  }

}
