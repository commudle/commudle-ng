import { HMSPeer, selectDominantSpeaker, selectPeers, selectPeerScreenSharing } from '@100mslive/hms-video-store';
import { Component, OnInit } from '@angular/core';
import { hmsStore } from 'apps/shared-modules/hms-video/stores/hms.store';

@Component({
  selector: 'app-conference-user-videos',
  templateUrl: './conference-user-videos.component.html',
  styleUrls: ['./conference-user-videos.component.scss'],
})
export class ConferenceUserVideosComponent implements OnInit {
  peers: HMSPeer[] = [];
  allPeers: HMSPeer[] = [];
  peerScreenShare: HMSPeer;
  activeSpeaker: HMSPeer;
  showAlert = true;

  constructor() {}

  ngOnInit() {
    this.subscribeToPeers();
  }

  subscribeToPeers() {
    hmsStore.subscribe(this.selectPeers, selectPeers);
    hmsStore.subscribe((peer: HMSPeer) => (this.peerScreenShare = peer), selectPeerScreenSharing);
    hmsStore.subscribe((peer: HMSPeer, _prev: HMSPeer) => (this.activeSpeaker = peer), selectDominantSpeaker);
  }

  selectPeers = (peers: HMSPeer[]) => {
    // Peers with video
    this.peers = peers.filter((peer: HMSPeer) => peer.videoTrack);
    // All peers
    this.allPeers = peers;
  };
}
