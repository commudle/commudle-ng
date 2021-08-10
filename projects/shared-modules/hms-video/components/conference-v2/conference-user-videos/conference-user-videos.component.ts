import { HMSTrack } from '@100mslive/hms-video';
import { HMSPeer } from '@100mslive/hms-video/dist/sdk/models/peer';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EHmsRoles } from 'projects/shared-modules/hms-video/components/enums/hms-roles.enum';

@Component({
  selector: 'app-conference-user-videos',
  templateUrl: './conference-user-videos.component.html',
  styleUrls: ['./conference-user-videos.component.scss'],
})
export class ConferenceUserVideosComponent implements OnInit, OnChanges {
  @Input() tracks: HMSTrack[];
  @Input() peers: HMSPeer[];

  EHmsRoles = EHmsRoles;

  screenShareTrack: HMSTrack;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tracks) {
      // Get screen share track
      // TODO: Support multiple screen share tracks
      this.screenShareTrack = this.tracks.find((value: HMSTrack) => {
        return value.type === 'video' && value.source === 'screen';
      });
    }
  }

  onAudioMute(peer: HMSPeer): void {
    // Set volume
    peer.audioTrack?.setVolume(0);
  }

  onAudioUnmute(peer: HMSPeer): void {
    // Set volume
    peer.audioTrack?.setVolume(100);
  }
}
