import { getLocalStream } from '@100mslive/hms-video';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { LocalMediaV2Service } from 'projects/shared-modules/hms-video/services/localmedia-v2.service';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-conference-settings',
  templateUrl: './conference-settings.component.html',
  styleUrls: ['./conference-settings.component.scss'],
})
export class ConferenceSettingsComponent implements OnInit, OnDestroy {
  @ViewChild('previewVideo', { static: false }) previewVideo: ElementRef;
  // @Input() onStage: boolean;
  invitation: boolean;
  // @Output() closeSettings = new EventEmitter();
  // @Output() joinStage = new EventEmitter();
  subscriptions = [];

  audioDevices: Array<any> = [];
  videoDevices: Array<any> = [];

  selectedVideoDeviceId: MediaDeviceInfo;
  selectedAudioDeviceId: any;

  localMediaStream: any;

  camera = true;
  mic = true;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private localMediaService: LocalMediaV2Service,
    private toastLogService: LibToastLogService,
  ) {}

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

  getMediaPermission() {
    this.localMediaService.getMediaPermission().subscribe(
      (data) => {
        for (const track of data.getTracks()) {
          track.stop();
        }
        this.getMediaDevices();
      },
      (error) => {
        this.toastLogService.warningDialog('Browser denied permission', 3000);
      },
    );
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

      if (!this.selectedAudioDeviceId) {
        this.setAudioDevice(this.audioDevices[0].deviceId);
      } else {
        // set from id because the pre selected device ids aren't matching
        this.setAudioDevice(
          this.audioDevices.find((k) => String(k.deviceId) === String(this.selectedAudioDeviceId)).deviceId,
        );
      }

      if (!this.selectedVideoDeviceId) {
        this.setVideoDevice(this.videoDevices[0].deviceId);
      } else {
        this.setVideoDevice(
          this.videoDevices.find((k) => String(k.deviceId) === String(this.selectedVideoDeviceId)).deviceId,
        );
      }
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

  toggleMic() {
    this.localMediaService.updateMic(!this.mic);
  }

  toggleCamera() {
    this.localMediaService.updateCamera(!this.camera);
  }

  stopStream() {
    if (this.localMediaStream) {
      const tracks = this.localMediaStream.getTracks();

      for (const track of tracks) {
        track.stop();
      }
    }
  }

  close(value: boolean): void {
    this.dialogRef.close(value);
  }
}
