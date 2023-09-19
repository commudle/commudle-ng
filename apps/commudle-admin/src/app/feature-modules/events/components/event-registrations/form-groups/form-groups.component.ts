import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICommunity, IEvent, IStripeAccount } from '@commudle/shared-models';
import { StripeHandlerService } from '@commudle/shared-services';
import { NbWindowService } from '@commudle/theme';
import { faCopy, faEnvelope, faTimesCircle, faUsers } from '@fortawesome/free-solid-svg-icons';
import { EmailerComponent } from 'apps/commudle-admin/src/app/app-shared-components/emailer/emailer.component';
import { DataFormEntitiesService } from 'apps/commudle-admin/src/app/services/data-form-entities.service';
import { DataFormsService } from 'apps/commudle-admin/src/app/services/data_forms.service';
import { EventDataFormEntityGroupsService } from 'apps/commudle-admin/src/app/services/event-data-form-entity-groups.service';
import { RegistrationTypesService } from 'apps/commudle-admin/src/app/services/registration-types.service';
import { IDataForm } from 'apps/shared-models/data_form.model';
import { Visibility } from 'apps/shared-models/data_form_entity.model';
import { EemailTypes } from 'apps/shared-models/enums/email_types.enum';
import { ERegistationTypes } from 'apps/shared-models/enums/registration_types.enum';
import { IEventDataFormEntityGroup } from 'apps/shared-models/event_data_form_enity_group.model';
import { IRegistrationType, RegistrationTypeNames } from 'apps/shared-models/registration_type.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';

@Component({
  selector: 'app-form-groups',
  templateUrl: './form-groups.component.html',
  styleUrls: ['./form-groups.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormGroupsComponent implements OnInit {
  @Input() event: IEvent;
  @Input() community: ICommunity;

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

  eventDataFormEntityGroupForm: FormGroup;
  stripeAccounts: IStripeAccount[] = [];
  ERegistrationTypeNames = RegistrationTypeNames;
  showDiscountCouponComponent = false;

  @ViewChild('newDataFormTemplate') newDataFormTemplate: TemplateRef<any>;
  @Output() showDiscountCoupons = new EventEmitter<boolean>();

  constructor(
    private eventDataFormEntityGroupsService: EventDataFormEntityGroupsService,
    private registrationTypesService: RegistrationTypesService,
    private dataFormsService: DataFormsService,
    private dataFormEntitiesService: DataFormEntitiesService,
    private toastLogService: LibToastLogService,
    private fb: FormBuilder,
    private windowService: NbWindowService,
    private changeDetectorRef: ChangeDetectorRef,
    private stripeHandlerService: StripeHandlerService,
  ) {
    this.eventDataFormEntityGroupForm = this.fb.group({
      data_form_entity_group: this.fb.group({
        name: ['', Validators.required],
        registration_type_id: ['', Validators.required],
        data_form_id: ['', Validators.required],
      }),
    });
  }

  ngOnInit() {
    // get all the registration_types
    this.registrationTypesService.getRegistrationTypes().subscribe((data) => {
      this.registrationTypes = data.registration_types;
      this.changeDetectorRef.markForCheck();
    });

    this.getCommunityDataForms();
    this.getEventDataFormEntityGroups();
    if (this.community.payments_enabled) this.getStripeAccountData();
  }

  getEventDataFormEntityGroups() {
    this.eventDataFormEntityGroupsService.getEventDataFormEntityGroups(this.event.id).subscribe((data) => {
      this.eventDataFormEntityGroups = data.event_data_form_entity_groups;
      this.checkDiscountCode();
      this.changeDetectorRef.markForCheck();
    });
  }
  //get stripe account information
  getStripeAccountData() {
    this.stripeHandlerService.indexStripeAccount(this.community.id).subscribe((data) => {
      const stripeAccounts = this.stripeAccounts.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
      this.stripeAccounts = stripeAccounts.filter((stripeAccount) => stripeAccount.details.charges_enabled === true);
    });
  }

  // get all the data forms made in this community
  getCommunityDataForms() {
    this.dataFormsService.getCommunityDataForms(this.community.id).subscribe((data) => {
      this.communityDataForms = data.data_forms;
      this.changeDetectorRef.markForCheck();
    });
  }

  // send a request to change the visibility_status
  changeVisibility(newStatus, dataFormEntityId) {
    this.dataFormEntitiesService.updateVisibilityStatus(newStatus.target.value, dataFormEntityId).subscribe(() => {
      this.toastLogService.successDialog('Visibility Updated');
      this.changeDetectorRef.markForCheck();
    });
  }

  updateRSVP(eventDataFormEntityGroupId, index) {
    this.eventDataFormEntityGroupsService.updateRSVP(eventDataFormEntityGroupId).subscribe((data) => {
      this.eventDataFormEntityGroups[index] = data;
      this.toastLogService.successDialog('Updated');
      this.changeDetectorRef.markForCheck();
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
        this.changeDetectorRef.markForCheck();
      });
  }

  deleteEventDataFormEntityGroup(eventDataFormEntityGroupId) {
    this.eventDataFormEntityGroupsService
      .deleteEventDataFormEntityGroup(eventDataFormEntityGroupId)
      .subscribe((data) => {
        this.toastLogService.successDialog('Deleted');
        const removable = this.eventDataFormEntityGroups.findIndex((k) => k.id === eventDataFormEntityGroupId);
        this.eventDataFormEntityGroups.splice(removable, 1);
        this.changeDetectorRef.markForCheck();
      });
  }

  openNewFormWindow() {
    this.newDataFormWindowRef = this.windowService.open(this.newDataFormTemplate, {
      title: 'Create New Form',
      context: {
        minQuestionCount: 1,
      },
      windowClass: 'form-window',
    });

    this.newDataFormWindowRef.onClose.subscribe(() =>
      this.eventDataFormEntityGroupForm.get('data_form_entity_group').get('data_form_id').setValue(''),
    );
  }

  createAndSelectForm(newFormData) {
    this.newDataFormWindowRef.close();
    this.dataFormsService.createDataForm(newFormData, this.community.id, 'Kommunity').subscribe((dataForm) => {
      this.communityDataForms.unshift(dataForm);
      this.changeDetectorRef.markForCheck();

      setTimeout(() => {
        this.eventDataFormEntityGroupForm.get('data_form_entity_group').get('data_form_id').setValue(dataForm.id);
        this.eventDataFormEntityGroupForm.updateValueAndValidity();
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

  changeDataFormValue(event) {
    if (event.value === 'createNewForm') {
      this.openNewFormWindow();
    }
  }

  onSwitchToggled(eventDataFormEntityGroupId, index) {
    this.eventDataFormEntityGroupsService.togglePaidTicket(eventDataFormEntityGroupId).subscribe((data) => {
      this.eventDataFormEntityGroups[index].is_paid = data;
      this.checkDiscountCode();
    });
  }

  checkDiscountCode() {
    for (const entity of this.eventDataFormEntityGroups) {
      if (entity.is_paid === true) {
        this.showDiscountCouponComponent = true; // Set showDiscount to true if is_paid is true
        break; // Exit the loop since we found a true value
      } else {
        this.showDiscountCouponComponent = false;
      }
    }
    this.showDiscountCoupons.emit(this.showDiscountCouponComponent);
  }
}
