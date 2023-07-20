import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveysService } from 'apps/commudle-admin/src/app/services/surveys.service';
import { IAdminSurvey } from 'apps/shared-models/admin-survey.model';

@Component({
  selector: 'commudle-community-surveys',
  templateUrl: './community-surveys.component.html',
  styleUrls: ['./community-surveys.component.scss'],
})
export class CommunitySurveysComponent implements OnInit {
  newFormParentId: number;
  surveys: IAdminSurvey[];

  constructor(private activatedRoute: ActivatedRoute, private surveysService: SurveysService) {}

  ngOnInit(): void {
    this.newFormParentId = this.activatedRoute.parent.parent.snapshot.params.community_id;
    this.getSurveys();
  }

  getSurveys() {
    this.surveysService.getSurveys('Kommunity', this.newFormParentId).subscribe((data) => {
      this.surveys = data.admin_surveys;
      console.log(
        '🚀 ~ file: community-surveys.component.ts:25 ~ CommunitySurveysComponent ~ this.surveysService.getSurveys ~  this.surveys:',
        this.surveys,
      );
    });
  }
}
