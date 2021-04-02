import { Component, OnInit } from '@angular/core';
import { EPublishStatus, ILab } from 'projects/shared-models/lab.model';
import * as moment from 'moment';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { SysAdminLabsService } from '../../services/sys-admin-labs.service';

@Component({
  selector: 'app-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.scss']
})
export class LabsComponent implements OnInit {


  moment = moment;
  // labs: ILab[] = [];
  EPublishStatus = EPublishStatus;
  publishStatuses = Object.keys(EPublishStatus);
  page = 1;
  loading = true;
  labs = {
    draft: [] as ILab[],
    submitted: [] as ILab[],
    published: [] as ILab[],
    flagged: [] as ILab[],
    removed: [] as ILab[]
  }

  constructor(
    private toastLogService: LibToastLogService,
    private labsService: SysAdminLabsService,
  ) { }

  ngOnInit() {

    this.getAllLabs();
  }


  getAllLabs() {
    this.labsService.getAll(this.page).subscribe(
      data => {
        if (data.labs.length > 0) {
          for (const lab of data.labs) {
            lab.createdSince = moment(lab.created_at).fromNow();
            this.labs[lab.publish_status].push(lab)
          }
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
