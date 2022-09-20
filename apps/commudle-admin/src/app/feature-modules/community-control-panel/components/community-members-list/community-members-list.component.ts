import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'commudle-community-members-list',
  templateUrl: './community-members-list.component.html',
  styleUrls: ['./community-members-list.component.scss'],
})
export class CommunityMembersListComponent implements OnInit {
  tabs: any[] = [
    {
      title: 'All Members',
      route: `./`,
    },
    {
      title: 'Blocked Users',
      route: `./blocked`,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
