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
    hmsStore.subscribe(this.selectPeers, selectPeers);
    hmsStore.subscribe(this.selectPeerScreenSharing, selectPeerScreenSharing);
  }

  selectPeers = (peers: HMSPeer[]) => {
    // Peers with video
    this.peers = peers.filter((peer: HMSPeer) => peer.videoTrack);
    // this.peers = peers;
  };

  selectPeerScreenSharing = (peer: HMSPeer) => {
    this.peerScreenShare = peer;
  };
}
