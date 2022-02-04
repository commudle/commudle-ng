import {
  HMSPeer,
  HMSTrack,
  selectAudioTrackByPeerID,
  selectCameraStreamByPeerID,
  selectIsPeerAudioEnabled,
  selectIsPeerVideoEnabled,
  selectLocalPeer,
  selectScreenShareByPeerID,
} from '@100mslive/hms-video-store';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { AppUsersService } from 'projects/commudle-admin/src/app/services/app-users.service';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { EHmsRoles } from 'projects/shared-modules/hms-video/enums/hms-roles.enum';
import { hmsActions, hmsStore } from 'projects/shared-modules/hms-video/stores/hms.store';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';

@Component({
  selector: 'app-conference-user-video',
  templateUrl: './conference-user-video.component.html',
  styleUrls: ['./conference-user-video.component.scss'],
})
export class ConferenceUserVideoComponent implements OnInit, OnChanges, AfterViewInit {
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

  currentUser: ICurrentUser;
  isFollowing = false;

  @ViewChild('videoElement') videoElement: ElementRef<HTMLVideoElement>;

  constructor(
    private toastLogService: LibToastLogService,
    private authWatchService: LibAuthwatchService,
    private appUsersService: AppUsersService,
  ) {}

  ngOnInit(): void {
    hmsStore.subscribe((peer: HMSPeer) => (this.localPeer = peer), selectLocalPeer);

    this.authWatchService.currentUser$.subscribe((currentUser) => {
      this.currentUser = currentUser;
      this.checkFollowing();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.peer?.customerDescription) {
      this.metaData = JSON.parse(this.peer.customerDescription);
    }
  }

  ngAfterViewInit() {
    hmsStore.subscribe((value: boolean) => (this.isAudioEnabled = value), selectIsPeerAudioEnabled(this.peer.id));
    if (this.screenShare) {
      hmsStore.subscribe((track: HMSTrack) => this.renderTrack(track), selectScreenShareByPeerID(this.peer.id));
    } else {
      // INFO: As discussed with Easwar and Akash from 100ms
      hmsStore.subscribe((value: boolean) => {
        this.renderTrack(hmsStore.getState(selectCameraStreamByPeerID(this.peer.id)));
        this.isVideoEnabled = value;
      }, selectIsPeerVideoEnabled(this.peer.id));
      hmsStore.subscribe((value: HMSTrack) => {
        if (this.isVideoEnabled) {
          this.renderTrack(value);
        }
      }, selectCameraStreamByPeerID(this.peer.id));
    }
  }

  renderTrack = (track: HMSTrack) => {
    if (track) {
      if (track.enabled) {
        this.attachTrack(track.id);
      } else {
        this.detachTrack(track.id);
      }
    }
  };

  attachTrack(trackId: string): void {
    hmsActions.attachVideo(trackId, this.videoElement.nativeElement);
  }

  detachTrack(trackId: string): void {
    hmsActions.detachVideo(trackId, this.videoElement.nativeElement);
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
        const metaData = JSON.parse(this.peer.customerDescription);
        this.toastLogService.warningDialog(`Cannot remove ${metaData.name} from stage`);
        break;
      case EHmsRoles.GUEST:
        hmsActions.changeRole(this.peer.id, EHmsRoles.VIEWER, true);
    }
  }

  removeFromSession(): void {
    if (this.peer.roleName === EHmsRoles.HOST) {
      const metaData = JSON.parse(this.peer.customerDescription);
      this.toastLogService.warningDialog(`Cannot remove ${metaData.name} from session`);
    } else {
      hmsActions.removePeer(this.peer.id, 'Good bye');
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    hmsActions.leave();
    delete $event['returnValue'];
  }

  toggleFollow(username: string) {
    this.appUsersService.toggleFollow(username).subscribe(() => {
      this.checkFollowing();
    });
  }

  checkFollowing() {
    if (this.currentUser && this.metaData) {
      this.appUsersService.check_followee(this.metaData.username).subscribe((value) => (this.isFollowing = value));
    }
  }
}
