import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule } from '@commudle/theme';
import { UserFollowConsentComponent } from '../user-follow-consent/user-follow-consent.component';

@Component({
  selector: 'commudle-user-consents',
  standalone: true,
  imports: [CommonModule, NbButtonModule, NbCardModule, UserFollowConsentComponent],
  templateUrl: './user-consents.component.html',
  styleUrls: ['./user-consents.component.scss'],
})
export class UserConsentsComponent implements OnInit {
  @Input() isFollowing: boolean;
  @Input() username: string;
  constructor() {}

  ngOnInit(): void {}
}
