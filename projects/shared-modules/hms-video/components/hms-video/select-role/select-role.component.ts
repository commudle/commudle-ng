import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EHmsRoles } from 'projects/shared-modules/hms-video/enums/hms-roles.enum';
import { EHmsStates } from 'projects/shared-modules/hms-video/enums/hms-states.enum';
import { IHmsClient } from 'projects/shared-modules/hms-video/models/hms-client.model';
import { HmsVideoStateService } from 'projects/shared-modules/hms-video/services/hms-video-state.service';

@Component({
  selector: 'app-select-role',
  templateUrl: './select-role.component.html',
  styleUrls: ['./select-role.component.scss'],
})
export class SelectRoleComponent implements OnInit {
  @Input() serverClient: IHmsClient;

  @Output() selectedRole: EventEmitter<EHmsRoles> = new EventEmitter<EHmsRoles>();

  EHmsRoles = EHmsRoles;

  constructor(private hmsVideoStateService: HmsVideoStateService) {}

  ngOnInit(): void {}

  selectRole(role: EHmsRoles): void {
    this.selectedRole.emit(role);

    switch (role) {
      case EHmsRoles.VIEWER:
      case EHmsRoles.HOST_VIEWER:
        this.hmsVideoStateService.setState(EHmsStates.ROOM);
        break;
      case EHmsRoles.HOST:
        this.hmsVideoStateService.setState(EHmsStates.PREVIEW);
        break;
    }
  }
}
