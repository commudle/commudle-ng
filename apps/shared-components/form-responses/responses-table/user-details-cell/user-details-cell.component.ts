import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { IDataFormEntityResponseGroup } from 'apps/shared-models/data_form_entity_response_group.model';
import { IUser } from 'apps/shared-models/user.model';
import * as moment from 'moment';

@Component({
  selector: 'app-user-details-cell',
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
