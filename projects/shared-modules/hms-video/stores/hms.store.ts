import { HMSLogLevel } from '@100mslive/hms-video';
import { HMSReactiveStore } from '@100mslive/hms-video-store';
import { IHMSActions } from '@100mslive/hms-video-store/dist/core/IHMSActions';
import { IHMSNotifications } from '@100mslive/hms-video-store/dist/core/IHMSNotifications';
import { IHMSStoreReadOnly } from '@100mslive/hms-video-store/dist/core/IHMSStore';

const hms: HMSReactiveStore = new HMSReactiveStore();

// by default subscriber is notified about store changes post subscription only, this can be
// changed to call it right after subscribing too using this function.
hms.triggerOnSubscribe(); // optional, recommended

export const hmsActions: IHMSActions = hms.getHMSActions();
export const hmsStore: IHMSStoreReadOnly = hms.getStore();
export const hmsNotifications: IHMSNotifications = hms.getNotifications();

hmsActions.setLogLevel(HMSLogLevel.VERBOSE);
