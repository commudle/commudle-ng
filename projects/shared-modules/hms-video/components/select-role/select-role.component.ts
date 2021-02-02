import { EHmsRoles } from './../enums/hms-roles.enum';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { IHmsClient } from 'projects/shared-modules/hms-video/models/hms-client.model';
import { EHmsStates, HmsVideoStateService } from '../../services/hms-video-state.service';

@Component({
  selector: 'app-select-role',
  templateUrl: './select-role.component.html',
  styleUrls: ['./select-role.component.scss']
})
export class SelectRoleComponent implements OnInit {
  loading = true;

  @Input() roomId: string;
  @Input() client: IHmsClient;
  @Output() selectedRole = new EventEmitter();


  EHmsRoles = EHmsRoles;

  constructor(
    private hmsVideoStateService: HmsVideoStateService

  ) { }

  ngOnInit(): void {
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

}
