import { Component, OnInit } from '@angular/core';
import { faHeadset } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'commudle-public-home-list-events-tech-sessions',
  templateUrl: './public-home-list-events-tech-sessions.component.html',
  styleUrls: ['./public-home-list-events-tech-sessions.component.scss'],
})
export class PublicHomeListEventsTechSessionsComponent implements OnInit {
  faHeadset = faHeadset;
  constructor() {}

  ngOnInit(): void {}
}
