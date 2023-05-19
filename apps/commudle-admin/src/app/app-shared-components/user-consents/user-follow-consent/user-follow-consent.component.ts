import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'commudle-user-follow-consent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-follow-consent.component.html',
  styleUrls: ['./user-follow-consent.component.scss'],
})
export class UserFollowConsentComponent implements OnInit {
  @Input() username;
  constructor() {}

  ngOnInit(): void {}
}
