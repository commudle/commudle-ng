import { HMSPeer, selectDominantSpeaker, selectPeers, selectPeerScreenSharing } from '@100mslive/hms-video-store';
import { Component, OnInit } from '@angular/core';
import { faHand } from '@fortawesome/free-solid-svg-icons';
import { HmsStageService } from 'apps/shared-modules/hms-video/services/hms-stage.service';
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

  latestRaisedHand: { id: number; name: string };
  showHandRaisedAlert = false;
  timeout: any;

  faHand = faHand;

  constructor(private hmsStageService: HmsStageService) {}

  ngOnInit() {
    this.subscribeToPeers();
    this.subscribeToStage();
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

  subscribeToStage() {
    this.hmsStageService.latestRaisedHand$.subscribe((value) => {
      if (value) {
        this.latestRaisedHand = value;
        this.showHandRaisedAlert = true;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.showHandRaisedAlert = false;
        }, 3000);
      }
    });
  }
}
