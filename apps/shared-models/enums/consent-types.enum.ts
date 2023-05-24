export enum ConsentTypesEnum {
  userFollow = 'user-follow',
  joinCommunity = 'join-community',
  joinBuild = 'join-build',
  joinChannelToken = 'join-channel-by-token',
  joinChannelButton = 'join-channel-by-button',
  joinChannelEmail = 'join-channel-by-email',
  acceptRole = 'accept-role',
  oneClickRegistration = 'one-click-registration',
  oneClickRegistrationForm = 'one-click-registration-form',
  resumeConsent = 'resume-consent',
  acceptRSVP = 'accept-rsvp-consent',
  deactivateDeleteAccount = 'deactivate-delete',
}

export enum ButtonStyle {
  Deactivate = 'deactivate-button',
  Accept = 'accept-button',
}

export enum ButtonText {
  Deactivate = 'Accept and Logout',
  Accept = 'Accept',
}
