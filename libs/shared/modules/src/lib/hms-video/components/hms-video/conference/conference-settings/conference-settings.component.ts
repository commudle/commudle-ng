import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LibToastLogService } from '@commudle/shared-services';
import { NbDialogRef, NbTrigger } from '@nebular/theme';
import { combineLatest, Subscription } from 'rxjs';
import { LocalMediaService } from '../../../../services/local-media.service';

@Component({
  selector: 'commudle-conference-settings',
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

  nbTrigger = NbTrigger;

  subscriptions: Subscription[] = [];

  constructor(
    protected dialogRef: NbDialogRef<ConferenceSettingsComponent>,
    private localMediaService: LocalMediaService,
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
    const microphone = 'microphone' as PermissionName;
    const camera = 'camera' as PermissionName;

    this.subscriptions.push(
      combineLatest(
        this.localMediaService.getMediaPermissions(camera),
        this.localMediaService.getMediaPermissions(microphone),
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
      combineLatest(this.localMediaService.getAudioInputDevices(), this.localMediaService.getVideoDevices()).subscribe(
        ([audioInputDevices, videoDevices]) => {
          this.audioInputDevices = audioInputDevices;
          this.videoDevices = videoDevices;

          this.selectedAudioInputDeviceId = this.localMediaService.getAudioInputDeviceId();
          this.selectedVideoDeviceId = this.localMediaService.getVideoDeviceId();
          this.isAudioEnabled = this.localMediaService.getIsAudioEnabled();
          this.isVideoEnabled = this.localMediaService.getIsVideoEnabled();

          if (this.isVideoEnabled) {
            this.renderVideo();
          }

          if (this.localMediaService.getAudioInputDeviceId() === 'default') {
            this.selectAudioInputDevice(audioInputDevices[0].deviceId);
          }
          if (this.localMediaService.getVideoDeviceId() === 'default') {
            this.selectVideoDevice(videoDevices[0].deviceId);
          }
        },
      ),
    );
  }

  renderVideo(): void {
    this.localMediaService.getVideoStream(this.selectedVideoDeviceId).subscribe((stream: MediaStream) => {
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
    this.localMediaService.setAudioInputDeviceId(this.selectedAudioInputDeviceId);
    this.localMediaService.setVideoDeviceId(this.selectedVideoDeviceId);
    this.localMediaService.setIsAudioEnabled(this.isAudioEnabled);
    this.localMediaService.setIsVideoEnabled(this.isVideoEnabled);

    this.dialogRef.close(value);
  }
}
