import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
import { IUserStat } from 'libs/shared/models/src/lib/user-stats.model';

@Component({
  selector: 'commudle-userprofile-details',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './userprofile-details.component.html',
  styleUrls: ['./userprofile-details.component.scss'],
})
export class UserprofileDetailsComponent implements OnInit {
  @Input() userProfileDetails: IUserStat;
  @Input() username;
  @Input() showUpperCardUserDetails = true;
  @Input() showLowerCardUserDetails = true;
  @Input() completeProfileText = 'Complete Your Profile';
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
