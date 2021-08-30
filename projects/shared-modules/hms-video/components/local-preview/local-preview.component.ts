
import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { EHmsStates } from 'projects/shared-modules/hms-video/enums/hms-states.enum';
import { HmsVideoStateService } from '../../services/hms-video-state.service';
import { LocalmediaService } from '../../services/localmedia.service';
import { combineLatest } from 'rxjs';
import { HmsLiveChannel } from '../../services/websockets/hms-live.channel';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';


@Component({
  selector: 'app-local-preview',
  templateUrl: './local-preview.component.html',
  styleUrls: ['./local-preview.component.scss']
})
export class LocalPreviewComponent implements OnInit, OnDestroy {
  @Input() hmsClient;
  EHmsStates = EHmsStates;
  @ViewChild('previewVideo', {static: false}) previewVideo: ElementRef;

  roomId: string;
  audioDevices: Array<any> = [];
  videoDevices: Array<any> = [];

  selectedVideoDevice: any;
  selectedAudioDevice: any;

  localMediaStream: any;

  subscriptions = [];

  camera = true;
  mic = true;

  constructor(
    private localMediaService: LocalmediaService,
    private hmsVideoStateService: HmsVideoStateService,
    private hmsLiveChannel: HmsLiveChannel,
    private toastLogService: LibToastLogService
  ) { }

  ngOnInit(): void {
    this.getDevices();
    this.updateConfStatus();

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

  getMediaPermission() {
    this.localMediaService.getMediaPermission().subscribe(
      data => {
        for (const track of data.getTracks()) {
          track.stop();
        }
        this.getDevices();
      },
      error => {
        this.toastLogService.warningDialog('Browser denied permission', 3000);
      }
    )
  }

  getDevices() {
    this.localMediaService.getDevices().subscribe(
      devices => {
        devices = devices.filter(dev => dev.deviceId !== '');
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

        this.setAudioDevice(this.audioDevices[0]);
        this.setVideoDevice(this.videoDevices[0]);
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
          this.localMediaStream = data;
          let video = this.previewVideo.nativeElement;
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
      const tracks = this.localMediaStream.getTracks();

      for (const track of tracks) {
        track.stop();
      }
    }
  }

  joinRoom() {
    this.hmsVideoStateService.setState(EHmsStates.ROOM);
  }

  updateConfStatus() {
    this.hmsLiveChannel.sendData(
      this.hmsLiveChannel.ACTIONS.UPDATE_STATUS,
      this.hmsClient.uid,
      {
        status: this.hmsVideoStateService.states.PREVIEW
      }
    )
  }


}
