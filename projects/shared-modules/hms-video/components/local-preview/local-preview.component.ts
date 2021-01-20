import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LocalmediaService } from '../../services/localmedia.service';

@Component({
  selector: 'app-local-preview',
  templateUrl: './local-preview.component.html',
  styleUrls: ['./local-preview.component.scss']
})
export class LocalPreviewComponent implements OnInit {
  @ViewChild('previewVideo', {static: true}) previewVideo: ElementRef;

  roomId: string;
  audioDevices: Array<any> = [];
  videoDevices: Array<any> = [];

  selectedVideoDevice: any;
  selectedAudioDevice: any;

  localMediaStream: any;

  camera = true;
  mic = true;

  constructor(
    private localMediaService: LocalmediaService
  ) { }

  ngOnInit(): void {
    this.getDevices();

    this.localMediaService.selectedAudioDevice$.subscribe(data => {
      this.selectedAudioDevice = data;
      if (data) {
        this.getLocalStream(this.selectedAudioDevice, this.selectedVideoDevice);
      }
    });

    this.localMediaService.selectedVideoDevice$.subscribe(data => {
      this.selectedVideoDevice = data;
      if (data) {
        this.getLocalStream(this.selectedAudioDevice, this.selectedVideoDevice);
      }
    });

  }

  getDevices() {
    this.localMediaService.getDevices().subscribe(
      devices => {
        let audio: any = [];
        let video: any = [];

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

        this.selectedAudioDevice = this.audioDevices[0];
        this.selectedVideoDevice = this.videoDevices[0];
        this.setAudioDevice();
        this.setVideoDevice();
      }
    )
  }

  setAudioDevice() {
    this.localMediaService.updateAudioDevice(this.selectedAudioDevice);
  }

  setVideoDevice() {
    this.localMediaService.updateVideoDevice(this.selectedVideoDevice);
  }


  getLocalStream(audioDevice?, videoDevice?) {
    this.stopStream();
    let constraints = <any>{};

    constraints.audio = (audioDevice ? ({deviceId: {exact: audioDevice.deviceId}}) : false);
    constraints.video = (videoDevice ? ({deviceId: {exact: videoDevice.deviceId}}) : false);
    console.log(constraints, audioDevice, videoDevice);
    this.localMediaService.getLocalStream(constraints).subscribe(data => {
      if (data) {
        let video = this.previewVideo.nativeElement;
        video.srcObject = data;
      }
    });
  }

  toggleMic() {
    this.mic = !this.mic;
    this.getLocalStream(
      this.mic ? this.selectedAudioDevice : this.mic,
      this.camera ? this.selectedVideoDevice : this.camera
    )
  }

  toggleCamera() {
    this.camera = !this.camera;
    this.getLocalStream(
      this.mic ? this.selectedAudioDevice : this.mic,
      this.camera ? this.selectedVideoDevice : this.camera
    )
  }

  stopStream() {
    if (this.localMediaStream) {
      let tracks = this.localMediaStream.getValue().getTracks();

      for (let track of tracks) {
        track.stop();
      }
    }
  }

}
