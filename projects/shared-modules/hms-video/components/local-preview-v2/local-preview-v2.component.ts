import { getLocalStream } from '@100mslive/hms-video';
import {
  DeviceMap,
  HMSPeer,
  selectDevices,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
  selectLocalMediaSettings,
  selectLocalPeer,
} from '@100mslive/hms-video-store';
import { HMSDeviceManager } from '@100mslive/hms-video/dist/interfaces/HMSDeviceManager';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { IHmsClient } from 'projects/shared-modules/hms-video/models/hms-client.model';
import { EHmsStates, HmsVideoStateService } from 'projects/shared-modules/hms-video/services/hms-video-state.service';
import { hmsActions, hmsStore } from 'projects/shared-modules/hms-video/stores/hms.store';

@Component({
  selector: 'app-local-preview-v2',
  templateUrl: './local-preview-v2.component.html',
  styleUrls: ['./local-preview-v2.component.scss'],
})
export class LocalPreviewV2Component implements OnInit, OnChanges, AfterViewInit {
  @Input() serverClient: IHmsClient;
  @Input() currentUser: ICurrentUser;

  // Available devices
  devices: DeviceMap = hmsStore.getState(selectDevices);

  // HMS status variables
  isAudioEnabled = true;
  isVideoEnabled = true;

  @ViewChild('previewVideo', { static: false }) previewVideo: ElementRef<HTMLVideoElement>;

  constructor(private hmsVideoStateService: HmsVideoStateService) {}

  ngOnInit(): void {
    hmsActions.setLocalAudioEnabled(this.isAudioEnabled);
    hmsActions.setLocalVideoEnabled(this.isVideoEnabled);

    hmsStore.subscribe(this.getMediaDevices, selectDevices);
  }

  ngAfterViewInit(): void {
    hmsStore.subscribe(this.renderPeer, selectLocalPeer);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.serverClient && this.currentUser) {
      this.startPreview();
    }
  }

  getMediaDevices = (devices: HMSDeviceManager) => {
    if (devices.audioInput.length > 0 && devices.videoInput.length > 0) {
      this.devices = devices;
    }
  };

  renderPeer = (peer: HMSPeer) => {
    if (peer) {
      getLocalStream({
        audio: {
          deviceId: hmsStore.getState(selectLocalMediaSettings).audioInputDeviceId,
        },
        video: {
          deviceId: hmsStore.getState(selectLocalMediaSettings).videoInputDeviceId,
        },
      }).then((value: MediaStream) => {
        this.previewVideo.nativeElement.srcObject = value;
      });
    }
  };

  setAudioDevice(deviceId: string): void {
    hmsActions.setAudioSettings({
      deviceId: deviceId,
    });
  }

  setVideoDevice(deviceId: string): void {
    hmsActions.setVideoSettings({
      deviceId: deviceId,
    });
  }

  startPreview(): void {
    hmsActions.preview({
      authToken: this.serverClient.token,
      userName: this.currentUser.name,
      // @ts-ignore
      settings: {
        audioInputDeviceId: 'default',
        videoDeviceId: 'default',
        isAudioMuted: !this.isAudioEnabled,
        isVideoMuted: !this.isVideoEnabled,
      },
    });
  }

  toggleAudio(): void {
    const enabled: boolean = hmsStore.getState(selectIsLocalAudioEnabled);
    hmsActions.setLocalAudioEnabled(!enabled).then(() => (this.isAudioEnabled = !enabled));
  }

  toggleVideo() {
    const enabled: boolean = hmsStore.getState(selectIsLocalVideoEnabled);
    hmsActions.setLocalVideoEnabled(!enabled).then(() => (this.isVideoEnabled = !enabled));
  }

  joinRoom(): void {
    this.hmsVideoStateService.setState(EHmsStates.ROOM);
  }
}
