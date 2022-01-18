import { EDataFormParentTypes } from './../../../../../../../shared-models/data_form.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataFormsService } from 'projects/commudle-admin/src/app/services/data_forms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { SeoService } from 'projects/shared-services/seo.service';

@Component({
  selector: 'app-create-data-form',
  templateUrl: './create-data-form.component.html',
  styleUrls: ['./create-data-form.component.scss']
})
export class CreateDataFormComponent implements OnInit, OnDestroy {

  parentType;
  parentId;

  EDataFormParentTypes = EDataFormParentTypes;


  // define the form


  constructor(
    private dataFormsService: DataFormsService,
    private activatedRoute: ActivatedRoute,
    private toastLogService: LibToastLogService,
    private router: Router,
    private seoService : SeoService
  ) { }

  ngOnInit() {
    this.seoService.setTitle('New Form');
    this.seoService.setTag('robots', 'noindex');
    // get the parent values
    this.activatedRoute.queryParams.subscribe(params => {
      this.parentType = params['parent_type'];
      this.parentId = params['parent_id'];
    });
  }

  ngOnDestroy() {
    this.seoService.removeTag("name='robots'");
  }

  saveDataForm(data) {
    this.dataFormsService.createDataForm(data, this.parentId, this.parentType).subscribe((dataForm => {
      this.toastLogService.successDialog('New Form Created!');

      switch(this.parentType) {
        case EDataFormParentTypes.community: {
          this.router.navigate(['/admin/communities', this.parentId, 'forms']);
          break;
        }
        case EDataFormParentTypes.adminSurvey: {
          this.router.navigate(['/sys-admin/admin-surveys']);
        }
      }
    }));
  }

}
