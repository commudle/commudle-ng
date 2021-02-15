import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'projects/shared-models/user.model';

@Component({
  selector: 'app-user-cover-photo',
  templateUrl: './user-cover-photo.component.html',
  styleUrls: ['./user-cover-photo.component.scss']
})
export class UserCoverPhotoComponent implements OnInit {
  @Input() user: IUser;

  constructor() { }

  ngOnInit(): void {
  }

}
