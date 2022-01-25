import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataFormsService } from 'projects/commudle-admin/src/app/services/data_forms.service';
import { EDataFormParentTypes } from 'projects/shared-models/data_form.model';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { SeoService } from 'projects/shared-services/seo.service';

@Component({
  selector: 'app-create-data-form',
  templateUrl: './create-data-form.component.html',
  styleUrls: ['./create-data-form.component.scss'],
})
export class CreateDataFormComponent implements OnInit, OnDestroy {
  parentType;
  parentId;

  constructor(
    private dataFormsService: DataFormsService,
    private activatedRoute: ActivatedRoute,
    private toastLogService: LibToastLogService,
    private router: Router,
    private seoService: SeoService,
  ) {}

  ngOnInit() {
    this.seoService.setTitle('New Form');
    this.seoService.noIndex(true);

    this.activatedRoute.queryParams.subscribe((params) => {
      this.parentType = params['parent_type'];
      this.parentId = params['parent_id'];
    });
  }

  ngOnDestroy() {
    this.seoService.noIndex(false);
  }

  saveDataForm(data) {
    this.dataFormsService.createDataForm(data, this.parentId, this.parentType).subscribe(() => {
      this.toastLogService.successDialog('New Form Created!');

      switch (this.parentType) {
        case EDataFormParentTypes.community: {
          this.router.navigate(['/admin/communities', this.parentId, 'forms']);
          break;
        }
        case EDataFormParentTypes.adminSurvey: {
          this.router.navigate(['/sys-admin/admin-surveys']);
        }
      }
    });
  }
}
