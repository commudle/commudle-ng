import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ELabPublishStatus, ILab } from '@commudle/shared-models';
import { LibToastLogService } from '@commudle/shared-services';
import * as moment from 'moment';
import { SysAdminLabsService } from '../../services/sys-admin-labs.service';

@Component({
  selector: 'commudle-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabsComponent implements OnInit {
  moment = moment;
  ELabPublishStatus = ELabPublishStatus;
  publishStatuses = Object.keys(ELabPublishStatus);
  page = 1;
  count = 100;
  loading = false;
  labs = {
    draft: [] as ILab[],
    submitted: [] as ILab[],
    published: [] as ILab[],
    flagged: [] as ILab[],
    removed: [] as ILab[],
  };

  constructor(
    private toastLogService: LibToastLogService,
    private labsService: SysAdminLabsService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.getAllLabs();
  }

  getAllLabs() {
    this.loading = true;
    this.labsService.getAll(this.page, this.count).subscribe((data) => {
      if (data.labs.length > 0) {
        for (const lab of data.labs) {
          lab.createdSince = moment(lab.created_at).fromNow();
          this.labs[lab.publish_status].push(lab);
        }
        // this.changeDetectorRef.markForCheck();
        this.page += 1;
        this.getAllLabs();
      } else {
        this.loading = false;
      }
    });
  }

  updatePublishStatus(publishStatus, labId) {
    this.labsService
      .updatePublishStatus(labId, publishStatus)
      .subscribe(() => this.toastLogService.successDialog(`Status Updated!`));
  }
}
