import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-chats-window',
  templateUrl: './chats-window.component.html',
  styleUrls: ['./chats-window.component.scss']
})
export class ChatsWindowComponent implements OnInit {

  @Input() currentUser;
  @Input() discussion;

  constructor() {
  }

  ngOnInit(): void {
  }

}
