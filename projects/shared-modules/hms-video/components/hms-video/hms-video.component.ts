import { HMSClient } from '@100mslive/hmsvideo-web';
import { Component, Input, OnChanges, OnInit, OnDestroy, Inject } from '@angular/core';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { IHmsClient } from 'projects/shared-modules/hms-video/models/hms-client.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { HmsApiService } from '../../services/hms-api.service';
import { HmsClientManagerService } from '../../services/hms-client-manager.service';
import { EHmsStates, HmsVideoStateService } from '../../services/hms-video-state.service';
import { HmsLiveChannel } from '../../services/websockets/hms-live.channel';
import { EHmsRoles } from '../enums/hms-roles.enum';
@Component({
  selector: 'app-hms-video',
  templateUrl: './hms-video.component.html',
  styleUrls: ['./hms-video.component.scss']
})
export class HmsVideoComponent implements OnInit, OnChanges, OnDestroy {
  loading = true;
  @Input() roomId: string;

  // this is the client with auth token and role
  serverClient: IHmsClient;

  // this is the client which the hms library creates
  hmsClient: HMSClient;
  channelSubscription;
  connectedToChannel = false;
  subscriptions = [];

  EHmsStates = EHmsStates;
  currentState: EHmsStates;

  selectedRole: EHmsRoles;
  user: ICurrentUser;

  constructor(
    private hmsVideoStateService: HmsVideoStateService,
    private hmsApiService: HmsApiService,
    private hmsLiveChannel: HmsLiveChannel,
    private hmsClientManagerService: HmsClientManagerService,
    private authWatchService: LibAuthwatchService
  ) { 
  }

  ngOnInit(): void {
    // todo set this as per the user's role [webinar, or conference]
    this.hmsVideoStateService.setState(EHmsStates.INIT);

    this.subscriptions.push(
      this.hmsVideoStateService.hmsState$.subscribe(
        data => this.currentState = data
      ),
      this.authWatchService.currentUser$.subscribe(
        data => {
          this.user = data;
          this.getClient();
        }
      )
    );
  }


  ngOnChanges() {
    if (this.roomId && !this.serverClient && this.user) {
      this.getClient();
    }
  }

  ngOnDestroy() {
    this.channelSubscription.unsubscribe();
    for (let subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }

  getClient() {
    this.hmsApiService.getClientToken(this.roomId).subscribe(data => {
      this.serverClient = data;

      // by default, the selected role will be same as the one we have received in the client
      this.selectedRole = this.serverClient.role;
      this.hmsClient = this.hmsClientManagerService.createClient(this.user.name, this.serverClient.token);
      this.subscribeChannel();
      this.loading = false;

    });
  }

  setSelectedRole(role) {
    this.selectedRole = role;
  }


  // subscribe the parent component to the live channel to update the status of the user
  subscribeChannel() {
    this.channelSubscription = this.hmsLiveChannel.subscribe(
      this.roomId,
      this.hmsClient.uid,
      this.serverClient.token,
      this.user.name,
      this.serverClient.role
    );

    this.subscriptions.push(
      this.hmsLiveChannel.channelConnectionStatus$[`${this.hmsClient.uid}`].subscribe(
        data => {
          if (data) {
            this.connectedToChannel = true;
          }
        }
      )
    );

    this.subscriptions.push(
      this.hmsLiveChannel.channelData$[`${this.hmsClient.uid}`].subscribe(
        data => {
          if (data) {
            switch (data.action) {
              case this.hmsLiveChannel.ACTIONS.SET_PERMISSIONS: {
                if (data.room_ended === true) {
                  this.hmsVideoStateService.setState(EHmsStates.ENDED);
                }
                break;
              }
            }
          }
        }
      )
    );
  }

}


