import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEvent } from '@commudle/shared-models';
import { NbDialogService } from '@commudle/theme';
import { EventDataFormEntityGroupsService } from 'apps/commudle-admin/src/app/services/event-data-form-entity-groups.service';
import { IDataForm } from 'apps/shared-models/data_form.model';
import { IRegistrationType } from 'apps/shared-models/registration_type.model';
import { ToastrService } from '@commudle/shared-services';
import { IEventDataFormEntityGroup } from 'apps/shared-models/event_data_form_enity_group.model';
import { UserDetailsCheckboxFormComponent } from 'apps/shared-components/user-details-checkbox-form/user-details-checkbox-form.component';
@Component({
  selector: 'commudle-new-form-attach-groups',
  templateUrl: './new-form-attach-groups.component.html',
  styleUrls: ['./new-form-attach-groups.component.scss'],
})
export class NewFormAttachGroupsComponent implements OnInit {
  @Input() registrationTypes: IRegistrationType[];
  @Input() communityDataForms: IDataForm[] = [];
  @Input() event: IEvent;
  @Output() edfegCreated = new EventEmitter<IEventDataFormEntityGroup>();
  @ViewChild(UserDetailsCheckboxFormComponent) UserDetailsCheckbox: UserDetailsCheckboxFormComponent;

  selectedRegistrationType: IRegistrationType;
  eventDataFormEntityGroupForm: FormGroup;

  constructor(
    private nbDialogBox: NbDialogService,
    private fb: FormBuilder,
    private edfegService: EventDataFormEntityGroupsService,
    private toastrService: ToastrService,
  ) {
    this.eventDataFormEntityGroupForm = this.fb.group({
      data_form_entity_group: this.fb.group({
        name: ['', Validators.required],
        registration_type_id: [''],
        data_form_id: ['', Validators.required],
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
      this.createEdfeg();
    } else {
      this.UserDetailsCheckbox.updateValues();
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

  submit(data) {}

  updateData(data) {}
}
