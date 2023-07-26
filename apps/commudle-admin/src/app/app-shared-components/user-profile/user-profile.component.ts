import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICurrentUser } from 'apps/shared-models/current_user.model';

@Component({
  selector: 'commudle-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  @Input() currentUser: ICurrentUser;
  constructor() {}

  ngOnInit(): void {}
}
