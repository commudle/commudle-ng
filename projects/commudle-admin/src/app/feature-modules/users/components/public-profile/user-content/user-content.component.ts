import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'projects/shared-models/user.model';

@Component({
  selector: 'app-user-content',
  templateUrl: './user-content.component.html',
  styleUrls: ['./user-content.component.scss']
})
export class UserContentComponent implements OnInit {
  @Input() user: IUser

  constructor() { }

  ngOnInit(): void {
  }

}
