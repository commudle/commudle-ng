import { Component, Input, OnInit } from '@angular/core';
import {
  faArrowRight,
  faBookmark,
  faCalendarCheck,
  faEye,
  faFlask,
  faLightbulb,
  faLink,
  faMicrophone,
} from '@fortawesome/free-solid-svg-icons';
import { ICurrentUser } from 'apps/shared-models/current_user.model';

@Component({
  selector: 'commudle-userprofile-details',
  templateUrl: './userprofile-details.component.html',
  styleUrls: ['./userprofile-details.component.scss'],
})
export class UserprofileDetailsComponent implements OnInit {
  @Input() userProfileDetails;
  @Input() username;
  faEye = faEye;
  faFlask = faFlask;
  faLightbulb = faLightbulb;
  faCalendarCheck = faCalendarCheck;
  faBookmark = faBookmark;
  faLink = faLink;
  faArrowRight = faArrowRight;
  faMicrophone = faMicrophone;
  constructor() {}

  ngOnInit(): void {}
}
