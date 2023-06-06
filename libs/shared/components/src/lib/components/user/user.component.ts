import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IUser } from '@commudle/shared-models';

@Component({
  selector: 'commudle-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
  @Input() user: IUser;

  constructor() {}

  ngOnInit(): void {}
}
