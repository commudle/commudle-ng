import {Component, Input, OnInit} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import {IUser} from 'projects/shared-models/user.model';
import {CompleteUrlPipe} from 'projects/shared-pipes/complete-url.pipe';

@Component({
  selector: 'app-user-basic-social',
  templateUrl: './user-basic-social.component.html',
  styleUrls: ['./user-basic-social.component.scss'],
  providers: [CompleteUrlPipe]
})
export class UserBasicSocialComponent implements OnInit {

  @Input() user: IUser;

  socialLinks = [];
  expanded = false;

  constructor(
    private completeUrlPipe: CompleteUrlPipe,
  ) {
  }

  ngOnInit(): void {  }

  isValid(value: string): boolean {
    if (value && value !== '') {
      if (!this.socialLinks.includes(value)) {
        this.socialLinks.push(value);
      }
      return true;
    }
    return false;
  }

  getCompressedUrl(url: string, urlType: string = '') {
    const transformedUrl = new URL(this.completeUrlPipe.transform(url, urlType))
    return (transformedUrl.host.replace(/^www./, '') + transformedUrl.pathname);
  }
}
