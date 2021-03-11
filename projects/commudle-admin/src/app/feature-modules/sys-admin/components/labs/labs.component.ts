import { Component, OnInit } from '@angular/core';
import { EPublishStatus, ILab } from 'projects/shared-models/lab.model';
import * as moment from 'moment';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { NbWindowService } from '@nebular/theme';
import { SysAdminLabsService } from '../../services/sys-admin-labs.service';

@Component({
  selector: 'app-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.scss']
})
export class LabsComponent implements OnInit {


  moment = moment;
  labs: ILab[] = [];
  EPublishStatus = EPublishStatus;
  publishStatuses = Object.keys(EPublishStatus);
  page = 1;
  loading = true;

  constructor(
    private toastLogService: LibToastLogService,
    private labsService: SysAdminLabsService,
    private windowService: NbWindowService
  ) { }

  ngOnInit() {
    this.getAllLabs();
  }


  getAllLabs() {
    this.labsService.getAll(this.page).subscribe(
      data => {
        if (data.labs.length > 0) {
          this.labs = [...this.labs, ...data.labs];
          this.page += 1;
          this.getAllLabs();
        } else {
          this.loading = false;
        }
      }
    );
  }

  updatePublishStatus(publishStatus, labId) {
    this.labsService.updatePublishStatus(labId, publishStatus).subscribe(
      data => {
        this.toastLogService.successDialog(`Status Updated!`);
      }
    );
  }

}
