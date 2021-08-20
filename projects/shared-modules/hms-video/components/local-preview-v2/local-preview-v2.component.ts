import { getLocalStream } from '@100mslive/hms-video';
import { DeviceMap, selectDevices } from '@100mslive/hms-video-store';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { IHmsClient } from 'projects/shared-modules/hms-video/models/hms-client.model';
import { EHmsStates, HmsVideoStateService } from 'projects/shared-modules/hms-video/services/hms-video-state.service';
import { hmsStore } from 'projects/shared-modules/hms-video/stores/hms.store';
import { combineLatest } from 'rxjs';
import { LocalMediaV2Service } from './../../services/localmedia-v2.service';

@Component({
  selector: 'app-local-preview-v2',
  templateUrl: './local-preview-v2.component.html',
  styleUrls: ['./local-preview-v2.component.scss'],
})
export class LocalPreviewV2Component implements OnInit, OnDestroy {
  @Input() serverClient: IHmsClient;
  @Input() currentUser: ICurrentUser;

  // Available devices
  devices: DeviceMap = hmsStore.getState(selectDevices);

  audioDevices: Array<any> = [];
  videoDevices: Array<any> = [];

  selectedVideoDeviceId: any;
  selectedAudioDeviceId: any;

  localMediaStream: any;

  subscriptions = [];

  camera = true;
  mic = true;

  @ViewChild('previewVideo', { static: false }) previewVideo: ElementRef<HTMLVideoElement>;

  constructor(private hmsVideoStateService: HmsVideoStateService, private localMediaService: LocalMediaV2Service) {}

  ngOnInit(): void {
    this.getMediaDevices();
    const deviceListener = combineLatest([
      this.localMediaService.selectedAudioDevice$,
      this.localMediaService.selectedVideoDevice$,
      this.localMediaService.mic$,
      this.localMediaService.camera$,
    ]);

    this.subscriptions.push(
      deviceListener.subscribe((data) => {
        this.selectedAudioDeviceId = data[0];
        this.selectedVideoDeviceId = data[1];
        this.mic = data[2];
        this.camera = data[3];

        if (this.selectedAudioDeviceId && this.selectedVideoDeviceId) {
          this.renderVideo();
        }
      }),
    );
  }

  ngOnDestroy() {
    this.stopStream();
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }

  stopStream() {
    if (this.localMediaStream) {
      const tracks = this.localMediaStream.getTracks();

      for (const track of tracks) {
        track.stop();
      }
    }
  }

  getMediaDevices() {
    this.localMediaService.getDevices().subscribe((devices) => {
      devices = devices.filter((dev) => dev.deviceId !== '');
      const audio: MediaDeviceInfo[] = [];
      const video: MediaDeviceInfo[] = [];

      for (const dev of devices) {
        // skipping audiooutput devices
        switch (dev.kind) {
          case 'audioinput':
            audio.push(dev);
            break;
          case 'videoinput':
            video.push(dev);
            break;
        }
      }

      this.audioDevices = audio;
      this.videoDevices = video;

      this.setAudioDevice(this.audioDevices[0].deviceId);
      this.setVideoDevice(this.videoDevices[0].deviceId);
    });
  }

  renderVideo() {
    if (this.mic || this.camera) {
      const constraints = <any>{};
      constraints.audio = this.mic ? { deviceId: { exact: this.selectedAudioDeviceId } } : false;
      constraints.video = this.camera ? { deviceId: { exact: this.selectedVideoDeviceId } } : false;

      getLocalStream(constraints).then((value: MediaStream) => {
        this.localMediaStream = value;
        const video = this.previewVideo.nativeElement;
        video.srcObject = value;
      });
    }
  }

  setAudioDevice(deviceId: string): void {
    this.localMediaService.updateAudioDevice(deviceId);
  }

  setVideoDevice(deviceId: string): void {
    this.localMediaService.updateVideoDevice(deviceId);
  }

  toggleAudio(): void {
    this.localMediaService.updateMic(!this.mic);
  }

  toggleVideo() {
    this.localMediaService.updateCamera(!this.camera);
  }

  joinRoom(): void {
    this.hmsVideoStateService.setState(EHmsStates.ROOM);
  }
}
