import { EHmsRoles } from './../enums/hms-roles.enum';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { IHmsClient } from 'projects/shared-modules/hms-video/models/hms-client.model';
import { EHmsStates, HmsVideoStateService } from '../../services/hms-video-state.service';
import { HmsLiveChannel } from '../../services/websockets/hms-live.channel';
import { ICurrentUser } from 'projects/shared-models/current_user.model';

@Component({
  selector: 'app-select-role',
  templateUrl: './select-role.component.html',
  styleUrls: ['./select-role.component.scss']
})
export class SelectRoleComponent implements OnInit {
  loading = true;

  @Input() roomId: string;
  @Input() client: IHmsClient;
  @Input() hmsClient;
  @Input() channelSocket;
  @Input() user: ICurrentUser;
  @Output() selectedRole = new EventEmitter();


  EHmsRoles = EHmsRoles;

  constructor(
    private hmsVideoStateService: HmsVideoStateService,
    private hmsLiveChannel: HmsLiveChannel
  ) { }

  ngOnInit(): void {
    this.updateConfStatus();
  }

  selectRole(role: EHmsRoles) {
    this.selectedRole.emit(role);
    switch (role) {
      case EHmsRoles.VIEWER:
        this.hmsVideoStateService.setState(EHmsStates.ROOM);
        break;
      default:
        this.hmsVideoStateService.setState(EHmsStates.PREVIEW);

    }
  }

  updateConfStatus() {
    this.hmsLiveChannel.sendData(
      this.hmsLiveChannel.ACTIONS.UPDATE_STATUS,
      this.hmsClient.uid,
      {
        status: this.hmsVideoStateService.states.INIT
      }
      )
  }

}
