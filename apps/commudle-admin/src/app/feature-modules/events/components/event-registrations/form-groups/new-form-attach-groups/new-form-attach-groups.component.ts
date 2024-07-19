import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICommunity, IEvent } from '@commudle/shared-models';
import { NbDialogService } from '@commudle/theme';
import { EventDataFormEntityGroupsService } from 'apps/commudle-admin/src/app/services/event-data-form-entity-groups.service';
import { IDataForm } from 'apps/shared-models/data_form.model';
import { IRegistrationType } from 'apps/shared-models/registration_type.model';
import { ToastrService } from '@commudle/shared-services';
import { IEventDataFormEntityGroup } from 'apps/shared-models/event_data_form_enity_group.model';
import { UserDetailsCheckboxFormComponent } from 'apps/shared-components/user-details-checkbox-form/user-details-checkbox-form.component';
import { EditDataFormComponent } from 'apps/shared-components/edit-data-form/edit-data-form.component';
import { DataFormsService } from 'apps/commudle-admin/src/app/services/data_forms.service';
import { NewDataFormComponent } from 'apps/shared-components/new-data-form/new-data-form.component';
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
  @Output() edfegCreated = new EventEmitter<IEventDataFormEntityGroup>();
  @ViewChild(UserDetailsCheckboxFormComponent) UserDetailsCheckbox: UserDetailsCheckboxFormComponent;
  @ViewChild(EditDataFormComponent) editDataFormComponent: EditDataFormComponent;
  @ViewChild(NewDataFormComponent) newDataFormComponent: NewDataFormComponent;

  selectedRegistrationType: IRegistrationType;
  eventDataFormEntityGroupForm: FormGroup;
  userDetailsFormValues: object;

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

  openDialogBox(tempRef) {
    this.resetForm();
    this.nbDialogBox.open(tempRef);
  }

  getValueOrUpdateEdfeg() {
    if (this.selectedRegistrationType.name === 'feedback' || this.selectedRegistrationType.name === 'communication') {
      this.updateAndCreateEdfeg();
    } else {
      this.UserDetailsCheckbox.updateValues();
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

  createEdfeg(userDetailsFormValues = {}) {
    const formData = this.eventDataFormEntityGroupForm.get('data_form_entity_group').value;
    this.edfegService
      .createEventDataFormEntityGroup(
        this.event.id,
        formData.name,
        this.selectedRegistrationType.id,
        formData.data_form_id,
        userDetailsFormValues,
      )
      .subscribe((data) => {
        this.edfegCreated.emit(data);
        this.toastrService.successDialog('Form Created');
        this.resetForm();
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
        this.createEdfeg();
      }
    });
  }

  updateData(formResponse) {
    this.dataFormsService.updateDataForm(formResponse).subscribe((data) => {
      if (data) {
        this.createEdfeg();
      }
    });
  }
}
