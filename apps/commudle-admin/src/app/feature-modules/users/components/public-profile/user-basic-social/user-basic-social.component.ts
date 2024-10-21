import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { faDribbble, faGitlab, faMediumM, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { UserProfileMenuService } from 'apps/commudle-admin/src/app/feature-modules/users/services/user-profile-menu.service';
import { IUser } from 'apps/shared-models/user.model';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-basic-social',
  templateUrl: './user-basic-social.component.html',
  styleUrls: ['./user-basic-social.component.scss'],
})
export class UserBasicSocialComponent implements OnChanges {
  @Input() user: IUser;

  showFullAbout = false;

  faYoutube = faYoutube;
  faMediumM = faMediumM;
  faDribbble = faDribbble;
  faGitlab = faGitlab;
  faExclamationCircle = faExclamationCircle;
  faInstagram = faInstagram;

  constructor(public userProfileMenuService: UserProfileMenuService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user) {
      const fields = [
        'about_me',
        'personal_website',
        'linkedin',
        'twitter',
        'github',
        'youtube',
        'medium',
        'dribbble',
        'behance',
        'gitlab',
        'facebook',
        'instagram',
      ];

      this.userProfileMenuService.addMenuItem(
        'about',
        fields.some((field) => this.isValid(this.user[field])),
      );
    }
  }

  isValid(value: string): boolean {
    return value && value !== '';
  }
}
