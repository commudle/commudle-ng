import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { JobApplicationService } from 'projects/commudle-admin/src/app/feature-modules/jobs/services/job-application.service';
import { IJobApplication } from 'projects/shared-models/job-application.model';

@Component({
  selector: 'app-my-job-application',
  templateUrl: './my-job-application.component.html',
  styleUrls: ['./my-job-application.component.scss'],
})
export class MyJobApplicationComponent implements OnInit {
  @Input() jobApplication: IJobApplication;

  @Output() reloadJobApplication: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private jobApplicationService: JobApplicationService,
    private nbDialogService: NbDialogService,
    private nbToastrService: NbToastrService,
  ) {}

  ngOnInit(): void {}

  onDialogOpen(templateRef: TemplateRef<any>) {
    this.nbDialogService.open(templateRef, { closeOnEsc: false, closeOnBackdropClick: false });
  }

  deleteJobApplication(): void {
    this.jobApplicationService.deleteJobApplication(this.jobApplication.id).subscribe((value) => {
      if (value) {
        this.nbToastrService.success('Job Application Withdrawn!', 'Success');
        this.reloadJobApplication.emit(true);
      }
    });
  }
}
