import { Component, OnDestroy, OnInit } from '@angular/core';
import { faFlask } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { LabsService } from 'projects/commudle-admin/src/app/feature-modules/labs/services/labs.service';
import { AppUsersService } from 'projects/commudle-admin/src/app/services/app-users.service';
import { EPublishStatus, ILab } from 'projects/shared-models/lab.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { SeoService } from 'projects/shared-services/seo.service';

@Component({
  selector: 'app-my-labs',
  templateUrl: './my-labs.component.html',
  styleUrls: ['./my-labs.component.scss'],
})
export class MyLabsComponent implements OnInit, OnDestroy {
  faFlask = faFlask;
  moment = moment;
  userSubscription;

  labs: ILab[] = [];
  incompleteProfile = false;
  isLoading = false;

  constructor(
    private labsService: LabsService,
    private toastLogService: LibToastLogService,
    private authWatchService: LibAuthwatchService,
    private appUsersService: AppUsersService,
    private seoService: SeoService,
  ) {}

  ngOnInit() {
    this.seoService.setTitle('My Labs');
    this.seoService.noIndex(true);

    this.getAllLabs();
    this.userSubscription = this.authWatchService.currentUser$.subscribe((data) => {
      if (data && !data.profile_completed) {
        this.incompleteProfile = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.seoService.noIndex(false);
  }

  getAllLabs() {
    this.isLoading = true;
    this.appUsersService.myLabs().subscribe((data) => {
      this.labs = data.labs;
      this.labs = [];
      this.isLoading = false;
    });
  }

  destroyLab(labId) {
    const labIndex = this.labs.findIndex((k) => k.id === labId);
    this.labsService.destroy(this.labs[labIndex].id).subscribe((data) => {
      if (data) {
        this.labs.splice(labIndex, 1);
        this.toastLogService.successDialog('Deleted');
      }
    });
  }
}
