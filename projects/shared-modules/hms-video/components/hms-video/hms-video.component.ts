import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IHmsClient } from 'projects/shared-modules/hms-video/models/hms-client.model';
import { HmsApiService } from '../../services/hms-api.service';
import { EHmsStates, HmsVideoStateService } from '../../services/hms-video-state.service';
import { EHmsRoles } from '../enums/hms-roles.enum';

@Component({
  selector: 'app-hms-video',
  templateUrl: './hms-video.component.html',
  styleUrls: ['./hms-video.component.scss']
})
export class HmsVideoComponent implements OnInit, OnChanges {
  loading = true;
  @Input() roomId: string;
  client: IHmsClient;

  EHmsStates = EHmsStates;
  currentState: EHmsStates;

  selectedRole: EHmsRoles;

  constructor(
    private hmsVideoStateService: HmsVideoStateService,
    private hmsApiService: HmsApiService
  ) { }

  ngOnInit(): void {
    // todo set this as per the user's role [webinar, or conference]
    this.hmsVideoStateService.setState(EHmsStates.INIT);

    this.hmsVideoStateService.hmsState$.subscribe(
      data => this.currentState = data
    );
  }


  ngOnChanges() {
    if (this.roomId && !this.client) {
      this.getClient();
    }
  }

  getClient() {
    this.hmsApiService.getClientToken(this.roomId).subscribe(data => {
      this.loading = false;
      this.client = data;

      // by default, the selected role will be same as the one we have received in the client
      this.selectedRole = this.client.role;
    });
  }

  setSelectedRole(role) {
    this.selectedRole = role;
  }

}
