import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home-experts',
  templateUrl: './home-experts.component.html',
  styleUrls: ['./home-experts.component.scss']
})
export class HomeExpertsComponent implements OnInit {

  experts = [
    {
      name: 'John Doe',
      avatar: 'https://www.w3schools.com/howto/img_avatar.png',
      designation: 'Commudle',
      followers: 220,
      following: false,
    },
    {
      name: 'John Doe',
      avatar: 'https://www.w3schools.com/howto/img_avatar.png',
      designation: 'Commudle',
      followers: 24,
      following: true,
    },
    {
      name: 'John Doe',
      avatar: 'https://www.w3schools.com/howto/img_avatar.png',
      designation: 'Commudle',
      followers: 1000,
      following: false,
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
