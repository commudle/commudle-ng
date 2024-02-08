import { Component, Input, OnInit } from '@angular/core';
import { IHackathonResponseGroup } from 'apps/shared-models/hackathon-response-group.model';
import { DataFormEntityResponsesService } from 'apps/commudle-admin/src/app/services/data-form-entity-responses.service';
import { Location } from '@angular/common';
import { ToastrService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-public-hackathon-custom-questions-form',
  templateUrl: './public-hackathon-custom-questions-form.component.html',
  styleUrls: ['./public-hackathon-custom-questions-form.component.scss'],
})
export class PublicHackathonCustomQuestionsFormComponent implements OnInit {
  @Input() hackathonResponseGroup: IHackathonResponseGroup;
  existingResponses: any;
  selectedFormResponse: any;

  constructor(
    private dataFormEntityResponsesService: DataFormEntityResponsesService,
    private toastrService: ToastrService,
    private _location: Location,
  ) {}

  ngOnInit() {
    this.dataFormEntityResponsesService
      .getExistingResponse(this.hackathonResponseGroup.data_form_entity_id)
      .subscribe((data) => {
        this.existingResponses = data.existing_responses;
        if (this.existingResponses.length > 0) {
          this.selectedFormResponse = this.existingResponses[this.existingResponses.length - 1];
        }
      });
  }

  submitForm(formData) {
    this.dataFormEntityResponsesService
      .submitDataFormEntityResponse(this.hackathonResponseGroup.data_form_entity_id, formData)
      .subscribe((data) => {
        if (data) {
          this.toastrService.successDialog('Details has been saved');
          this._location.back();
        }
      });
  }
}
