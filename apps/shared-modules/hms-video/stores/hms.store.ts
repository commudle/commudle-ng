import { HMSLogLevel, HMSReactiveStore } from '@100mslive/hms-video-store';

const hms: HMSReactiveStore = new HMSReactiveStore();

// by default subscriber is notified about store changes post subscription only, this can be
// changed to call it right after subscribing too using this function.
hms.triggerOnSubscribe(); // optional, recommended

export const hmsActions = hms.getActions();
export const hmsStore = hms.getStore();
export const hmsNotifications = hms.getNotifications();

hmsActions.setLogLevel(HMSLogLevel.WARN);
