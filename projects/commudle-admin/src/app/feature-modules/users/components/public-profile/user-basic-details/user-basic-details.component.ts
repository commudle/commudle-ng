import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'projects/shared-models/user.model';

@Component({
  selector: 'app-user-basic-details',
  templateUrl: './user-basic-details.component.html',
  styleUrls: ['./user-basic-details.component.scss']
})
export class UserBasicDetailsComponent implements OnInit {
  @Input() user: IUser
  constructor() { }

  ngOnInit(): void {
  }

}
