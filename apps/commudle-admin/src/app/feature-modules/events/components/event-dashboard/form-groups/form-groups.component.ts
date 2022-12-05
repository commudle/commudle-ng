import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NbWindowService } from '@commudle/theme';
import { faCopy, faEnvelope, faTimesCircle, faUsers } from '@fortawesome/free-solid-svg-icons';
import { EmailerComponent } from 'apps/commudle-admin/src/app/app-shared-components/emailer/emailer.component';
import { DataFormEntitiesService } from 'apps/commudle-admin/src/app/services/data-form-entities.service';
import { DataFormsService } from 'apps/commudle-admin/src/app/services/data_forms.service';
import {
  EventDataFormEntityGroupsService
} from 'apps/commudle-admin/src/app/services/event-data-form-entity-groups.service';
import { RegistrationTypesService } from 'apps/commudle-admin/src/app/services/registration-types.service';
import { IDataForm } from 'apps/shared-models/data_form.model';
import { Visibility } from 'apps/shared-models/data_form_entity.model';
import { EemailTypes } from 'apps/shared-models/enums/email_types.enum';
import { ERegistationTypes } from 'apps/shared-models/enums/registration_types.enum';
import { IEventDataFormEntityGroup } from 'apps/shared-models/event_data_form_enity_group.model';
import { IRegistrationType } from 'apps/shared-models/registration_type.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';

@Component({
  selector: 'app-form-groups',
  templateUrl: './form-groups.component.html',
  styleUrls: ['./form-groups.component.scss'],
})
export class FormGroupsComponent implements OnInit {
  @Input() event;
  @Input() community;

  faCopy = faCopy;
  faEnvelope = faEnvelope;
  faTimesCircle = faTimesCircle;
  faUsers = faUsers;
  ERegistationTypes = ERegistationTypes;
  newDataFormWindowRef;

  eventDataFormEntityGroups: IEventDataFormEntityGroup[] = [];
  registrationTypes: IRegistrationType[];
  communityDataForms: IDataForm[] = [];
  visibilityOptions = Visibility;

  eventDataFormEntityGroupForm;

  @ViewChild('newDataFormTemplate') newDataFormTemplate: TemplateRef<any>;

  constructor(
    private eventDataFormEntityGroupsService: EventDataFormEntityGroupsService,
    private registrationTypesService: RegistrationTypesService,
    private dataFormsService: DataFormsService,
    private dataFormEntitiesService: DataFormEntitiesService,
    private toastLogService: LibToastLogService,
    private fb: FormBuilder,
    private windowService: NbWindowService,
  ) {
    this.eventDataFormEntityGroupForm = this.fb.group({
      data_form_entity_group: this.fb.group({
        name: ['', Validators.required],
        registration_type_id: ['', Validators.required],
        data_form_id: [0, Validators.required],
      }),
    });
  }

  ngOnInit() {
    // get all the event_data_form_entity_groups for this event
    this.eventDataFormEntityGroupsService
      .getEventDataFormEntityGroups(this.event.id)
      .subscribe((data) => (this.eventDataFormEntityGroups = data.event_data_form_entity_groups));

    // get all the registration_types
    this.registrationTypesService
      .getRegistrationTypes()
      .subscribe((data) => (this.registrationTypes = data.registration_types));

    this.getCommunityDataForms();
  }

  // get all the data forms made in this community
  getCommunityDataForms() {
    this.dataFormsService
      .getCommunityDataForms(this.community.id)
      .subscribe((data) => (this.communityDataForms = data.data_forms));
  }

  // send a request to change the visibility_status
  changeVisibility(newStatus, dataFormEntityId) {
    this.dataFormEntitiesService.updateVisibilityStatus(newStatus, dataFormEntityId).subscribe(() => {
      this.toastLogService.successDialog('Visibility Updated');
    });
  }

  updateRSVP(eventDataFormEntityGroupId, index) {
    this.eventDataFormEntityGroupsService.updateRSVP(eventDataFormEntityGroupId).subscribe((data) => {
      this.eventDataFormEntityGroups[index] = data;
      this.toastLogService.successDialog('Updated');
    });
  }

  getAttachedDataFormName(dataFormId) {
    return this.communityDataForms.find((k) => k.id === dataFormId).name;
  }

  createEventDataFormEntityGroup() {
    const formData = this.eventDataFormEntityGroupForm.get('data_form_entity_group').value;
    this.eventDataFormEntityGroupsService
      .createEventDataFormEntityGroup(
        this.event.id,
        formData.name,
        formData.registration_type_id,
        formData.data_form_id,
      )
      .subscribe((data) => {
        this.eventDataFormEntityGroups.push(data);
        this.toastLogService.successDialog('Form Created');
        this.eventDataFormEntityGroupForm.reset();
      });
  }

  deleteEventDataFormEntityGroup(eventDataFormEntityGroupId) {
    this.eventDataFormEntityGroupsService
      .deleteEventDataFormEntityGroup(eventDataFormEntityGroupId)
      .subscribe((data) => {
        this.toastLogService.successDialog('Deleted');
        const removable = this.eventDataFormEntityGroups.findIndex((k) => k.id === eventDataFormEntityGroupId);
        this.eventDataFormEntityGroups.splice(removable, 1);
      });
  }

  openNewFormWindow() {
    this.newDataFormWindowRef = this.windowService.open(this.newDataFormTemplate, {
      title: 'Create New Form',
      context: {
        minQuestionCount: 1,
      },
    });
  }

  createAndSelectForm(newFormData) {
    this.newDataFormWindowRef.close();
    this.dataFormsService.createDataForm(newFormData, this.community.id, 'Kommunity').subscribe((dataForm) => {
      this.communityDataForms.unshift(dataForm);

      setTimeout(() => {
        this.eventDataFormEntityGroupForm.get('data_form_entity_group').get('data_form_id').setValue(dataForm.id);
      }, 0);
      this.toastLogService.successDialog('New Form Created & Selected!');
    });
  }

  openEmailWindow(eventDataFormEntityGroup) {
    this.windowService.open(EmailerComponent, {
      title: `Send ${eventDataFormEntityGroup.name} Link`,
      context: {
        community: this.community,
        event: this.event,
        eventDataFormEntityGroupId: eventDataFormEntityGroup.id,
        mailType: EemailTypes.SEND_LINK,
      },
    });
  }
}
