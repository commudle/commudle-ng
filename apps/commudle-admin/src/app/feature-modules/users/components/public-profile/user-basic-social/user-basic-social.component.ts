import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { faDribbble, faGitlab, faMediumM, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { UserProfileMenuService } from 'apps/commudle-admin/src/app/feature-modules/users/services/user-profile-menu.service';
import { IUser } from '@commudle/shared-models';

@Component({
  selector: 'commudle-user-basic-social',
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
