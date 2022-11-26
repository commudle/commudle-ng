import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'apps/shared-models/user.model';

@Component({
  selector: 'app-hiring-looking-works-tags',
  templateUrl: './hiring-looking-works-tags.component.html',
  styleUrls: ['./hiring-looking-works-tags.component.scss'],
})
export class HiringLookingWorksTagsComponent implements OnInit {
  @Input() user: IUser;
  @Input() fontSize = '14px';

  constructor() {}

  ngOnInit(): void {}
}
