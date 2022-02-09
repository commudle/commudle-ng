import { Component, OnInit } from '@angular/core';
import { IUser } from 'projects/shared-models/user.model';

@Component({
  selector: 'app-mini-user-profile',
  templateUrl: './mini-user-profile.component.html',
  styleUrls: ['./mini-user-profile.component.scss'],
})
export class MiniUserProfileComponent implements OnInit {
  user: IUser = {
    id: null,
    name: 'Ajay Singh',
    email: null,
    about_me: null,
    designation: 'Software Developer',
    personal_website: null,
    linkedin: null,
    github: null,
    twitter: null,
    dribbble: null,
    behance: null,
    medium: null,
    gitlab: null,
    facebook: null,
    youtube: null,
    gender: null,
    avatar: 'assets/images/commudle-logo96.png',
    profile_banner_image: null,
    username: 'vector',
    location: null,
    tags: null,
    is_expert: true,
    badges: null,
    followers_count: 300,
    followees_count: 400,
  };

  tags: string[] = ['React', 'Angular', 'Express', 'Ruby'];

  badgesCount = 4;

  communitiesCount = 10;

  constructor() {}

  ngOnInit(): void {}
}
