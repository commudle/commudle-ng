import {Component, Input, OnInit} from '@angular/core';
import {IUser} from 'projects/shared-models/user.model';

@Component({
  selector: 'app-user-basic-social',
  templateUrl: './user-basic-social.component.html',
  styleUrls: ['./user-basic-social.component.scss']
})
export class UserBasicSocialComponent implements OnInit {

  @Input() user: IUser;

  constructor() {
  }

  ngOnInit(): void {
  }

  isDisabled(value: string) {
    return value === '' || !value;
  }

}
