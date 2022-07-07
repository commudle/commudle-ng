import { Component, Input, OnInit } from '@angular/core';
import { faDribbble, faGitlab, faMediumM, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { IUser } from 'projects/shared-models/user.model';

@Component({
  selector: 'app-user-basic-social',
  templateUrl: './user-basic-social.component.html',
  styleUrls: ['./user-basic-social.component.scss'],
})
export class UserBasicSocialComponent implements OnInit {
  @Input() user: IUser;

  showFullAbout = false;

  faYoutube = faYoutube;
  faMediumM = faMediumM;
  faDribbble = faDribbble;
  faGitlab = faGitlab;

  constructor() {}

  ngOnInit(): void {}

  isValid(value: string): boolean {
    return value && value !== '';
  }
}
