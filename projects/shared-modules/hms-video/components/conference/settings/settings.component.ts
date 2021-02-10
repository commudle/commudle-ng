import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, OnDestroy, Input } from '@angular/core';
import { combineLatest } from 'rxjs';
import { LocalmediaService } from '../../../services/localmedia.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  @ViewChild('previewVideo', {static: true}) previewVideo: ElementRef;
  @Input() onStage: boolean;
  @Input() invitation: boolean;
  @Output() closeSettings = new EventEmitter();
  @Output() joinStage = new EventEmitter();
  subscriptions = [];

  audioDevices: Array<any> = [];
  videoDevices: Array<any> = [];

  selectedVideoDevice: MediaDeviceInfo;
  selectedAudioDevice: any;

  localMediaStream: any;

  camera = true;
  mic = true;

  constructor(
    private localMediaService: LocalmediaService,
  ) { }

  ngOnInit(): void {
    console.log(this.onStage);
    this.getDevices();

    const deviceListener =  combineLatest([
      this.localMediaService.selectedAudioDevice$,
      this.localMediaService.selectedVideoDevice$,
      this.localMediaService.mic$,
      this.localMediaService.camera$
    ]);


    this.subscriptions.push(
      deviceListener.subscribe(data => {
        this.selectedAudioDevice = data[0];
        this.selectedVideoDevice = data[1];
        this.mic = data[2];
        this.camera = data[3];

        if (this.selectedAudioDevice && this.selectedVideoDevice) {
          this.getLocalStream();
        }
      })
    );

  }

  ngOnDestroy() {
    this.stopStream();

    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }

  getDevices() {
    this.localMediaService.getDevices().subscribe(
      devices => {
        const audio: MediaDeviceInfo[] = [];
        const video: MediaDeviceInfo[] = [];

        for (let dev of devices) {
          // skipping audiooutput devices
          switch (dev.kind) {
            case 'audioinput':
              audio.push(dev);
              break;
            case 'videoinput':
              video.push(dev);
              break;
            default:
              "";
          }
        }

        this.audioDevices = audio;
        this.videoDevices = video;
        if (!this.selectedAudioDevice) {
          this.setAudioDevice(this.audioDevices[0]);
        } else {
          // set from id because the pre selected device ids aren't matching
          this.setAudioDevice(this.audioDevices.find(k => k.deviceId === this.selectedAudioDevice.deviceId));
        }

        if (!this.selectedVideoDevice) {
          this.setVideoDevice(this.videoDevices[0]);
        } else {
          this.setVideoDevice(this.videoDevices.find(k => k.deviceId === this.selectedVideoDevice.deviceId));
        }
      }
    )
  }

  setAudioDevice(audioDevice) {
    this.localMediaService.updateAudioDevice(audioDevice);
  }

  setVideoDevice(videoDevice) {
    this.localMediaService.updateVideoDevice(videoDevice);
  }


  getLocalStream() {
    this.stopStream();

    if (this.mic || this.camera) {
      let constraints = <any>{};

      constraints.audio = (this.mic ? ({deviceId: {exact: this.selectedAudioDevice.deviceId}}) : false);
      constraints.video = (this.camera ? ({deviceId: {exact: this.selectedVideoDevice.deviceId}}) : false);
      this.localMediaService.getLocalStream(constraints).subscribe(data => {
        if (data) {
          const video = this.previewVideo.nativeElement;
          video.srcObject = data;
        }
      });
    }
  }

  toggleMic() {
    this.localMediaService.updateMic(!this.mic);
  }

  toggleCamera() {
    this.localMediaService.updateCamera(!this.camera);
  }

  stopStream() {
    if (this.localMediaStream) {
      const tracks = this.localMediaStream.getValue().getTracks();

      for (const track of tracks) {
        track.stop();
      }
    }
  }


  close() {
    this.closeSettings.emit(false);
  }

  emitJoinStage() {
    this.joinStage.emit(true);
  }

}
