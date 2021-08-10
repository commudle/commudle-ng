import {
  HMSConfig,
  HMSException,
  HMSMessage,
  HMSPeerUpdate,
  HMSRoleChangeRequest,
  HMSRoom,
  HMSRoomUpdate,
  HMSSdk,
  HMSTrack,
  HMSTrackUpdate,
} from '@100mslive/hms-video';
import { HMSDeviceManager } from '@100mslive/hms-video/dist/interfaces/HMSDeviceManager';
import HMSUpdateListener from '@100mslive/hms-video/dist/interfaces/update-listener';
import { HMSLocalPeer, HMSPeer } from '@100mslive/hms-video/dist/sdk/models/peer';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { EmbeddedVideoStreamsService } from 'projects/commudle-admin/src/app/services/embedded-video-streams.service';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { EHmsRoles } from 'projects/shared-modules/hms-video/components/enums/hms-roles.enum';
import { IHmsClient } from 'projects/shared-modules/hms-video/models/hms-client.model';
import { EHmsStates, HmsVideoStateService } from 'projects/shared-modules/hms-video/services/hms-video-state.service';
import { LocalMediaService } from 'projects/shared-modules/hms-video/services/local-media.service';
import { HmsLiveV2Channel } from 'projects/shared-modules/hms-video/services/websockets/hms-live-v2.channel';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-conference-v2',
  templateUrl: './conference-v2.component.html',
  styleUrls: ['./conference-v2.component.scss'],
})
export class ConferenceV2Component implements OnInit, OnChanges, OnDestroy {
  @Input() roomId: string;
  @Input() serverClient: IHmsClient;
  @Input() currentUser: ICurrentUser;
  @Input() selectedRole: EHmsRoles;
  @Input() streamable_id: number;
  @Input() streamable_type: string;

  EHmsRoles = EHmsRoles;

  // Remote peers and tracks
  peers: HMSPeer[] = [];
  tracks: HMSTrack[] = [];
  // Local peer
  localPeer: HMSLocalPeer;
  // Defining hms sdk
  hms = new HMSSdk();
  // Listeners for hms
  listener: HMSUpdateListener = {
    onDeviceChange(_deviceMap: HMSDeviceManager): void {},
    onError(_error: HMSException): void {},
    onJoin: function (room: HMSRoom): void {
      console.info('joined session');
      // Get peers in the room
      this.peers = room.peers;
      // Set local peer
      this.localPeer = room.localPeer;
      // Connect to channel
      this.receiveChannelData();
      console.log(this.hms.getRoles(), this.peers);
    }.bind(this),
    onMessageReceived: function (message: HMSMessage): void {
      const peer: HMSPeer = this.peers.find((value: HMSPeer) => {
        return value.peerId === message.message;
      });
      if (this.localPeer.role?.name === EHmsRoles.HOST) {
        this.hms.changeRole(peer, EHmsRoles.GUEST);
      }
    }.bind(this),
    onPeerUpdate: function (type: HMSPeerUpdate, peer: HMSPeer | null): void {
      switch (type) {
        case HMSPeerUpdate.PEER_JOINED:
          this.peers = [...this.peers, peer];
          break;
        case HMSPeerUpdate.PEER_LEFT:
          this.peers = this.peers.filter((value: HMSPeer) => value.peerId !== peer.peerId);
          break;
        case HMSPeerUpdate.ROLE_UPDATED:
          console.log('role updated');
          this.peers = this.hms.getPeers();
          this.localPeer = this.hms.getLocalPeer();
          break;
      }
    }.bind(this),
    onReconnected(): void {
      console.log('reconnected');
    },
    onReconnecting(_error: HMSException): void {
      console.log('reconnecting');
    },
    onRoleChangeRequest: function (request: HMSRoleChangeRequest): void {
      if (this.localPeer.role?.name === EHmsRoles.HOST) {
        this.hms.acceptRoleChange(request);
      }
      console.log('role change request', request);
    }.bind(this),
    onRoleUpdate(_newRole: string): void {
      console.log('role update');
    },
    onRoomUpdate(_type: HMSRoomUpdate, _room: HMSRoom): void {
      console.log('room update');
    },
    onTrackUpdate: function (type: HMSTrackUpdate, track: HMSTrack, _peer: HMSPeer): void {
      switch (type) {
        case HMSTrackUpdate.TRACK_ADDED:
          this.tracks = [...this.tracks, track];
          break;
        case HMSTrackUpdate.TRACK_REMOVED:
          this.tracks = this.tracks.filter((value: HMSTrack) => value.trackId !== track.trackId);
          break;
      }
    }.bind(this),
  };
  // HMS Status variables
  isScreenSharing = false;
  isAudioMuted = false;
  isVideoMuted = false;
  isRecording = false;
  isStreaming = false;
  isOnStage = false;

  subscriptions: Subscription[] = [];

  constructor(
    private localMediaService: LocalMediaService,
    private hmsLiveV2Channel: HmsLiveV2Channel,
    private hmsVideoStateService: HmsVideoStateService,
    private embeddedVideoStreamsService: EmbeddedVideoStreamsService,
  ) {}

  ngOnInit(): void {
    // Get status of audio and video
    this.isAudioMuted = this.localMediaService.isAudioMuted;
    this.isVideoMuted = this.localMediaService.isVideoMuted;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.serverClient && this.serverClient && this.currentUser) {
      this.hms.join(this.getJoinConfig(this.serverClient.token, this.currentUser.name), this.listener);
    }
  }

  ngOnDestroy(): void {
    // Leave the meet
    this.hms.leave().then(() => console.info('left session'));
    // Unsubscribe all subscriptions
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  getJoinConfig(authToken: string, userName: string): HMSConfig {
    const audioInputDeviceId: string = this.localMediaService.selectedAudioInputDevice?.deviceId || '';
    const videoDeviceId: string = this.localMediaService.selectedVideoInputDevice?.deviceId || '';
    return {
      authToken: authToken,
      userName: userName,
      // @ts-ignore
      settings: {
        audioInputDeviceId: audioInputDeviceId,
        videoDeviceId: videoDeviceId,
        isAudioMuted: this.isAudioMuted,
        isVideoMuted: this.isVideoMuted,
      },
    };
  }

  onStartScreenShare(): void {
    this.hms
      .startScreenShare(() => {
        this.isScreenSharing = false;
        console.info('stopped screen share');
      })
      .then(() => {
        this.isScreenSharing = true;
        console.info('started screen share');
      });
  }

  onStopScreenShare(): void {
    this.hms.stopScreenShare().then(() => {
      this.isScreenSharing = false;
      console.info('stopped screen share');
    });
  }

  onAudioMute(): void {
    // Disable the audio
    this.localPeer.audioTrack.setEnabled(false).then(() => console.info('audio turned off'));
    // Change status
    this.isAudioMuted = true;
  }

  onAudioUnmute(): void {
    // Enable the audio
    this.localPeer.audioTrack.setEnabled(true).then(() => console.info('audio turned on'));
    // Change status
    this.isAudioMuted = false;
  }

  onVideoMute(): void {
    // Disable the video
    this.localPeer.videoTrack.setEnabled(false).then(() => console.info('video turned off'));
    // Change status
    this.isVideoMuted = true;
  }

  onVideoUnmute(): void {
    // Enable the video
    this.localPeer.videoTrack.setEnabled(true).then(() => console.info('video turned on'));
    // Change status
    this.isVideoMuted = false;
  }

  onStartRecording(): void {
    this.embeddedVideoStreamsService
      .startRecording(this.streamable_id, this.streamable_type, location.href)
      .subscribe((value: boolean) => {
        if (value)
          // Change status
          this.isRecording = true;
      });
  }

  onStopRecording(): void {
    this.embeddedVideoStreamsService
      .stopRecording(this.streamable_id, this.streamable_type)
      .subscribe((value: boolean) => {
        if (value) {
          // Change status
          this.isRecording = false;
        }
      });
  }

  onStartStreaming(): void {
    this.embeddedVideoStreamsService
      .startStreaming(this.streamable_id, this.streamable_type, location.href)
      .subscribe((value: boolean) => {
        if (value)
          // Change status
          this.isStreaming = true;
      });
  }

  onStopStreaming(): void {
    this.embeddedVideoStreamsService
      .stopStreaming(this.streamable_id, this.streamable_type)
      .subscribe((value: boolean) => {
        if (value) {
          // Change status
          this.isStreaming = false;
        }
      });
  }

  onJoinStage(): void {
    if (this.localPeer.role?.name === EHmsRoles.HOST) {
      // @ts-ignore
      this.hms.changeRole(this.localPeer, EHmsRoles.HOST);
    }
    // Change status
    this.isOnStage = true;
  }

  onLeaveStage(): void {
    if (this.localPeer.role?.name === EHmsRoles.HOST) {
      // @ts-ignore
      this.hms.changeRole(this.localPeer, EHmsRoles.HOST);
    } else if (this.localPeer.role?.name === EHmsRoles.GUEST) {
      // TODO 1: Error in using HMSMessageType enum
      // TODO 2: Find a better way to do the below
      this.hms.sendMessage('chat', this.localPeer.peerId);
    }
    // Change status
    this.isOnStage = false;
  }

  changeState(): void {
    this.hmsVideoStateService.setState(EHmsStates.PREVIEW);
  }

  endSession(): void {
    // If client is a host
    if (this.localPeer.role?.name === EHmsRoles.HOST) {
      this.hmsLiveV2Channel.sendData(this.hmsLiveV2Channel.ACTIONS.END_STREAM, this.currentUser.id, {});
    }
  }

  receiveChannelData(): void {
    this.subscriptions.push(
      this.hmsLiveV2Channel.channelData$[this.currentUser.id].subscribe((value) => {
        switch (value.action) {
          case this.hmsLiveV2Channel.ACTIONS.INVITE_TO_STAGE:
            // TODO 1: Error in using HMSMessageType enum
            // TODO 2: Find a better way to do the below
            this.hms.sendMessage('chat', this.localPeer.peerId);
            this.isOnStage = true;
            break;
          case this.hmsLiveV2Channel.ACTIONS.END_STREAM:
            // Set state of room
            this.hmsVideoStateService.setState(EHmsStates.ENDED);
            break;
        }
      }),
    );
  }
}
