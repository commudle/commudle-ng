import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { LocalMediaV2Service } from 'projects/shared-modules/hms-video/services/localmedia-v2.service';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-conference-settings',
  templateUrl: './conference-settings.component.html',
  styleUrls: ['./conference-settings.component.scss'],
})
export class ConferenceSettingsComponent implements OnInit, OnDestroy {
  invitation: boolean;
  joinStage: boolean;

  audioInputDevices: MediaDeviceInfo[] = [];
  videoDevices: MediaDeviceInfo[] = [];

  selectedAudioInputDeviceId: string;
  selectedVideoDeviceId: string;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;

  @ViewChild('previewVideo', { static: false }) previewVideo: ElementRef<HTMLVideoElement>;

  subscriptions: Subscription[] = [];

  constructor(
    protected dialogRef: NbDialogRef<ConferenceSettingsComponent>,
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
      combineLatest(
        this.localMediaV2Service.getMediaPermissions('camera'),
        this.localMediaV2Service.getMediaPermissions('microphone'),
      ).subscribe(([cameraPermissions, microphonePermissions]) => {
        if (cameraPermissions === 'granted' && microphonePermissions === 'granted') {
          this.getMediaDevices();
        } else if (cameraPermissions === 'prompt' || microphonePermissions === 'prompt') {
          navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream: MediaStream) => {
            stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
            this.getMediaPermissions();
          });
        } else if (cameraPermissions === 'denied' || microphonePermissions === 'denied') {
          this.libToastLogService.warningDialog('Browser denied permission');
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

        this.selectedAudioInputDeviceId = this.localMediaV2Service.getAudioInputDeviceId();
        this.selectedVideoDeviceId = this.localMediaV2Service.getVideoDeviceId();
        this.isAudioEnabled = this.localMediaV2Service.getIsAudioEnabled();
        this.isVideoEnabled = this.localMediaV2Service.getIsVideoEnabled();

        if (this.isVideoEnabled) {
          this.renderVideo();
        }

        if (this.localMediaV2Service.getAudioInputDeviceId() === 'default') {
          this.selectAudioInputDevice(audioInputDevices[0].deviceId);
        }
        if (this.localMediaV2Service.getVideoDeviceId() === 'default') {
          this.selectVideoDevice(videoDevices[0].deviceId);
        }
      }),
    );
  }

  renderVideo(): void {
    this.localMediaV2Service.getVideoStream(this.selectedVideoDeviceId).subscribe((stream: MediaStream) => {
      this.stopStream();
      this.previewVideo.nativeElement.srcObject = stream;
    });
  }

  selectAudioInputDevice(deviceId: string): void {
    this.selectedAudioInputDeviceId = deviceId;
  }

  selectVideoDevice(deviceId: string): void {
    this.stopStream();
    this.selectedVideoDeviceId = deviceId;
    if (this.isVideoEnabled) {
      this.renderVideo();
    }
  }

  toggleAudio(): void {
    this.isAudioEnabled = !this.isAudioEnabled;
  }

  toggleVideo(): void {
    this.stopStream();
    this.isVideoEnabled = !this.isVideoEnabled;
    if (this.isVideoEnabled) {
      this.renderVideo();
    }
  }

  stopStream(): void {
    if (this.isVideoEnabled) {
      const stream: MediaStream | MediaSource | Blob = this.previewVideo.nativeElement.srcObject;
      if (stream) {
        if ('getTracks' in stream) {
          const tracks: MediaStreamTrack[] = stream.getTracks();
          tracks.forEach((track: MediaStreamTrack) => track.stop());
        }
        this.previewVideo.nativeElement.srcObject = null;
      }
    }
  }

  close(value: boolean): void {
    this.localMediaV2Service.setAudioInputDeviceId(this.selectedAudioInputDeviceId);
    this.localMediaV2Service.setVideoDeviceId(this.selectedVideoDeviceId);
    this.localMediaV2Service.setIsAudioEnabled(this.isAudioEnabled);
    this.localMediaV2Service.setIsVideoEnabled(this.isVideoEnabled);

    this.dialogRef.close(value);
  }
}
