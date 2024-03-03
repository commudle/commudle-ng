export enum ConsentTypesEnum {
  UserFollow = 'user-follow',
  JoinCommunity = 'join-community',
  JoinBuild = 'join-build',
  JoinChannelToken = 'join-channel-by-token',
  JoinChannelButton = 'join-channel-by-button',
  JoinChannelEmail = 'join-channel-by-email',
  AcceptRole = 'accept-role',
  OneClickRegistration = 'one-click-registration',
  OneClickRegistrationForm = 'one-click-registration-form',
  ResumeConsent = 'resume-consent',
  AcceptRSVP = 'accept-rsvp-consent',
  DeactivateDeleteAccount = 'deactivate-delete',
  HACKATHON_JUDGE_INVITATION = 'hackathon_judge_invitation',
}

export enum ButtonStyle {
  Deactivate = 'deactivate-button',
  Accept = 'accept-button',
}

export enum ButtonText {
  Deactivate = 'Accept and Logout',
  Accept = 'Accept',
}
