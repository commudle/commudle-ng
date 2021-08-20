import {
  HMSPeer,
  HMSTrack,
  selectAudioTrackByPeerID,
  selectCameraStreamByPeerID,
  selectIsPeerAudioEnabled,
  selectIsPeerVideoEnabled,
  selectLocalPeer,
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

  localPeer: HMSPeer;

  metaData: {
    id: number;
    name: string;
    username: string;
    avatar: string;
  };
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;

  EHmsRoles = EHmsRoles;

  @ViewChild('videoElement') videoElement: ElementRef<HTMLVideoElement>;

  constructor() {}

  ngOnInit(): void {
    hmsStore.subscribe((peer: HMSPeer) => (this.localPeer = peer), selectLocalPeer);
  }

  ngOnDestroy() {
    this.detachVideo();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('PEER', this.peer);
    if (this.peer?.customerDescription) {
      this.metaData = JSON.parse(this.peer.customerDescription);
    }
  }

  ngAfterViewInit() {
    let track: HMSTrack = hmsStore.getState(selectVideoTrackByPeerID(this.peer.id));
    // if (!(this.screenShare && track.source === 'screen')) {
    //   track = hmsStore.getState(selectCameraStreamByPeerID(this.peer.id));
    // }
    console.log('local track', track);
    this.renderPeer(track);

    hmsStore.subscribe((value: boolean) => (this.isAudioEnabled = value), selectIsPeerAudioEnabled(this.peer.id));
    hmsStore.subscribe((value: boolean) => (this.isVideoEnabled = value), selectIsPeerVideoEnabled(this.peer.id));
  }

  renderPeer(track: HMSTrack): void {
    console.log(track.enabled)
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

  mutePeerAudio(): void {
    const audioTrack: HMSTrack = hmsStore.getState(selectAudioTrackByPeerID(this.peer.id));

    hmsActions.setRemoteTrackEnabled(audioTrack.id, false);
  }

  mutePeerVideo(): void {
    const videoTrack: HMSTrack = hmsStore.getState(selectCameraStreamByPeerID(this.peer.id));

    hmsActions.setRemoteTrackEnabled(videoTrack.id, false);
  }

  changeRole(): void {
    switch (this.peer.roleName) {
      case EHmsRoles.HOST:
        hmsActions.changeRole(this.peer.id, EHmsRoles.HOST_VIEWER, true);
        break;
      case EHmsRoles.GUEST:
        hmsActions.changeRole(this.peer.id, EHmsRoles.VIEWER, true);
    }
  }

  removeFromSession(): void {
    hmsActions.removePeer(this.peer.id, '');
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    hmsActions.leave();
    delete $event['returnValue'];
  }
}
