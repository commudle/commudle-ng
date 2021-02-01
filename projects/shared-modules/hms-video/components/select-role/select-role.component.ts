import { Component, Input, OnInit } from '@angular/core';
import { IHmsClient } from 'projects/shared-models/hms-client.model';
import { HmsApiService } from '../../services/hms-api.service';

@Component({
  selector: 'app-select-role',
  templateUrl: './select-role.component.html',
  styleUrls: ['./select-role.component.scss']
})
export class SelectRoleComponent implements OnInit {
  loading = true;
  @Input() roomId: string;
  client: IHmsClient;


  constructor(
    private hmsApiService: HmsApiService,

  ) { }

  ngOnInit(): void {
    this.getClient();
  }

  getClient() {
    this.hmsApiService.getClientToken(this.roomId).subscribe(data => {
      this.loading = false;
      this.client = data;
    });
  }

}
