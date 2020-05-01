import { Component, OnInit, Input } from '@angular/core';
import { EventDataFormEntityGroupsService } from 'projects/commudle-admin/src/app/services/event-data-form-entity-groups.service';
import { IEventDataFormEntityGroup } from 'projects/shared-models/event_data_form_enity_group.model';
import { IRegistrationType } from 'projects/shared-models/registration_type.model';
import { RegistrationTypesService } from 'projects/commudle-admin/src/app/services/registration-types.service';
import { DataFormsService } from 'projects/commudle-admin/src/app/services/data_forms.service';
import { IDataForm } from 'projects/shared-models/data_form.model';
import { Visibility } from 'projects/shared-models/data_form_entity.model';
import { DataFormEntitiesService } from 'projects/commudle-admin/src/app/services/data-form-entities.service';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { faCopy, faEnvelope, faTimesCircle, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators } from '@angular/forms';
import { NbWindowService } from '@nebular/theme';
import { EmailerComponent } from 'projects/commudle-admin/src/app/components/emailer/emailer.component';
import { EemailTypes } from 'projects/shared-models/enums/email_types.enum';


@Component({
  selector: 'app-form-groups',
  templateUrl: './form-groups.component.html',
  styleUrls: ['./form-groups.component.scss']
})
export class FormGroupsComponent implements OnInit {
  faCopy = faCopy;
  faEnvelope = faEnvelope;
  faTimesCircle = faTimesCircle;
  faUsers = faUsers;

  @Input() event;
  @Input() community;

  eventDataFormEntityGroups: IEventDataFormEntityGroup[] = [];
  registrationTypes: IRegistrationType[];
  communityDataForms: IDataForm[] = [];
  visibilityOptions = Visibility;

  eventDataFormEntityGroupForm = this.fb.group({
    data_form_entity_group: this.fb.group({
      name: ['', Validators.required],
      registration_type_id: ['', Validators.required],
      data_form_id: ['', Validators.required]
    })
  });


  constructor(
    private eventDataFormEntityGroupsService: EventDataFormEntityGroupsService,
    private registrationTypesService: RegistrationTypesService,
    private dataFormsService: DataFormsService,
    private dataFormEntitiesService: DataFormEntitiesService,
    private toastLogService: LibToastLogService,
    private fb: FormBuilder,
    private windowService: NbWindowService
  ) { }

  ngOnInit() {

    // get all the event_data_form_entity_groups for this event
    this.eventDataFormEntityGroupsService.getEventDataFormEntityGroups(this.event.id).subscribe(
      data => (this.eventDataFormEntityGroups = data.event_data_form_entity_groups)
    );

    // get all the registration_types
    this.registrationTypesService.getRegistrationTypes().subscribe(data => (this.registrationTypes = data.registration_types));

    this.getCommunityDataForms();

  }

  // get all the data forms made in this community
  getCommunityDataForms() {
    this.dataFormsService.getCommunityDataForms(this.community.id).subscribe(data => (this.communityDataForms = data.data_forms));
  }

  // send a request to change the visibility_status
  changeVisibility(newStatus, dataFormEntityId) {
    this.dataFormEntitiesService.updateVisibilityStatus(newStatus, dataFormEntityId).subscribe((data) => {
      this.toastLogService.successDialog('Visibility Updated');
    });
  }


  getAttachedDataFormName(dataFormId) {
    return this.communityDataForms.find(k => k.id === dataFormId).name;
  }

  createEventDataFormEntityGroup() {
    let formData = this.eventDataFormEntityGroupForm.get('data_form_entity_group').value;
    this.eventDataFormEntityGroupsService.createEventDataFormEntityGroup(
      this.event.id,
      formData.name,
      formData.registration_type_id,
      formData.data_form_id
      ).subscribe((data) => {
        this.eventDataFormEntityGroups.push(data);
        this.toastLogService.successDialog("Form Created");
      });
  }


  deleteEventDataFormEntityGroup(eventDataFormEntityGroupId) {
    this.eventDataFormEntityGroupsService.deleteEventDataFormEntityGroup(eventDataFormEntityGroupId).subscribe(
      data => {
        this.toastLogService.successDialog("Deleted");
        let removable = this.eventDataFormEntityGroups.findIndex(k => k.id === eventDataFormEntityGroupId);
        this.eventDataFormEntityGroups.splice(removable, 1);
      }
    );
  }

  openEmailWindow(eventDataFormEntityGroup) {
    this.windowService.open(
      EmailerComponent,
      {
        title: `Send ${eventDataFormEntityGroup.name} Link`,
        context: {
          community: this.community,
          event: this.event,
          eventDataFormEntityGroupId: eventDataFormEntityGroup.id,
          mailType: EemailTypes.SEND_LINK
        }
      }
    );
  }

}
