import {
  DeviceMap,
  HMSConfig,
  HMSException,
  HMSLocalVideoTrack,
  HMSRoom,
  HMSSdk,
  HMSTrack,
} from '@100mslive/hms-video';
import { HMSPreviewListener } from '@100mslive/hms-video/dist/interfaces/preview-listener';
import { HMSLocalPeer } from '@100mslive/hms-video/dist/sdk/models/peer';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { IHmsClient } from 'projects/shared-modules/hms-video/models/hms-client.model';
import { EHmsStates, HmsVideoStateService } from 'projects/shared-modules/hms-video/services/hms-video-state.service';
import { LocalMediaService } from 'projects/shared-modules/hms-video/services/local-media.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-local-preview-v2',
  templateUrl: './local-preview-v2.component.html',
  styleUrls: ['./local-preview-v2.component.scss'],
})
export class LocalPreviewV2Component implements OnInit, OnChanges, OnDestroy {
  @Input() serverClient: IHmsClient;
  @Input() currentUser: ICurrentUser;

  // Available devices
  audioDevices: MediaDeviceInfo[] = [];
  videoDevices: MediaDeviceInfo[] = [];
  selectedAudioDevice: MediaDeviceInfo;
  selectedVideoDevice: MediaDeviceInfo;

  // HMS status variables
  isAudioMuted = false;
  isVideoMuted = false;

  // Defining hms sdk
  hms = new HMSSdk();
  // Define the video track
  localVideoTrack: HMSLocalVideoTrack;
  // Define the preview listener
  previewListener: HMSPreviewListener = {
    onPreview: function (_room: HMSRoom, _localTracks: HMSTrack[]): void {
      const localPeer: HMSLocalPeer = this.hms.getLocalPeer();
      this.localVideoTrack = localPeer.videoTrack;
    }.bind(this),
    onError(_exception: HMSException) {},
    onDeviceChange(_deviceMap: DeviceMap): void {},
  };

  subscriptions: Subscription[] = [];

  constructor(
    private localMediaService: LocalMediaService,
    private nbToastrService: NbToastrService,
    private hmsVideoStateService: HmsVideoStateService,
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.serverClient && this.serverClient) {
      this.getDevices();
      if (!this.localVideoTrack) {
        this.startPreview();
      }
    }
  }

  ngOnDestroy(): void {
    // Leave preview
    this.hms.leave().then(() => console.info('left preview'));

    // Set the selected audio and video devices
    this.localMediaService.selectedAudioInputDevice = this.selectedAudioDevice;
    this.localMediaService.selectedVideoInputDevice = this.selectedVideoDevice;

    // Set the audio and video device status
    this.localMediaService.isAudioMuted = this.isAudioMuted;
    this.localMediaService.isVideoMuted = this.isVideoMuted;

    // Unsubscribe all subscriptions
    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }

  getMediaPermission(): void {
    // Check for permission to access devices
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((value: MediaStream) => {
        if (value.active) {
          this.getDevices();
        }
      })
      .catch((reason: any) => {
        this.nbToastrService.warning(reason, 'Error accessing media devices');
      });
  }

  getDevices(): void {
    // Get audio devices
    this.localMediaService.getConnectedDevices('audioinput', (deviceInfos: MediaDeviceInfo[]) => {
      this.audioDevices = deviceInfos.filter((value) => value.deviceId !== '');
      if (this.audioDevices.length > 0) {
        // Set the first audio device as placeholder
        this.selectedAudioDevice = this.audioDevices[0];
        this.setAudioTrack(this.selectedAudioDevice.deviceId);
      }
    });
    // Get video devices
    this.localMediaService.getConnectedDevices('videoinput', (deviceInfos: MediaDeviceInfo[]) => {
      this.videoDevices = deviceInfos.filter((value) => value.deviceId !== '');
      if (this.videoDevices.length > 0) {
        this.selectedVideoDevice = this.videoDevices[0];
        this.setVideoTrack(this.selectedVideoDevice.deviceId);
      }
    });
  }

  setAudioTrack(deviceId: string): void {
    // Update the local peer audio track
    const audioTrack = this.hms.getLocalPeer().audioTrack;
    if (audioTrack) {
      audioTrack
        // @ts-ignore
        .setSettings({
          deviceId: deviceId,
        })
        .then(() => console.info('changed audio device'));
    }
  }

  setVideoTrack(deviceId: string): void {
    // Update the local peer video track
    const videoTrack = this.hms.getLocalPeer().videoTrack;
    if (videoTrack) {
      videoTrack
        // @ts-ignore
        .setSettings({
          deviceId: deviceId,
        })
        .then(() => console.info('changed video device'));
    }
  }

  startPreview(): void {
    this.hms.preview(this.getPreviewConfig(), this.previewListener).then(() => console.info('joined preview'));
  }

  getPreviewConfig(): HMSConfig {
    return {
      authToken: this.serverClient.token,
      userName: this.currentUser.name,
      // @ts-ignore
      settings: {
        audioInputDeviceId: '',
        videoDeviceId: '',
        isAudioMuted: this.isAudioMuted,
        isVideoMuted: this.isVideoMuted,
      },
    };
  }

  changeAudioDevice(deviceId: string): void {
    // Find the required device from the list of devices
    this.selectedAudioDevice = this.audioDevices.find((value: MediaDeviceInfo) => value.deviceId === deviceId);
    // Set the audio track
    this.setAudioTrack(this.selectedAudioDevice.deviceId);
  }

  changeVideoDevice(deviceId: string): void {
    // Find the required device from the list of devices
    this.selectedVideoDevice = this.videoDevices.find((value: MediaDeviceInfo) => value.deviceId === deviceId);
    // Set the video track
    this.setVideoTrack(this.selectedVideoDevice.deviceId);
  }

  onAudioMute(): void {
    // Get local peer
    const localPeer: HMSLocalPeer = this.hms.getLocalPeer();
    // Set volume
    localPeer.audioTrack.setEnabled(false).then(() => console.info('audio turned off'));
    // Change status
    this.isAudioMuted = true;
  }

  onAudioUnmute(): void {
    // Get local peer
    const localPeer: HMSLocalPeer = this.hms.getLocalPeer();
    // Set volume
    localPeer.audioTrack.setEnabled(true).then(() => console.info('audio turned on'));
    // Change status
    this.isAudioMuted = false;
  }

  onVideoMute(): void {
    // Get local peer
    const localPeer: HMSLocalPeer = this.hms.getLocalPeer();
    // Disable the video
    localPeer.videoTrack.setEnabled(false).then(() => console.info('video turned off'));
    // Change status
    this.isVideoMuted = true;
  }

  onVideoUnmute(): void {
    // Get local peer
    const localPeer: HMSLocalPeer = this.hms.getLocalPeer();
    // Enable the video
    localPeer.videoTrack.setEnabled(true).then(() => console.info('video turned on'));
    // Change status
    this.isVideoMuted = false;
  }

  joinRoom(): void {
    // Change the state of the session
    this.hmsVideoStateService.setState(EHmsStates.ROOM);
  }
}
