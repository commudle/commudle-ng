import { Component, OnInit } from '@angular/core';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'commudle-public-home-list-events-speakers',
  templateUrl: './public-home-list-events-speakers.component.html',
  styleUrls: ['./public-home-list-events-speakers.component.scss'],
})
export class PublicHomeListEventsSpeakersComponent implements OnInit {
  faMicrophone = faMicrophone;
  constructor() {}

  ngOnInit(): void {}
}
