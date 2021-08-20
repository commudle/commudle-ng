import {
  HMSPeer,
  selectIsConnectedToRoom,
  selectIsLocalScreenShared,
  selectIsSomeoneScreenSharing,
  selectLocalPeer,
  selectPeers,
  selectRoleChangeRequest,
} from '@100mslive/hms-video-store';
import { HMSRoleChangeRequest } from '@100mslive/hms-video-store/src/core/selectors/derivedSelectors';
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { EmbeddedVideoStreamsService } from 'projects/commudle-admin/src/app/services/embedded-video-streams.service';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { IEmbeddedVideoStream } from 'projects/shared-models/embedded_video_stream.model';
import { ConferenceSettingsComponent } from 'projects/shared-modules/hms-video/components/conference-v2/conference-settings/conference-settings.component';
import { EHmsRoles } from 'projects/shared-modules/hms-video/components/enums/hms-roles.enum';
import { IHmsClient } from 'projects/shared-modules/hms-video/models/hms-client.model';
import { HmsStageService } from 'projects/shared-modules/hms-video/services/hms-stage.service';
import { EHmsStates, HmsVideoStateService } from 'projects/shared-modules/hms-video/services/hms-video-state.service';
import { HmsLiveV2Channel } from 'projects/shared-modules/hms-video/services/websockets/hms-live-v2.channel';
import { hmsActions, hmsStore } from 'projects/shared-modules/hms-video/stores/hms.store';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { Subscription } from 'rxjs';
import { LocalMediaV2Service } from '../../services/localmedia-v2.service';

@Component({
  selector: 'app-conference-v2',
  templateUrl: './conference-v2.component.html',
  styleUrls: ['./conference-v2.component.scss'],
})
export class ConferenceV2Component implements OnInit, OnChanges, OnDestroy {
  @Input() serverClient: IHmsClient;
  @Input() currentUser: ICurrentUser;
  @Input() selectedRole: EHmsRoles;
  @Input() embeddedVideoStream: IEmbeddedVideoStream;

  EHmsRoles = EHmsRoles;

  // All peers and tracks
  peers: HMSPeer[] = [];
  localPeer: HMSPeer;

  isScreenSharing: boolean;
  isLocalScreenSharing: boolean;

  isRecording: boolean;
  isStreaming: boolean;

  selectedAudioDeviceId;
  selectedVideoDeviceId;
  camera;
  mic;

  @ViewChild('screenShareContainer', { static: false }) screenShareContainer: ElementRef<HTMLDivElement>;
  @ViewChild('roleChangeRequestDialog') roleChangeRequestDialog: TemplateRef<any>;

  subscriptions: Subscription[] = [];

  constructor(
    private hmsVideoStateService: HmsVideoStateService,
    private toastLogService: LibToastLogService,
    private hmsStageService: HmsStageService,
    private nbDialogService: NbDialogService,
    private embeddedVideoStreamsService: EmbeddedVideoStreamsService,
    private hmsLiveV2Channel: HmsLiveV2Channel,
    private localMediaService: LocalMediaV2Service,
  ) {}

  ngOnInit(): void {
    // Subscribe to join room
    hmsStore.subscribe(this.subscribeToListeners, selectIsConnectedToRoom);
    // Subscribe to invite to stage
    this.hmsStageService.stageStatus$.subscribe((userId: number) => this.inviteToStage(userId));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.serverClient && this.serverClient && this.currentUser) {
      this.joinSession();
    }

    if (this.embeddedVideoStream) {
      this.isRecording = this.embeddedVideoStream.is_recording;
      this.isStreaming = this.embeddedVideoStream.is_streaming;
    }
  }

  ngOnDestroy(): void {
    this.leaveSession();

    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
  }

  getDeviceStatuses() {
    this.subscriptions.push(
      this.localMediaService.selectedAudioDevice$.subscribe((value: string) => {
        this.selectedAudioDeviceId = value;
        hmsActions.setAudioSettings({ deviceId: this.selectedAudioDeviceId });
      }),
      this.localMediaService.selectedVideoDevice$.subscribe((value: string) => {
        this.selectedVideoDeviceId = value;
        hmsActions.setVideoSettings({ deviceId: this.selectedVideoDeviceId });
      }),
      this.localMediaService.mic$.subscribe((value: boolean) => {
        this.mic = value;
        hmsActions.setLocalAudioEnabled(value);
      }),
      this.localMediaService.camera$.subscribe((value: boolean) => {
        this.camera = value;
        hmsActions.setLocalVideoEnabled(value);
      }),
    );
  }

  joinSession(): void {
    hmsActions.join({
      authToken: this.serverClient.token,
      userName: this.currentUser.username,
      metaData: JSON.stringify({
        id: this.currentUser.id,
        name: this.currentUser.name,
        username: this.currentUser.username,
        avatar: this.currentUser.avatar,
      }),
      // @ts-ignore
      settings: {
        audioInputDeviceId: 'default',
        videoDeviceId: 'default',
        isAudioMuted: !this.mic,
        isVideoMuted: !this.camera,
      },
    });
  }

  subscribeToListeners = (status: boolean) => {
    if (status) {
      // Subscribe to remote screen share
      hmsStore.subscribe((value: boolean) => (this.isScreenSharing = value), selectIsSomeoneScreenSharing);
      // Subscribe to local screen share
      hmsStore.subscribe((value: boolean) => (this.isLocalScreenSharing = value), selectIsLocalScreenShared);
      // Subscribe to role changes
      hmsStore.subscribe(this.handleRoleChangeRequest, selectRoleChangeRequest);
      // Subscribe to list of peers
      hmsStore.subscribe((peers: HMSPeer[]) => (this.peers = peers), selectPeers);
      // Subscribe to local peer
      hmsStore.subscribe((peer: HMSPeer) => (this.localPeer = peer), selectLocalPeer);
      // Subscribe to own channel
      this.receiveChannelData();

      this.getDeviceStatuses();
    }
  };

  toggleAudio(): void {
    this.localMediaService.updateMic(!this.mic);
  }

  toggleVideo(): void {
    this.localMediaService.updateCamera(!this.camera);
  }

  toggleScreenShare(): void {
    if (this.isScreenSharing) {
      if (this.isLocalScreenSharing) {
        hmsActions.setScreenShareEnabled(false);
      } else {
        this.toastLogService.warningDialog('Another screen share in progress');
      }
    } else {
      hmsActions.setScreenShareEnabled(true);
    }
  }

  inviteToStage(userId: number): void {
    if (userId) {
      let name = '';
      const peers: HMSPeer[] = hmsStore.getState(selectPeers).filter((value: HMSPeer) => {
        const metaData = JSON.parse(value.customerDescription);
        name = metaData.name;
        return metaData.id === userId;
      });

      if (peers.length > 0) {
        if (peers[0].roleName === EHmsRoles.HOST || peers[0].roleName === EHmsRoles.GUEST) {
          this.toastLogService.warningDialog(`${name} is already in the session`);
        } else {
          peers.forEach((peer: HMSPeer) => {
            hmsActions.changeRole(peer.id, EHmsRoles.GUEST);
          });
          this.toastLogService.successDialog('Invited, they will now see a popup!');
        }
      } else {
        this.toastLogService.warningDialog(`${name} is not in the session`);
      }
    }
  }

  handleRoleChangeRequest = (request: HMSRoleChangeRequest) => {
    if (!request) {
      return;
    }

    const requestedByPeer: HMSPeer = request.requestedBy;
    const roleChangeRequestDialog: NbDialogRef<any> = this.nbDialogService.open(this.roleChangeRequestDialog, {
      context: {
        name: JSON.parse(requestedByPeer.customerDescription).name,
      },
      closeOnBackdropClick: false,
      closeOnEsc: false,
    });
    roleChangeRequestDialog.onClose.subscribe((accept: boolean) => {
      if (accept) {
        hmsActions.acceptChangeRole(request);
        this.openSettings();
      } else {
        hmsActions.rejectChangeRole(request);
      }
    });
  };

  toggleStage(): void {
    const localPeer: HMSPeer = hmsStore.getState(selectLocalPeer);
    switch (localPeer.roleName) {
      case EHmsRoles.HOST:
        hmsActions.changeRole(localPeer.id, EHmsRoles.HOST_VIEWER, true);
        break;
      case EHmsRoles.HOST_VIEWER:
        hmsActions.changeRole(localPeer.id, EHmsRoles.HOST, true);
        break;
      case EHmsRoles.VIEWER:
        break;
      case EHmsRoles.GUEST:
        break;
    }
  }

  openSettings(): void {
    this.nbDialogService.open(ConferenceSettingsComponent);
  }

  toggleRecording(): void {
    if (this.serverClient.role !== EHmsRoles.HOST) {
      return;
    }

    if (this.isRecording) {
      this.embeddedVideoStreamsService
        .stopRecording(this.embeddedVideoStream.streamable_id, this.embeddedVideoStream.streamable_type)
        .subscribe((value) => {
          if (value) {
            this.isRecording = false;
          }
        });
    } else {
      const meetingUrl = location.href.slice(0, -8);
      this.embeddedVideoStreamsService
        .startRecording(this.embeddedVideoStream.streamable_id, this.embeddedVideoStream.streamable_type, meetingUrl)
        .subscribe((value) => {
          if (value) {
            this.isRecording = true;
          }
        });
    }
  }

  toggleStreaming(): void {
    if (this.serverClient.role !== EHmsRoles.HOST) {
      return;
    }

    if (this.isStreaming) {
      this.embeddedVideoStreamsService
        .stopStreaming(this.embeddedVideoStream.streamable_id, this.embeddedVideoStream.streamable_type)
        .subscribe((value: boolean) => {
          if (value) {
            this.isStreaming = false;
          }
        });
    } else {
      const meetingUrl = location.href.slice(0, -8);
      this.embeddedVideoStreamsService
        .startStreaming(this.embeddedVideoStream.streamable_id, this.embeddedVideoStream.streamable_type, meetingUrl)
        .subscribe((value: boolean) => {
          if (value) {
            this.isStreaming = true;
          }
        });
    }
  }

  leaveSession(): void {
    hmsActions.leave().then(() => this.hmsVideoStateService.setState(EHmsStates.LEFT));
  }

  endSession(): void {
    if (this.serverClient.role === EHmsRoles.HOST) {
      this.hmsLiveV2Channel.sendData(this.hmsLiveV2Channel.ACTIONS.END_STREAM, this.currentUser.id, {});
    }
  }

  receiveChannelData(): void {
    this.subscriptions.push(
      this.hmsLiveV2Channel.channelData$[this.currentUser.id].subscribe((value: any) => {
        switch (value.action) {
          case this.hmsLiveV2Channel.ACTIONS.RECORDING_STARTED:
            this.isRecording = true;
            break;
          case this.hmsLiveV2Channel.ACTIONS.RECORDING_STOPPED:
            this.isRecording = false;
            break;
          case this.hmsLiveV2Channel.ACTIONS.STREAMING_STARTED:
            this.isStreaming = true;
            break;
          case this.hmsLiveV2Channel.ACTIONS.STREAMING_STOPPED:
            this.isStreaming = false;
            break;
          case this.hmsLiveV2Channel.ACTIONS.END_STREAM:
            this.hmsVideoStateService.setState(EHmsStates.ENDED);
            break;
        }
      }),
    );
  }
}
