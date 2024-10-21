/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICommunity, IEvent } from '@commudle/shared-models';
import { NbDialogRef, NbDialogService } from '@commudle/theme';
import { EventDataFormEntityGroupsService } from 'apps/commudle-admin/src/app/services/event-data-form-entity-groups.service';
import { IDataForm } from 'apps/shared-models/data_form.model';
import { IRegistrationType } from 'apps/shared-models/registration_type.model';
import { ToastrService } from '@commudle/shared-services';
import { IEventDataFormEntityGroup } from 'apps/shared-models/event_data_form_enity_group.model';
import { UserDetailsCheckboxFormComponent } from 'apps/shared-components/user-details-checkbox-form/user-details-checkbox-form.component';
import { EditDataFormComponent } from 'apps/shared-components/edit-data-form/edit-data-form.component';
import { DataFormsService } from 'apps/commudle-admin/src/app/services/data_forms.service';
import { NewDataFormComponent } from 'apps/shared-components/new-data-form/new-data-form.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'commudle-new-form-attach-groups',
  templateUrl: './new-form-attach-groups.component.html',
  styleUrls: ['./new-form-attach-groups.component.scss'],
})
export class NewFormAttachGroupsComponent implements OnInit {
  @Input() registrationTypes: IRegistrationType[];
  @Input() communityDataForms: IDataForm[] = [];
  @Input() event: IEvent;
  @Input() community: ICommunity;
  @Input() eventDataFormEntityGroup: IEventDataFormEntityGroup;
  @Output() edfegCreated = new EventEmitter<IEventDataFormEntityGroup>();
  @Output() edfegUpdated = new EventEmitter<IEventDataFormEntityGroup>();
  @ViewChild(UserDetailsCheckboxFormComponent) UserDetailsCheckbox: UserDetailsCheckboxFormComponent;
  @ViewChild(EditDataFormComponent) editDataFormComponent: EditDataFormComponent;
  @ViewChild(NewDataFormComponent) newDataFormComponent: NewDataFormComponent;
  dialogRef: NbDialogRef<any>;
  @ViewChild('formAttachDialogBox', { read: TemplateRef }) formAttachDialogBoxTemplate: TemplateRef<HTMLElement>;
  selectedRegistrationType: IRegistrationType;
  eventDataFormEntityGroupForm: FormGroup;
  userDetailsFormValues: object;
  icons = {
    faPlus,
  };

  constructor(
    private nbDialogBox: NbDialogService,
    private fb: FormBuilder,
    private edfegService: EventDataFormEntityGroupsService,
    private toastrService: ToastrService,
    private dataFormsService: DataFormsService,
  ) {
    this.eventDataFormEntityGroupForm = this.fb.group({
      data_form_entity_group: this.fb.group({
        name: ['', Validators.required],
        registration_type_id: [''],
        data_form_id: [''],
      }),
    });
  }

  ngOnInit() {}

  openDialogBox(registrationTypes?, edfeg?, communityDataForms?) {
    this.eventDataFormEntityGroup = null;
    this.resetForm();
    this.eventDataFormEntityGroupForm.controls['data_form_entity_group'].get('data_form_id').enable();
    if (registrationTypes) {
      this.registrationTypes = registrationTypes;
    }
    if (edfeg) {
      this.eventDataFormEntityGroup = edfeg;
      // if (this.eventDataFormEntityGroup?.summary_registration_counts?.all > 0) {
      //   this.eventDataFormEntityGroupForm.controls['data_form_entity_group'].get('data_form_id').disable();
      // } else {
      //   this.eventDataFormEntityGroupForm.controls['data_form_entity_group'].get('data_form_id').enable();
      // }
      this.selectedRegistrationType = edfeg.registration_type;
      this.eventDataFormEntityGroupForm.get('data_form_entity_group').patchValue({
        name: edfeg.data_form_entity.name,
        registration_type_id: edfeg.registration_type.id,
        data_form_id: edfeg.data_form_entity.data_form_id,
      });
    }
    if (communityDataForms) {
      this.communityDataForms = communityDataForms;
    }
    this.dialogRef = this.nbDialogBox.open(this.formAttachDialogBoxTemplate);
  }

  getValueOrUpdateEdfeg() {
    if (this.selectedRegistrationType.name === 'feedback' || this.selectedRegistrationType.name === 'communication') {
      this.updateAndCreateEdfeg();
    } else {
      if (
        this.eventDataFormEntityGroup === null ||
        (this.eventDataFormEntityGroup !== null && this.eventDataFormEntityGroup.user_details !== null)
      ) {
        this.UserDetailsCheckbox.updateValues();
      } else {
        this.updateAndCreateEdfeg();
      }
    }
  }

  updateAndCreateEdfeg(userDetailsFormValues = {}) {
    this.userDetailsFormValues = userDetailsFormValues;
    if (this.eventDataFormEntityGroupForm.get('data_form_entity_group').get('data_form_id').value) {
      this.editDataFormComponent.updateDataForm();
    } else {
      this.newDataFormComponent.saveDataForm();
    }
  }

  createOrUpdateEdfeg() {
    if (this.eventDataFormEntityGroup) {
      this.updateEdfeg(this.eventDataFormEntityGroup.id);
    } else {
      this.createEdfeg();
    }
  }

  createEdfeg() {
    const formData = this.eventDataFormEntityGroupForm.get('data_form_entity_group').value;
    this.edfegService
      .createEventDataFormEntityGroup(
        this.event.id,
        formData.name,
        this.selectedRegistrationType.id,
        formData.data_form_id,
        this.userDetailsFormValues,
      )
      .subscribe((data) => {
        this.edfegCreated.emit(data);
        this.toastrService.successDialog('Form Created');
        this.resetForm();
        this.dialogRef.close();
      });
  }

  updateEdfeg(edfegId) {
    this.edfegService
      .updateEventDataFormEntityGroup(
        edfegId,
        this.eventDataFormEntityGroupForm.get('data_form_entity_group'),
        this.userDetailsFormValues,
      )
      .subscribe((data) => {
        this.edfegUpdated.emit(data);
        this.toastrService.successDialog('Form Updated');
        this.dialogRef.close();
      });
  }

  resetForm() {
    this.eventDataFormEntityGroupForm.reset({
      data_form_entity_group: {
        name: '',
        registration_type_id: '',
        data_form_id: '',
      },
    });
  }

  submit(newFormData) {
    this.dataFormsService.createDataForm(newFormData, this.community.id, 'Kommunity').subscribe((data) => {
      if (data) {
        this.eventDataFormEntityGroupForm.get('data_form_entity_group').get('data_form_id').setValue(data.id);
        this.createOrUpdateEdfeg();
      }
    });
  }

  updateData(formResponse) {
    this.dataFormsService.updateDataForm(formResponse).subscribe((data) => {
      if (data) {
        this.createOrUpdateEdfeg();
      }
    });
  }

  invalidDataForm() {
    this.toastrService.warningDialog('Question is invalid or may be empty');
  }
}
