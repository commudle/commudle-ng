import {
  HMSException,
  HMSNotification,
  HMSNotificationTypes,
  HMSPeer,
  HMSRoleChangeRequest,
  selectIsConnectedToRoom,
  selectIsLocalAudioEnabled,
  selectIsLocalScreenShared,
  selectIsLocalVideoEnabled,
  selectIsSomeoneScreenSharing,
  selectLocalPeer,
  selectPeers,
  selectRoleChangeRequest,
} from '@100mslive/hms-video-store';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NbDialogRef, NbDialogService, NbTrigger } from '@commudle/theme';
import { EmbeddedVideoStreamsService } from 'apps/commudle-admin/src/app/services/embedded-video-streams.service';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { IEmbeddedVideoStream } from 'apps/shared-models/embedded_video_stream.model';
import { EHmsRoles } from 'apps/shared-modules/hms-video/enums/hms-roles.enum';
import { EHmsStates } from 'apps/shared-modules/hms-video/enums/hms-states.enum';
import { IHmsClient } from 'apps/shared-modules/hms-video/models/hms-client.model';
import { HmsStageService } from 'apps/shared-modules/hms-video/services/hms-stage.service';
import { HmsVideoStateService } from 'apps/shared-modules/hms-video/services/hms-video-state.service';
import { LocalMediaService } from 'apps/shared-modules/hms-video/services/local-media.service';
import { HmsLiveChannel } from 'apps/shared-modules/hms-video/services/websockets/hms-live.channel';
import { hmsActions, hmsNotifications, hmsStore } from 'apps/shared-modules/hms-video/stores/hms.store';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { combineLatest, Subscription } from 'rxjs';
import { ConferenceSettingsComponent } from './conference-settings/conference-settings.component';

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.scss'],
})
export class ConferenceComponent implements OnInit, OnChanges, OnDestroy {
  @Input() serverClient: IHmsClient;
  @Input() currentUser: ICurrentUser;
  @Input() selectedRole: EHmsRoles;
  @Input() embeddedVideoStream: IEmbeddedVideoStream;

  @Output() beamStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

  EHmsRoles = EHmsRoles;

  peers: HMSPeer[] = [];
  localPeer: HMSPeer;

  joinedAsHost: boolean;

  isConnectedToRoom: boolean;
  isOnStage: boolean;
  enableHmsForStage: boolean;
  isScreenSharing: boolean;
  isLocalScreenSharing: boolean;
  isRecording: boolean;
  isStreaming: boolean;
  showReconnecting = false;

  selectedAudioInputDeviceId: string;
  selectedVideoDeviceId: string;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;

  NbTrigger = NbTrigger;

  @ViewChild('screenShareContainer', { static: false }) screenShareContainer: ElementRef<HTMLDivElement>;

  subscriptions: Subscription[] = [];
  notificationUnsubscription;

  constructor(
    private hmsVideoStateService: HmsVideoStateService,
    private toastLogService: LibToastLogService,
    private hmsStageService: HmsStageService,
    private nbDialogService: NbDialogService,
    private embeddedVideoStreamsService: EmbeddedVideoStreamsService,
    private hmsLiveChannel: HmsLiveChannel,
    private localMediaService: LocalMediaService,
  ) {
  }

  ngOnInit(): void {
    hmsStore.subscribe(this.subscribeToListeners, selectIsConnectedToRoom);

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

    if (this.selectedRole === EHmsRoles.HOST) {
      this.isOnStage = true;
      this.joinedAsHost = true;
    }
  }

  ngOnDestroy(): void {
    this.leaveRoom();

    this.subscriptions.forEach((value: Subscription) => value.unsubscribe());
    this.notificationUnsubscription();
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
    });
  }

  subscribeToListeners = (status: boolean) => {
    this.isConnectedToRoom = status;

    if (status) {
      hmsStore.subscribe((peers: HMSPeer[]) => {
        this.peers = peers;
      }, selectPeers);
      hmsStore.subscribe((localPeer: HMSPeer) => {
        this.localPeer = localPeer;
        if (localPeer?.audioTrack && localPeer?.videoTrack) {
          this.subscribeToMediaDevices();
        }
        if (this.joinedAsHost && localPeer) {
          if (this.selectedRole === EHmsRoles.HOST) {
            hmsActions.changeRole(localPeer.id, EHmsRoles.HOST, true);
          }
          this.joinedAsHost = false;
        }
      }, selectLocalPeer);

      hmsStore.subscribe((value: boolean) => {
        this.isAudioEnabled = value;
      }, selectIsLocalAudioEnabled);
      hmsStore.subscribe((value: boolean) => {
        this.isVideoEnabled = value;
      }, selectIsLocalVideoEnabled);
      hmsStore.subscribe((isScreenSharing: boolean) => {
        this.isScreenSharing = isScreenSharing;
      }, selectIsSomeoneScreenSharing);
      hmsStore.subscribe((isLocalScreenSharing: boolean) => {
        this.isLocalScreenSharing = isLocalScreenSharing;
      }, selectIsLocalScreenShared);

      hmsStore.subscribe(this.handleRoleChangeRequest, selectRoleChangeRequest);

      this.receiveNotifications();
      this.receiveChannelData();
    }
  };

  subscribeToMediaDevices(): void {
    if (this.enableHmsForStage) {
      this.enableHmsForStage = false;

      this.selectedAudioInputDeviceId = this.localMediaService.getAudioInputDeviceId();
      this.selectedVideoDeviceId = this.localMediaService.getVideoDeviceId();
      this.isAudioEnabled = this.localMediaService.getIsAudioEnabled();
      this.isVideoEnabled = this.localMediaService.getIsVideoEnabled();

      hmsActions.setAudioSettings({ deviceId: this.selectedAudioInputDeviceId });
      hmsActions.setVideoSettings({ deviceId: this.selectedVideoDeviceId });
      hmsActions.setLocalAudioEnabled(this.isAudioEnabled);
      hmsActions.setLocalVideoEnabled(this.isVideoEnabled);

      this.subscribeToMediaDevices();
    } else {
      this.subscriptions.push(
        combineLatest(
          this.localMediaService.audioInputDeviceId$,
          this.localMediaService.videoDeviceId$,
          this.localMediaService.isAudioEnabled$,
          this.localMediaService.isVideoEnabled$,
        ).subscribe(([audioInputDeviceId, videoDeviceId, isAudioEnabled, isVideoEnabled]) => {
          if (!this.enableHmsForStage) {
            if (this.selectedAudioInputDeviceId !== audioInputDeviceId) {
              this.selectedAudioInputDeviceId = audioInputDeviceId;
              hmsActions.setAudioSettings({ deviceId: this.selectedAudioInputDeviceId });
            }

            if (this.selectedVideoDeviceId !== videoDeviceId) {
              this.selectedVideoDeviceId = videoDeviceId;
              hmsActions.setVideoSettings({ deviceId: this.selectedVideoDeviceId });
            }

            if (this.isAudioEnabled !== isAudioEnabled) {
              this.isAudioEnabled = isAudioEnabled;
              hmsActions.setLocalAudioEnabled(this.isAudioEnabled);
            }

            if (this.isVideoEnabled !== isVideoEnabled) {
              this.isVideoEnabled = isVideoEnabled;
              hmsActions.setLocalVideoEnabled(this.isVideoEnabled);
            }
          }
        }),
      );
    }
  }

  toggleAudio(): void {
    this.localMediaService.setIsAudioEnabled(!this.isAudioEnabled);
  }

  toggleVideo(): void {
    this.localMediaService.setIsVideoEnabled(!this.isVideoEnabled);
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
      const peers: HMSPeer[] = this.peers.filter((peer: HMSPeer) => {
        return peer.customerDescription && JSON.parse(peer.customerDescription)?.id === userId;
      });
      if (peers.length > 0) {
        const roleName: string = peers[0].roleName;
        const name: string = JSON.parse(peers[0].customerDescription).name;
        switch (roleName) {
          case EHmsRoles.HOST:
            this.toastLogService.warningDialog(`Cannot invite ${name} to stage, they are the host`);
            break;
          case EHmsRoles.HOST_VIEWER:
            this.toastLogService.warningDialog(`Cannot invite ${name} to stage, they are a host viewer`);
            break;
          case EHmsRoles.VIEWER:
            peers.forEach((peer: HMSPeer) => hmsActions.changeRole(peer.id, EHmsRoles.GUEST));
            this.toastLogService.successDialog(`Invited ${name} to the stage, they will now see a popup`);
            break;
          case EHmsRoles.GUEST:
            this.toastLogService.warningDialog(`Cannot invite ${name} to stage, they are already on the stage`);
            break;
        }
      } else {
        this.toastLogService.warningDialog('User not in room');
      }
    }
  }

  handleRoleChangeRequest = (request: HMSRoleChangeRequest) => {
    if (!request) {
      return;
    }

    const roleChangeRequestDialog: NbDialogRef<ConferenceSettingsComponent> = this.nbDialogService.open(
      ConferenceSettingsComponent,
      {
        context: {
          invitation: true,
        },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      },
    );
    roleChangeRequestDialog.onClose.subscribe((accept: boolean) => {
      if (accept) {
        hmsActions.acceptChangeRole(request);
      } else {
        hmsActions.rejectChangeRole(request);
      }
    });
  };

  toggleStage(): void {
    switch (this.localPeer.roleName) {
      case EHmsRoles.HOST:
        hmsActions.changeRole(this.localPeer.id, EHmsRoles.HOST_VIEWER, true);
        this.isOnStage = false;
        break;
      case EHmsRoles.HOST_VIEWER:
        const joinStageDialog: NbDialogRef<ConferenceSettingsComponent> = this.nbDialogService.open(
          ConferenceSettingsComponent,
          {
            context: {
              joinStage: true,
            },
            closeOnBackdropClick: false,
            closeOnEsc: false,
          },
        );
        joinStageDialog.onClose.subscribe((accept: boolean) => {
          if (accept) {
            hmsActions.changeRole(this.localPeer.id, EHmsRoles.HOST, true);
            this.isOnStage = true;
            this.joinedAsHost = true;
            this.enableHmsForStage = true;
          }
        });
        break;
    }
  }

  openSettings(): void {
    this.nbDialogService.open(ConferenceSettingsComponent);
  }

  toggleRecording(): void {
    if (this.serverClient.role === EHmsRoles.GUEST || this.serverClient.role === EHmsRoles.VIEWER) {
      return;
    }

    if (this.isRecording) {
      this.embeddedVideoStreamsService
        .stopRecording(this.embeddedVideoStream.streamable_id, this.embeddedVideoStream.streamable_type)
        .subscribe((value: boolean) => value);
    } else {
      this.embeddedVideoStreamsService
        .startRecording(
          this.embeddedVideoStream.streamable_id,
          this.embeddedVideoStream.streamable_type,
          this.getMeetingUrl(),
        )
        .subscribe((value: boolean) => value);
    }
  }

  toggleStreaming(): void {
    if (this.serverClient.role === EHmsRoles.GUEST || this.serverClient.role === EHmsRoles.VIEWER) {
      return;
    }

    if (this.isStreaming) {
      this.embeddedVideoStreamsService
        .stopStreaming(this.embeddedVideoStream.streamable_id, this.embeddedVideoStream.streamable_type)
        .subscribe((value: boolean) => value);
    } else {
      this.embeddedVideoStreamsService
        .startStreaming(
          this.embeddedVideoStream.streamable_id,
          this.embeddedVideoStream.streamable_type,
          this.getMeetingUrl(),
        )
        .subscribe((value: boolean) => value);
    }
  }

  getMeetingUrl(): string {
    // if 'admin/' is present in url then remove it, then remove 'session' and add 'beam' at the end
    let meetingUrl = location.href.replace('admin/', '');
    if (meetingUrl.endsWith('session')) {
      meetingUrl = meetingUrl.replace('session', 'beam');
    } else {
      meetingUrl = meetingUrl + '/beam';
      // replace 'event-dashboard' with 'events'
      meetingUrl = meetingUrl.replace('event-dashboard', 'events');
    }
    return meetingUrl;
  }

  leaveRoom(): void {
    if (hmsStore.getState(selectIsConnectedToRoom)) {
      hmsActions.leave();
    }
  }

  leaveSession(): void {
    this.leaveRoom();
    this.hmsVideoStateService.setState(EHmsStates.LEFT);
  }

  endSession(): void {
    if (this.serverClient.role === EHmsRoles.HOST || this.serverClient.role === EHmsRoles.HOST_VIEWER) {
      if (window.confirm('Are you sure you want to end the session?')) {
        this.hmsLiveChannel.sendData(this.hmsLiveChannel.ACTIONS.END_STREAM, this.currentUser.id, {});
        this.toastLogService.successDialog('Session has ended');
      }
    }
  }

  receiveChannelData(): void {
    this.subscriptions.push(
      this.hmsLiveChannel.channelData$[this.currentUser.id].subscribe((value: any) => {
        switch (value.action) {
          case this.hmsLiveChannel.ACTIONS.RECORDING_STARTED:
            this.beamStatus.emit(true);
            this.isRecording = true;
            break;
          case this.hmsLiveChannel.ACTIONS.RECORDING_STOPPED:
            this.beamStatus.emit(false);
            this.isRecording = false;
            break;
          case this.hmsLiveChannel.ACTIONS.STREAMING_STARTED:
            this.beamStatus.emit(true);
            this.isStreaming = true;
            break;
          case this.hmsLiveChannel.ACTIONS.STREAMING_STOPPED:
            this.beamStatus.emit(false);
            this.isStreaming = false;
            break;
          case this.hmsLiveChannel.ACTIONS.END_STREAM:
            this.leaveRoom();
            this.hmsVideoStateService.setState(EHmsStates.ENDED);
            break;
        }
      }),
    );
  }

  receiveNotifications(): void {
    this.notificationUnsubscription = hmsNotifications.onNotification((notification: HMSNotification) => {
      if (!notification) {
        return;
      }

      switch (notification.type) {
        case HMSNotificationTypes.RECONNECTING:
          this.showReconnecting = true;
          break;
        case HMSNotificationTypes.RECONNECTED:
          this.showReconnecting = false;
          break;
        case HMSNotificationTypes.ERROR:
          const data: HMSException = notification.data;
          switch (data.code) {
            // Websocket disconnected - Happens due to network issues
            case 1003:
            // ICE Connection Failed due to network issue
            case 4005:
              this.hmsVideoStateService.setState(EHmsStates.DISCONNECTED);
              break;
          }
          break;
      }
    });
  }
}
