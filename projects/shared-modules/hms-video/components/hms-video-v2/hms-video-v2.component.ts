import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { EHmsRoles } from 'projects/shared-modules/hms-video/components/enums/hms-roles.enum';
import { IHmsClient } from 'projects/shared-modules/hms-video/models/hms-client.model';
import { HmsApiService } from 'projects/shared-modules/hms-video/services/hms-api.service';
import { EHmsStates, HmsVideoStateService } from 'projects/shared-modules/hms-video/services/hms-video-state.service';
import { HmsLiveV2Channel } from 'projects/shared-modules/hms-video/services/websockets/hms-live-v2.channel';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hms-video-v2',
  templateUrl: './hms-video-v2.component.html',
  styleUrls: ['./hms-video-v2.component.scss'],
})
export class HmsVideoV2Component implements OnInit, OnDestroy, OnChanges {
  @Input() roomId: string;
  @Input() streamable_id: number;
  @Input() streamable_type: string;

  currentUser: ICurrentUser;

  EHmsStates = EHmsStates;
  hmsState: EHmsStates;

  serverClient: IHmsClient;
  selectedRole: EHmsRoles;

  channelSubscription;
  subscriptions: Subscription[] = [];

  constructor(
    private authWatchService: LibAuthwatchService,
    private hmsVideoStateService: HmsVideoStateService,
    private hmsApiService: HmsApiService,
    private hmsLiveV2Channel: HmsLiveV2Channel,
  ) {}

  ngOnInit(): void {
    // Set the initial hms state
    // TODO: set this as per the user's role [webinar, or conference]
    // this.hmsVideoStateService.setState(EHmsStates.INIT);

    // Subscribe to hms state service
    this.subscriptions.push(
      this.hmsVideoStateService.hmsState$.subscribe((value: EHmsStates) => {
        this.hmsState = value;
      }),
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.roomId) {
      // Get current user
      this.subscriptions.push(
        this.authWatchService.currentUser$.subscribe((value: ICurrentUser) => {
          this.currentUser = value;
          // Get client token
          this.getClient();
        }),
      );
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe all subscriptions
    this.channelSubscription?.unsubscribe();
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  getClient(): void {
    this.subscriptions.push(
      this.hmsApiService.getClientTokenV2(this.roomId).subscribe((value: IHmsClient) => {
        this.serverClient = value;
        this.connectToChannel();
      }),
    );
  }

  connectToChannel(): void {
    // Subscribe to channel
    this.channelSubscription = this.hmsLiveV2Channel.subscribe(
      this.roomId,
      this.currentUser.id,
      this.serverClient.token,
      this.currentUser.name,
      this.selectedRole,
    );

    // Check if session has ended
    this.subscriptions.push(
      this.hmsLiveV2Channel.channelData$[`${this.currentUser.id}`].subscribe((data: any) => {
        if (data) {
          switch (data.action) {
            case this.hmsLiveV2Channel.ACTIONS.SET_PERMISSIONS: {
              if (data.room_ended) {
                this.hmsVideoStateService.setState(EHmsStates.ENDED);
              } else {
                this.hmsVideoStateService.setState(EHmsStates.INIT);
              }
              break;
            }
          }
        }
      }),
    );
  }
}
