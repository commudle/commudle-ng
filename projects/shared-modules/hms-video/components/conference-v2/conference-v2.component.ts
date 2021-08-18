import {
  HMSPeer,
  HMSTrack,
  selectIsConnectedToRoom,
  selectIsLocalAudioEnabled,
  selectIsLocalScreenShared,
  selectIsLocalVideoEnabled,
  selectIsSomeoneScreenSharing,
  selectLocalMediaSettings,
  selectLocalPeer,
  selectPeers,
  selectPeerScreenSharing,
  selectRoleChangeRequest,
  selectScreenShareByPeerID,
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
import { ConferenceSettingsComponent } from 'projects/shared-modules/hms-video/components/conference-v2/conference-settings/conference-settings.component';
import { EHmsRoles } from 'projects/shared-modules/hms-video/components/enums/hms-roles.enum';
import { IHmsClient } from 'projects/shared-modules/hms-video/models/hms-client.model';
import { HmsStageService } from 'projects/shared-modules/hms-video/services/hms-stage.service';
import { EHmsStates, HmsVideoStateService } from 'projects/shared-modules/hms-video/services/hms-video-state.service';
import { HmsLiveV2Channel } from 'projects/shared-modules/hms-video/services/websockets/hms-live-v2.channel';
import { hmsActions, hmsStore } from 'projects/shared-modules/hms-video/stores/hms.store';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
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
  screenSharePeer: HMSPeer;

  // HMS status variables
  isAudioEnabled: boolean = hmsStore.getState(selectIsLocalAudioEnabled);
  isVideoEnabled: boolean = hmsStore.getState(selectIsLocalVideoEnabled);
  isScreenSharing: boolean;
  isLocalScreenSharing: boolean;

  isRecording: boolean;
  isStreaming: boolean;

  @ViewChild('screenShareContainer', { static: false }) screenShareContainer: ElementRef<HTMLDivElement>;
  // @ViewChild('videoContainer', { static: false }) videoContainer: ElementRef<HTMLDivElement>;
  @ViewChild('roleChangeRequestDialog') roleChangeRequestDialog: TemplateRef<any>;

  subscriptions: Subscription[] = [];

  constructor(
    private hmsVideoStateService: HmsVideoStateService,
    private toastLogService: LibToastLogService,
    private hmsStageService: HmsStageService,
    private nbDialogService: NbDialogService,
    private embeddedVideoStreamsService: EmbeddedVideoStreamsService,
    private hmsLiveV2Channel: HmsLiveV2Channel,
  ) {}

  ngOnInit(): void {
    // Subscribe to join room
    hmsStore.subscribe(this.joinRoom, selectIsConnectedToRoom);
    // Subscribe to invite to stage
    this.hmsStageService.stageStatus$.subscribe((userId: number) => this.inviteToStage(userId));
    // TODO: Get beam status
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.serverClient && this.serverClient && this.currentUser) {
      this.joinSession();
    }
  }

  ngOnDestroy(): void {
    hmsActions.leave().then(() => console.info('[HMS] Left session'));

    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
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
        audioInputDeviceId: hmsStore.getState(selectLocalMediaSettings).audioInputDeviceId,
        videoDeviceId: hmsStore.getState(selectLocalMediaSettings).videoInputDeviceId,
        isAudioMuted: !this.isAudioEnabled,
        isVideoMuted: !this.isVideoEnabled,
      },
    });
  }

  joinRoom = (status: boolean) => {
    if (status) {
      // If user joined as host
      if (this.serverClient.role === EHmsRoles.HOST) {
        const localPeer: HMSPeer = hmsStore.getState(selectLocalPeer);
        hmsActions.changeRole(localPeer.id, EHmsRoles.HOST, true);
      }
      // Subscribe to remote screen share
      hmsStore.subscribe((value: boolean) => (this.isScreenSharing = value), selectIsSomeoneScreenSharing);
      // Subscribe to local screen share
      hmsStore.subscribe((value: boolean) => (this.isLocalScreenSharing = value), selectIsLocalScreenShared);
      // Subscribe to role changes
      hmsStore.subscribe(this.handleRoleChangeRequest, selectRoleChangeRequest);
      // Subscribe to list of peers
      hmsStore.subscribe((peers: HMSPeer[]) => (this.peers = peers), selectPeers);
      // Subscribe to screen share peer
      hmsStore.subscribe((peer: HMSPeer) => {
        this.screenSharePeer = peer;
        this.renderScreenShare();
      }, selectPeerScreenSharing);
      // Subscribe to own channel
      this.receiveChannelData();
    }
  };

  renderVideo = (videoTrack: string) => {
    const videoElement: HTMLVideoElement = document.createElement('video');
    videoElement.autoplay = true;
    videoElement.muted = this.screenSharePeer.isLocal;

    hmsActions.attachVideo(videoTrack, videoElement).then(() => console.info('[HMS] Attached video track'));

    return videoElement;
  };

  toggleAudio(): void {
    const enabled: boolean = hmsStore.getState(selectIsLocalAudioEnabled);
    hmsActions.setLocalAudioEnabled(!enabled).then(() => {
      this.isAudioEnabled = !enabled;
      console.info('[HMS] Toggled audio');
    });
  }

  toggleVideo(): void {
    const enabled: boolean = hmsStore.getState(selectIsLocalVideoEnabled);
    hmsActions.setLocalVideoEnabled(!enabled).then(() => {
      this.isVideoEnabled = !enabled;
      console.info('[HMS] Toggled video');
    });
  }

  toggleScreenShare(): void {
    if (this.isScreenSharing) {
      if (this.isLocalScreenSharing) {
        hmsActions.setScreenShareEnabled(false).then(() => console.info('[HMS] Screen share stopped'));
      } else {
        this.toastLogService.warningDialog('Another screen share in progress');
      }
    } else {
      hmsActions.setScreenShareEnabled(true).then(() => console.info('[HMS] Screen share started'));
    }
  }

  renderScreenShare(): void {
    if (this.screenSharePeer) {
      const screenShareVideoTrack: HMSTrack = hmsStore.getState(selectScreenShareByPeerID(this.screenSharePeer.id));

      this.screenShareContainer.nativeElement.innerHTML = '';
      this.screenShareContainer.nativeElement.append(this.renderVideo(screenShareVideoTrack.id));
    }
  }

  inviteToStage(userId: number): void {
    if (userId) {
      const peers: HMSPeer[] = hmsStore.getState(selectPeers);
      const peer: HMSPeer = peers.find((value: HMSPeer) => value.customerUserId === String(userId));

      hmsActions.changeRole(peer?.id, EHmsRoles.GUEST);
    }
  }

  handleRoleChangeRequest = (request: HMSRoleChangeRequest) => {
    if (!request) {
      return;
    }

    const roleChangeRequestDialog: NbDialogRef<any> = this.nbDialogService.open(this.roleChangeRequestDialog, {
      context: {
        name: request.requestedBy.name,
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
        hmsActions.changeRole(localPeer.id, EHmsRoles.MEMBER, true);
        break;
      case EHmsRoles.MEMBER:
        if (this.serverClient.role === EHmsRoles.HOST) {
          hmsActions.changeRole(localPeer.id, EHmsRoles.HOST, true);
        }
        break;
      // TODO
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
      this.embeddedVideoStreamsService.stopRecording(this.streamable_id, this.streamable_type).subscribe((value) => {
        if (value) {
          this.isRecording = false;
        }
      });
    } else {
      // TODO: Meeting url
      this.embeddedVideoStreamsService
        .startRecording(this.streamable_id, this.streamable_type, '')
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
        .stopStreaming(this.streamable_id, this.streamable_type)
        .subscribe((value: boolean) => {
          if (value) {
            this.isStreaming = false;
          }
        });
    } else {
      // TODO: Meeting url
      this.embeddedVideoStreamsService
        .startStreaming(this.streamable_id, this.streamable_type, '')
        .subscribe((value: boolean) => {
          if (value) {
            this.isStreaming = true;
          }
        });
    }
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
          case this.hmsLiveV2Channel.ACTIONS.END_STREAM:
            this.hmsVideoStateService.setState(EHmsStates.ENDED);
            break;
        }
      }),
    );
  }
}
