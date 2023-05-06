import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule } from '@commudle/theme';
import { UserFollowConsentComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-follow-consent/user-follow-consent.component';
import { JoinChannelConsentComponent } from 'apps/commudle-admin/src/app/app-shared-components/join-channel-consent/join-channel-consent.component';
import { JoinCommunityConsentComponent } from 'apps/commudle-admin/src/app/app-shared-components/join-community-consent/join-community-consent.component';
import { AcceptEventVolunteerConsentComponent } from 'apps/commudle-admin/src/app/app-shared-components/accept-event-volunteer-consent/accept-event-volunteer-consent.component';

@Component({
  selector: 'commudle-user-consents',
  standalone: true,
  imports: [
    CommonModule,
    NbButtonModule,
    NbCardModule,
    UserFollowConsentComponent,
    JoinChannelConsentComponent,
    JoinCommunityConsentComponent,
    AcceptEventVolunteerConsentComponent,
  ],
  templateUrl: './user-consents.component.html',
  styleUrls: ['./user-consents.component.scss'],
})
export class UserConsentsComponent implements OnInit {
  @Input() isFollowing: boolean;
  @Input() username: string;
  @Input() onjoinChannel: boolean;
  @Input() joinCommunity: boolean;
  @Input() communitySlug: string;
  @Input() acceptRole: boolean;
  @Input() volunteerCommunityName: string;
  @Input() volunteerEventName: string;
  // @Input() communityName: string;
  constructor() {}

  ngOnInit(): void {}
}
