import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IHackathonResponseGroup } from 'apps/shared-models/hackathon-response-group.model';
import { DataFormEntityResponsesService } from 'apps/commudle-admin/src/app/services/data-form-entity-responses.service';

@Component({
  selector: 'commudle-public-hackathon-custom-questions-form',
  templateUrl: './public-hackathon-custom-questions-form.component.html',
  styleUrls: ['./public-hackathon-custom-questions-form.component.scss'],
})
export class PublicHackathonCustomQuestionsFormComponent implements OnInit {
  @Input() hackathonResponseGroup: IHackathonResponseGroup;
  @Output() submitFormEvent = new EventEmitter<any>();
  existingResponses: any;
  selectedFormResponse: any;

  constructor(private dataFormEntityResponsesService: DataFormEntityResponsesService) {}

  ngOnInit() {
    if (this.hackathonResponseGroup.data_form_entity_id) {
      this.dataFormEntityResponsesService
        .getExistingResponse(this.hackathonResponseGroup.data_form_entity_id)
        .subscribe((data) => {
          this.existingResponses = data.existing_responses;
          if (this.existingResponses.length > 0) {
            this.selectedFormResponse = this.existingResponses[this.existingResponses.length - 1];
          }
        });
    }
  }

  submitForm(formData) {
    this.submitFormEvent.emit(formData);
  }
}
