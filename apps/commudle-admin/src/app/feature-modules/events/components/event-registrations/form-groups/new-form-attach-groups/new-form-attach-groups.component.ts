import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEvent } from '@commudle/shared-models';
import { NbDialogService } from '@commudle/theme';
import { EventDataFormEntityGroupsService } from 'apps/commudle-admin/src/app/services/event-data-form-entity-groups.service';
import { IDataForm } from 'apps/shared-models/data_form.model';
import { IRegistrationType } from 'apps/shared-models/registration_type.model';
import { ToastrService } from '@commudle/shared-services';
import { IEventDataFormEntityGroup } from 'apps/shared-models/event_data_form_enity_group.model';
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
        registration_type_id: ['', Validators.required],
        data_form_id: ['', Validators.required],
      }),
    });
  }

  ngOnInit() {}

  openDialogBox(tempRef) {
    this.nbDialogBox.open(tempRef);
  }

  createEdfeg() {
    const formData = this.eventDataFormEntityGroupForm.get('data_form_entity_group').value;
    this.edfegService
      .createEventDataFormEntityGroup(
        this.event.id,
        formData.name,
        this.selectedRegistrationType.id,
        formData.data_form_id,
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
}
