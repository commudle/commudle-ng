export enum EHmsRoles {
  VIEWER = 'viewer', // Legacy of member
  HOST = 'host', // Can edit everything
  HOST_VIEWER = 'hostviewer', // Can edit everything but only view
  GUEST = 'guest', // Temporary host permissions (not all)
  MEMBER = 'member', // Attendee
}
