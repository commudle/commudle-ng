import { Component, OnInit } from '@angular/core';
import { DataFormsService } from 'projects/commudle-admin/src/app/services/data_forms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-create-data-form',
  templateUrl: './create-data-form.component.html',
  styleUrls: ['./create-data-form.component.scss']
})
export class CreateDataFormComponent implements OnInit {

  parentType;
  parentId;


  // define the form


  constructor(
    private dataFormsService: DataFormsService,
    private activatedRoute: ActivatedRoute,
    private toastLogService: LibToastLogService,
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle('New Form');
    // get the parent values
    this.activatedRoute.queryParams.subscribe(params => {
      this.parentType = params['parent_type'];
      this.parentId = params['parent_id'];
    });
  }

  saveDataForm(data) {
    this.dataFormsService.createDataForm(data, this.parentId, this.parentType).subscribe((dataForm => {
      this.toastLogService.successDialog('New Form Created!');
      this.router.navigate(['/admin/communities', this.parentId, 'forms']);
    }));
  }

}
