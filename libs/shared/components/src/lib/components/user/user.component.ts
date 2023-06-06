import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'commudle-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
