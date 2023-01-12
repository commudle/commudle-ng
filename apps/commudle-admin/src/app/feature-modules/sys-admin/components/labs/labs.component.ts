import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { SysAdminLabsService } from 'apps/commudle-admin/src/app/feature-modules/sys-admin/services/sys-admin-labs.service';
import { EPublishStatus, ILab } from 'apps/shared-models/lab.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';

@Component({
  selector: 'app-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.scss'],
})
export class LabsComponent implements OnInit {
  moment = moment;
  EPublishStatus = EPublishStatus;
  publishStatuses = Object.keys(EPublishStatus);
  page = 1;
  loading = true;
  labs = {
    draft: [] as ILab[],
    submitted: [] as ILab[],
    published: [] as ILab[],
    flagged: [] as ILab[],
    removed: [] as ILab[],
  };

  constructor(private toastLogService: LibToastLogService, private labsService: SysAdminLabsService) {}

  ngOnInit() {
    this.getAllLabs();
  }

  getAllLabs() {
    this.labsService.getAll(this.page).subscribe((data) => {
      if (data.labs.length > 0) {
        for (const lab of data.labs) {
          lab.createdSince = moment(lab.created_at).fromNow();
          this.labs[lab.publish_status].push(lab);
        }
        this.page += 1;
        this.getAllLabs();
      } else {
        this.loading = false;
      }
    });
  }

  updatePublishStatus(publishStatus, labId) {
    this.labsService.updatePublishStatus(labId, publishStatus).subscribe(() => {
      this.toastLogService.successDialog(`Status Updated!`);
    });
  }
}
