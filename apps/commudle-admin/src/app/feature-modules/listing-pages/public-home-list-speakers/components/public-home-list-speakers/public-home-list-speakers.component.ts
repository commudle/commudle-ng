import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'commudle-public-home-list-speakers',
  templateUrl: './public-home-list-speakers.component.html',
  styleUrls: ['./public-home-list-speakers.component.scss'],
})
export class PublicHomeListSpeakersComponent implements OnInit {
  isMobileView: boolean;
  constructor() {}

  ngOnInit(): void {
    this.isMobileView = window.innerWidth <= 640;
  }
}
