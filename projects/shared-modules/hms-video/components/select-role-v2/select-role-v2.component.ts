import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EHmsRoles } from 'projects/shared-modules/hms-video/enums/hms-roles.enum';
import { EHmsStates } from 'projects/shared-modules/hms-video/enums/hms-states.enum';
import { IHmsClient } from 'projects/shared-modules/hms-video/models/hms-client.model';
import { HmsVideoStateService } from 'projects/shared-modules/hms-video/services/hms-video-state.service';

@Component({
  selector: 'app-select-role-v2',
  templateUrl: './select-role-v2.component.html',
  styleUrls: ['./select-role-v2.component.scss'],
})
export class SelectRoleV2Component implements OnInit {
  @Input() serverClient: IHmsClient;

  @Output() selectedRole: EventEmitter<EHmsRoles> = new EventEmitter<EHmsRoles>();

  EHmsRoles = EHmsRoles;

  constructor(private hmsVideoStateService: HmsVideoStateService) {}

  ngOnInit(): void {}

  selectRole(role: EHmsRoles): void {
    this.selectedRole.emit(role);

    switch (role) {
      case EHmsRoles.VIEWER:
        this.hmsVideoStateService.setState(EHmsStates.ROOM);
        break;
      case EHmsRoles.HOST:
      case EHmsRoles.HOST_VIEWER:
        this.hmsVideoStateService.setState(EHmsStates.PREVIEW);
        break;
    }
  }
}
