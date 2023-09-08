import { Component, OnInit } from '@angular/core';
import { faBookmark, faCalendarCheck, faEye, faFlask, faLightbulb, faLink } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'commudle-userprofile-details',
  templateUrl: './userprofile-details.component.html',
  styleUrls: ['./userprofile-details.component.scss'],
})
export class UserprofileDetailsComponent implements OnInit {
  faEye = faEye;
  faFlask = faFlask;
  faLightbulb = faLightbulb;
  faCalendarCheck = faCalendarCheck;
  faBookmark = faBookmark;
  faLink = faLink;
  constructor() {}

  ngOnInit(): void {}
}
