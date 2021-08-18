import { HMSPeer, selectPeers, selectPeerScreenSharing } from '@100mslive/hms-video-store';
import { Component, OnInit } from '@angular/core';
import { hmsStore } from 'projects/shared-modules/hms-video/stores/hms.store';

@Component({
  selector: 'app-conference-user-videos',
  templateUrl: './conference-user-videos.component.html',
  styleUrls: ['./conference-user-videos.component.scss'],
})
export class ConferenceUserVideosComponent implements OnInit {
  peers: HMSPeer[] = [];
  peerScreenShare: HMSPeer;

  constructor() {}

  ngOnInit() {
    // All Peers
    hmsStore.subscribe(this.selectPeers, selectPeers);
    // Screen share peer
    hmsStore.subscribe(this.selectPeerScreenSharing, selectPeerScreenSharing);
  }

  selectPeers = (peers: HMSPeer[]) => {
    this.peers = peers;
  };

  selectPeerScreenSharing = (peer: HMSPeer) => {
    this.peerScreenShare = peer;
  };

  // @Input() tracks: HMSTrack[];
  // @Input() peers: HMSPeer[];
  //
  // @Output() removeFromStage: EventEmitter<HMSPeer> = new EventEmitter<HMSPeer>();
  //
  // EHmsRoles = EHmsRoles;
  //
  // screenShareTrack: HMSTrack;
  //
  // constructor() {}
  //
  // ngOnInit(): void {}
  //
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes.tracks) {
  //     // Get screen share track
  //     // TODO: Support multiple screen share tracks
  //     this.screenShareTrack = this.tracks.find((value: HMSTrack) => {
  //       return value.type === 'video' && value.source === 'screen';
  //     });
  //   }
  // }
  //
  // onAudioMute(peer: HMSPeer): void {
  //   // Set volume
  //   peer.audioTrack?.setVolume(0);
  // }
  //
  // onAudioUnmute(peer: HMSPeer): void {
  //   // Set volume
  //   peer.audioTrack?.setVolume(100);
  // }
}
