import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { UserResumeService } from 'projects/commudle-admin/src/app/feature-modules/users/services/user-resume.service';
import { IUserResume } from 'projects/shared-models/user_resume.model';
import { SeoService } from 'projects/shared-services/seo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-resume-preview',
  templateUrl: './user-resume-preview.component.html',
  styleUrls: ['./user-resume-preview.component.scss'],
})
export class UserResumePreviewComponent implements OnInit, OnDestroy {
  userResume: IUserResume;

  subscriptions: Subscription[] = [];

  dialogRef: NbDialogRef<any>;
  @ViewChild('previewResume', { static: true }) previewResume: TemplateRef<any>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
    private nbDialogService: NbDialogService,
    private userResumeService: UserResumeService,
  ) {}

  ngOnInit(): void {
    this.openDialog();
    this.getResume();
    this.seoService.noIndex(true);
  }

  ngOnDestroy(): void {
    this.dialogRef.close();
    this.seoService.noIndex(false);
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  openDialog(): void {
    this.dialogRef = this.nbDialogService.open(this.previewResume, { hasScroll: true });

    this.subscriptions.push(
      this.dialogRef.onClose.subscribe(() => {
        this.router.navigate([{ outlets: { p: null } }], { relativeTo: this.activatedRoute.parent });
      }),
    );
  }

  getResume(): void {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe((params) => {
        this.userResumeService.getResume(params.uuid).subscribe((resume) => {
          this.userResume = resume;
        });
      }),
    );
  }
}
