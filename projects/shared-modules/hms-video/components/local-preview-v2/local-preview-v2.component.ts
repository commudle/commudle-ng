import { HMSLogLevel } from '@100mslive/hms-video';
import {
  DeviceMap,
  HMSPeer,
  selectDevices,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
  selectLocalPeer,
} from '@100mslive/hms-video-store';
import { HMSDeviceManager } from '@100mslive/hms-video/dist/interfaces/HMSDeviceManager';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
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
export class LocalPreviewV2Component implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @Input() serverClient: IHmsClient;
  @Input() currentUser: ICurrentUser;

  // Available devices
  devices: DeviceMap = hmsStore.getState(selectDevices);

  // HMS status variables
  isAudioEnabled = true;
  isVideoEnabled = true;

  @ViewChild('videoContainer', { static: false }) videoContainer: ElementRef<HTMLDivElement>;

  constructor(private hmsVideoStateService: HmsVideoStateService) {}

  ngOnInit(): void {
    hmsActions.setLocalAudioEnabled(this.isAudioEnabled);
    hmsActions.setLocalVideoEnabled(this.isVideoEnabled);
  }

  ngAfterViewInit(): void {
    hmsStore.subscribe(this.getMediaDevices, selectDevices);
    hmsStore.subscribe(this.renderPeers, selectLocalPeer);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.serverClient && this.serverClient && this.currentUser) {
      this.startPreview();
    }
  }

  ngOnDestroy(): void {
    // hmsActions.leave();
  }

  getMediaDevices = (devices: HMSDeviceManager) => {
    if (devices.audioInput.length > 0 || devices.videoInput.length > 0) {
      this.devices = devices;
    }
  };

  renderVideo = (peer: HMSPeer) => {
    const videoElement: HTMLVideoElement = document.createElement('video');
    videoElement.autoplay = true;
    videoElement.muted = true;
    videoElement.width = this.videoContainer.nativeElement.clientWidth;

    hmsActions.attachVideo(peer.videoTrack, videoElement);

    return videoElement;
  };

  renderPeers = (peer: HMSPeer) => {
    if (peer) {
      this.videoContainer.nativeElement.innerHTML = '';
      this.videoContainer.nativeElement.appendChild(this.renderVideo(peer));
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
