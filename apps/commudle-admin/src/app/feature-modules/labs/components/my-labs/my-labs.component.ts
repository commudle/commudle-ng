import { Component, OnDestroy, OnInit } from '@angular/core';
import { ILab } from '@commudle/shared-models';
import { AppUsersService, LibAuthwatchService, LibToastLogService, SeoService } from '@commudle/shared-services';
import { faFlask } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { LabsService } from '../../services/labs.service';

@Component({
  selector: 'commudle-my-labs',
  templateUrl: './my-labs.component.html',
  styleUrls: ['./my-labs.component.scss'],
})
export class MyLabsComponent implements OnInit, OnDestroy {
  faFlask = faFlask;
  moment = moment;
  userSubscription;

  labs: ILab[] = [];
  incompleteProfile = false;

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
    this.appUsersService.myLabs().subscribe((data) => {
      this.labs = data.labs;
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
