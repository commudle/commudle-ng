import { Component, OnInit } from '@angular/core';
import { AdminSurveysService } from '../../services/admin-surveys.service';
import { IAdminSurvey } from 'projects/shared-models/admin-survey.model';
import { NbWindowService } from '@nebular/theme';
import { FormResponsesComponent } from 'projects/shared-components/form-responses/form-responses.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-surveys',
  templateUrl: './admin-surveys.component.html',
  styleUrls: ['./admin-surveys.component.scss']
})
export class AdminSurveysComponent implements OnInit {
  adminSurveys: IAdminSurvey[];

  constructor(
    private adminSurveysService: AdminSurveysService,
    private windowService: NbWindowService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Admin: Surveys');
    this.getSurveys();
  }


  getSurveys() {
    this.adminSurveysService.getAdminSurveys().subscribe(
      data => {
        this.adminSurveys = data.admin_surveys;
      }
    );
  }


  openResponses(survey: IAdminSurvey) {
    this.windowService.open(
      FormResponsesComponent,
      {
        title: `Survey ${survey.name} Responses`,
        context: {
          dataFormId: survey.data_form_entity.data_form_id
        },
        windowClass: 'full-screen-width'
      }
    );
  }

}
