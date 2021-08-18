import {
  HMSPeer,
  HMSTrack,
  selectAudioTrackByPeerID,
  selectCameraStreamByPeerID,
  selectIsPeerAudioEnabled,
  selectVideoTrackByPeerID,
} from '@100mslive/hms-video-store';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { EHmsRoles } from 'projects/shared-modules/hms-video/components/enums/hms-roles.enum';
import { hmsActions, hmsStore } from 'projects/shared-modules/hms-video/stores/hms.store';

@Component({
  selector: 'app-conference-user-video',
  templateUrl: './conference-user-video.component.html',
  styleUrls: ['./conference-user-video.component.scss'],
})
export class ConferenceUserVideoComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  @Input() peer: HMSPeer;
  @Input() screenShare: boolean;

  metaData: {
    id: number;
    name: string;
    username: string;
    avatar: string;
  };
  isAudioEnabled: boolean;

  EHmsRoles = EHmsRoles;

  // videoElement: HTMLVideoElement;
  @ViewChild('videoElement') videoElement: ElementRef<HTMLVideoElement>;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy() {
    this.detachVideo();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.peer?.customerDescription) {
      this.metaData = JSON.parse(this.peer.customerDescription);
    }
  }

  ngAfterViewInit() {
    // this.videoElement = <HTMLVideoElement>document.getElementById(this.peer.id);

    let track: HMSTrack = hmsStore.getState(selectVideoTrackByPeerID(this.peer.id));
    if (this.screenShare && track.source === 'screen') {
      this.renderPeer(track);
    } else {
      track = hmsStore.getState(selectCameraStreamByPeerID(this.peer.id));
    }

    this.renderPeer(track);

    // hmsStore.subscribe(this.renderPeer, selectCameraStreamByPeerID(this.peer.id));

    hmsStore.subscribe((value: boolean) => (this.isAudioEnabled = value), selectIsPeerAudioEnabled(this.peer.id));

    // if (this.peer && this.videoElement && !this.metaData) {
    //   this.attachVideo();
    //
    // this.metaData = JSON.parse(this.peer.customerDescription);
    // }
  }

  renderPeer(track: HMSTrack): void {
    if (track.enabled) {
      this.attachVideo();
    } else {
      this.detachVideo();
    }
  }

  attachVideo(): void {
    hmsActions.attachVideo(this.peer.videoTrack, this.videoElement.nativeElement);
  }

  detachVideo(): void {
    hmsActions.detachVideo(this.peer.videoTrack, this.videoElement.nativeElement);
  }

  mutePeer(): void {
    const audioTrack: HMSTrack = hmsStore.getState(selectAudioTrackByPeerID(this.peer.id));

    hmsActions.setRemoteTrackEnabled(audioTrack.id, false);
  }

  removeFromStage(): void {
    hmsActions.changeRole(this.peer.id, EHmsRoles.VIEWER, true);
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    hmsActions.leave();
    delete $event['returnValue'];
  }
}
