import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule } from '@commudle/theme';
import { UserFollowConsentComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-consents/user-follow-consent/user-follow-consent.component';
import { JoinChannelConsentComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-consents/join-channel-consent/join-channel-consent.component';
import { JoinCommunityConsentComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-consents/join-community-consent/join-community-consent.component';
import { AcceptEventVolunteerConsentComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-consents/accept-event-volunteer-consent/accept-event-volunteer-consent.component';
import { AcceptCommunityOrganizerConsentComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-consents/accept-community-organizer-consent/accept-community-organizer-consent.component';
import { AcceptCommunityAdministratorConsentComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-consents/accept-community-administrator-consent/accept-community-administrator-consent.component';
import { AcceptBuildTeammateConsentComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-consents/accept-build-teammate-consent/accept-build-teammate-consent.component';
import { AcceptChannelTokenConsentComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-consents/accept-channel-token-consent/accept-channel-token-consent.component';
import { AcceptEventOneClickRegistrationConsentComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-consents/accept-event-one-click-registration-consent/accept-event-one-click-registration-consent.component';
import { AcceptEventFormRegistrationConsentComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-consents/accept-event-form-registration-consent/accept-event-form-registration-consent.component';
import { AcceptResumeConsentComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-consents/accept-resume-consent/accept-resume-consent.component';
import { AcceptSingleClickRegistrationSpeakerConsentComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-consents/accept-single-click-registration-speaker-consent/accept-single-click-registration-speaker-consent.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShieldHeart } from '@fortawesome/free-solid-svg-icons';
import { AcceptJoinChannelEmailConsentComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-consents/accept-join-channel-email-consent/accept-join-channel-email-consent.component';
@Component({
  selector: 'commudle-user-consents',
  standalone: true,
  templateUrl: './user-consents.component.html',
  styleUrls: ['./user-consents.component.scss'],
  imports: [
    CommonModule,
    NbButtonModule,
    NbCardModule,
    FontAwesomeModule,
    UserFollowConsentComponent,
    JoinChannelConsentComponent,
    JoinCommunityConsentComponent,
    AcceptEventVolunteerConsentComponent,
    AcceptCommunityOrganizerConsentComponent,
    AcceptCommunityAdministratorConsentComponent,
    AcceptBuildTeammateConsentComponent,
    AcceptChannelTokenConsentComponent,
    AcceptEventOneClickRegistrationConsentComponent,
    AcceptEventFormRegistrationConsentComponent,
    AcceptResumeConsentComponent,
    AcceptSingleClickRegistrationSpeakerConsentComponent,
    AcceptJoinChannelEmailConsentComponent,
  ],
})
export class UserConsentsComponent implements OnInit {
  @Input() Following: boolean;
  @Input() username: string;
  @Input() onjoinChannel: boolean;
  @Input() joinCommunity: boolean;
  @Input() communitySlug: string;
  @Input() acceptRole: boolean;
  @Input() volunteerCommunityName: string;
  @Input() volunteerEventName: string;
  @Input() component: string;
  @Input() joinBuild: boolean;
  @Input() buildName: string;
  @Input() parentName: string;
  @Input() joinChannelToken: boolean;
  @Input() communityName: string;
  @Input() communityNameToken: string;
  @Input() oneClickRegistration: boolean;
  @Input() oneClickRegistrationForm: boolean;
  @Input() acceptResumeConsent: boolean;
  @Input() onacceptRSVP: boolean;
  @Input() communityNameSpeaker: string;
  @Input() eventNameSpeaker: string;
  @Input() channelName: string;
  @Input() channelNameToken: string;
  @Input() joinChannelEmail: boolean;
  @Input() communityNameEmail: string;
  @Input() channelNameEmail: string;
  @Output() consentOutput = new EventEmitter<string>();

  faShieldHeart = faShieldHeart;

  @ViewChild('consentAnimation', { static: false }) consentAnimationContainer: ElementRef<HTMLDivElement>;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    import('lottie-web').then((l) => {
      l.default.loadAnimation({
        container: this.consentAnimationContainer.nativeElement,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://assets4.lottiefiles.com/packages/lf20_iqGCdkx5tG.json',
      });
    });
  }

  accept() {
    this.consentOutput.emit('accepted');
  }

  reject() {
    this.consentOutput.emit('rejected');
  }
}
