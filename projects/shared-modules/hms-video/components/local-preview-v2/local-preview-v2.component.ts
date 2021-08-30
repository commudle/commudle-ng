import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EHmsStates } from 'projects/shared-modules/hms-video/enums/hms-states.enum';
import { HmsVideoStateService } from 'projects/shared-modules/hms-video/services/hms-video-state.service';
import { LocalMediaV2Service } from 'projects/shared-modules/hms-video/services/localmedia-v2.service';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-local-preview-v2',
  templateUrl: './local-preview-v2.component.html',
  styleUrls: ['./local-preview-v2.component.scss'],
})
export class LocalPreviewV2Component implements OnInit, OnDestroy {
  audioInputDevices: MediaDeviceInfo[] = [];
  videoDevices: MediaDeviceInfo[] = [];

  selectedAudioInputDeviceId: string;
  selectedVideoDeviceId: string;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;

  @ViewChild('previewVideo', { static: false }) previewVideo: ElementRef<HTMLVideoElement>;

  subscriptions: Subscription[] = [];

  constructor(
    private hmsVideoStateService: HmsVideoStateService,
    private localMediaV2Service: LocalMediaV2Service,
    private libToastLogService: LibToastLogService,
  ) {}

  ngOnInit(): void {
    this.getMediaPermissions();
  }

  ngOnDestroy(): void {
    this.stopStream();
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  getMediaPermissions(): void {
    this.subscriptions.push(
      this.localMediaV2Service.getMediaPermissions().subscribe((stream: MediaStream) => {
        if (stream.getTracks().length === 0) {
          this.libToastLogService.warningDialog('Browser denied permission');
        } else {
          this.getMediaDevices();
        }
      }),
    );
  }

  getMediaDevices(): void {
    this.subscriptions.push(
      combineLatest(
        this.localMediaV2Service.getAudioInputDevices(),
        this.localMediaV2Service.getVideoDevices(),
      ).subscribe(([audioInputDevices, videoDevices]) => {
        this.audioInputDevices = audioInputDevices;
        this.videoDevices = videoDevices;

        this.selectAudioInputDevice(audioInputDevices[0].deviceId);
        this.selectVideoDevice(videoDevices[0].deviceId);

        this.subscribeToMediaDevices();
      }),
    );
  }

  subscribeToMediaDevices(): void {
    this.subscriptions.push(
      combineLatest(
        this.localMediaV2Service.audioInputDeviceId$,
        this.localMediaV2Service.videoDeviceId$,
        this.localMediaV2Service.isAudioEnabled$,
        this.localMediaV2Service.isVideoEnabled$,
      ).subscribe(([audioInputDeviceId, videoDeviceId, isAudioEnabled, isVideoEnabled]) => {
        this.selectedAudioInputDeviceId = audioInputDeviceId;
        this.selectedVideoDeviceId = videoDeviceId;
        this.isAudioEnabled = isAudioEnabled;
        this.isVideoEnabled = isVideoEnabled;

        if (this.isVideoEnabled) {
          this.renderVideo();
        }
      }),
    );
  }

  renderVideo(): void {
    this.localMediaV2Service.getVideoStream(this.selectedVideoDeviceId).subscribe((stream: MediaStream) => {
      this.previewVideo.nativeElement.srcObject = stream;
    });
  }

  selectAudioInputDevice(deviceId: string): void {
    this.localMediaV2Service.setAudioInputDeviceId(deviceId);
  }

  selectVideoDevice(deviceId: string): void {
    this.localMediaV2Service.setVideoDeviceId(deviceId);
  }

  toggleAudio(): void {
    this.localMediaV2Service.setIsAudioEnabled(!this.isAudioEnabled);
  }

  toggleVideo(): void {
    this.stopStream();
    this.localMediaV2Service.setIsVideoEnabled(!this.isVideoEnabled);
  }

  stopStream(): void {
    if (this.isVideoEnabled) {
      const stream: MediaStream | MediaSource | Blob = this.previewVideo.nativeElement.srcObject;
      if ('getTracks' in stream) {
        const tracks: MediaStreamTrack[] = stream.getTracks();
        tracks.forEach((track: MediaStreamTrack) => track.stop());
      }
      this.previewVideo.nativeElement.srcObject = null;
    }
  }

  joinRoom(): void {
    this.hmsVideoStateService.setState(EHmsStates.ROOM);
  }
}
