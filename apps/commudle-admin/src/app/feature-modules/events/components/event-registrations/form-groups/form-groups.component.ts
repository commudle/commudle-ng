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
import { EActivationStatus, ICommunity, IEvent, IRazorpayAccount, IStripeAccount } from '@commudle/shared-models';
import { PaymentSettingService, RazorpayService, StripeHandlerService } from '@commudle/shared-services';
import { NbDialogService, NbWindowService } from '@commudle/theme';
import { faCopy, faEnvelope, faTimesCircle, faUsers, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { EmailerComponent } from 'apps/commudle-admin/src/app/app-shared-components/emailer/emailer.component';
import { NewFormAttachGroupsComponent } from 'apps/commudle-admin/src/app/feature-modules/events/components/event-registrations/form-groups/new-form-attach-groups/new-form-attach-groups.component';
import { DataFormEntitiesService } from 'apps/commudle-admin/src/app/services/data-form-entities.service';
import { DataFormsService } from 'apps/commudle-admin/src/app/services/data_forms.service';
import { EventDataFormEntityGroupsService } from 'apps/commudle-admin/src/app/services/event-data-form-entity-groups.service';
import { RegistrationTypesService } from 'apps/commudle-admin/src/app/services/registration-types.service';
import { ICustomPage } from 'apps/shared-models/custom-page.model';
import { IDataForm } from 'apps/shared-models/data_form.model';
import { Visibility } from 'apps/shared-models/data_form_entity.model';
import { EemailTypes } from 'apps/shared-models/enums/email_types.enum';
import { ERegistationTypes } from 'apps/shared-models/enums/registration_types.enum';
import { IEventDataFormEntityGroup } from 'apps/shared-models/event_data_form_enity_group.model';
import {
  IRegistrationType,
  RegistrationTypeBackgroundColor,
  RegistrationTypeNames,
} from 'apps/shared-models/registration_type.model';
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
  @Input() refundPolicy: ICustomPage;
  faCopy = faCopy;
  faEnvelope = faEnvelope;
  faTimesCircle = faTimesCircle;
  faUsers = faUsers;
  faPenToSquare = faPenToSquare;
  ERegistationTypes = ERegistationTypes;
  newDataFormWindowRef;

  eventDataFormEntityGroups: IEventDataFormEntityGroup[] = [];
  registrationTypes: IRegistrationType[];
  communityDataForms: IDataForm[] = [];
  visibilityOptions = Visibility;

  eventDataFormEntityGroupForm: FormGroup;
  updateEventDataFormEntityGroupForm: FormGroup;
  stripeAccounts: IStripeAccount[] = [];
  razorpayAccounts: IRazorpayAccount[] = [];
  ERegistrationTypeNames = RegistrationTypeNames;
  showDiscountCouponComponent = false;
  RegistrationTypeBackgroundColor = RegistrationTypeBackgroundColor;
  paymentDetailsExist = false;

  @ViewChild('newDataFormTemplate') newDataFormTemplate: TemplateRef<any>;
  @Output() showDiscountCoupons = new EventEmitter<boolean>();

  @ViewChild(NewFormAttachGroupsComponent) newFormAttachGroupsComponent: NewFormAttachGroupsComponent;

  constructor(
    private eventDataFormEntityGroupsService: EventDataFormEntityGroupsService,
    private registrationTypesService: RegistrationTypesService,
    private dataFormsService: DataFormsService,
    private dataFormEntitiesService: DataFormEntitiesService,
    private toastLogService: LibToastLogService,
    private fb: FormBuilder,
    private windowService: NbWindowService,
    private dialogService: NbDialogService,
    private changeDetectorRef: ChangeDetectorRef,
    private stripeHandlerService: StripeHandlerService,
    private razorpayService: RazorpayService,
    private paymentSettingService: PaymentSettingService,
  ) {
    this.eventDataFormEntityGroupForm = this.fb.group({
      data_form_entity_group: this.fb.group({
        name: ['', Validators.required],
        registration_type_id: ['', Validators.required],
        data_form_id: ['', Validators.required],
      }),
    });

    this.updateEventDataFormEntityGroupForm = this.fb.group({
      name: ['', Validators.required],
      registration_type_id: ['', Validators.required],
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
    if (this.community.payments_enabled) {
      this.getStripeAccountData();
      this.getRazorpayAccountData();
    }
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

  //get razorpay account information
  getRazorpayAccountData() {
    this.razorpayService.indexRazorpayAccounts(this.community.id, EActivationStatus.ACTIVATED).subscribe((data) => {
      this.razorpayAccounts = this.razorpayAccounts.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
    });
  }

  // get all the data forms made in this community
  getCommunityDataForms() {
    this.dataFormsService.getCommunityDataForms(this.community.id).subscribe((data) => {
      this.communityDataForms = data.data_forms;
      this.changeDetectorRef.markForCheck();
    });
  }

  // check edfeg paid status before changing visibility
  changeVisibility(newStatus, edfeg: IEventDataFormEntityGroup) {
    if (edfeg.is_paid) {
      this.paymentSettingService.indexPaymentSettings(edfeg.id).subscribe((data) => {
        if (!data) {
          this.toastLogService.warningDialog('Payment details do not exist, Please fill before changing visibility');
          newStatus.target.value = edfeg.data_form_entity.visibility;
          return;
        } else {
          this.updateVisibility(newStatus, edfeg);
        }
      });
    } else {
      this.updateVisibility(newStatus, edfeg);
    }
  }

  // Updating the status of edfeg.data_form_entity.visibility
  updateVisibility(newStatus, edfeg) {
    this.dataFormEntitiesService
      .updateVisibilityStatus(newStatus.target.value, edfeg.data_form_entity.id)
      .subscribe(() => {
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

  toggleCancellation(eventDataFormEntityGroupId, index) {
    this.eventDataFormEntityGroupsService.toggleAllowCancellation(eventDataFormEntityGroupId).subscribe((data) => {
      if (data) {
        this.eventDataFormEntityGroups[index].allow_cancellation =
          !this.eventDataFormEntityGroups[index].allow_cancellation;
        this.toastLogService.successDialog('Updated');
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  getAttachedDataFormName(dataFormId) {
    return this.communityDataForms.find((k) => k.id === dataFormId).name;
  }

  updateEdfegList(edfeg) {
    this.eventDataFormEntityGroups = [...this.eventDataFormEntityGroups, edfeg];
  }

  deleteEventDataFormEntityGroup(eventDataFormEntityGroupId, index) {
    this.eventDataFormEntityGroupsService
      .deleteEventDataFormEntityGroup(eventDataFormEntityGroupId)
      .subscribe((data) => {
        this.toastLogService.successDialog('Deleted');
        if (index !== -1) {
          this.eventDataFormEntityGroups.splice(index, 1);
          this.eventDataFormEntityGroups = [...this.eventDataFormEntityGroups]; // Trigger change detection
          this.changeDetectorRef.markForCheck();
        }
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

  onSwitchToggled(eventDataFormEntityGroupId) {
    this.eventDataFormEntityGroupsService.togglePaidTicket(eventDataFormEntityGroupId).subscribe((data) => {
      const edfegIndex = this.eventDataFormEntityGroups.findIndex((edfeg) => edfeg.id === eventDataFormEntityGroupId);
      this.eventDataFormEntityGroups[edfegIndex].is_paid = data;
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

  openAutomationDialog(automationDialog: TemplateRef<any>, dfe, i) {
    this.dialogService.open(automationDialog, {
      context: {
        dfe: dfe,
        index: i,
      },
    });
  }

  saveAutomation(dfe, value, index) {
    this.dataFormEntitiesService.updateAutomation(dfe.id, value).subscribe((data) => {
      if (data) {
        this.eventDataFormEntityGroups[index].data_form_entity.auto_close_responses_count = value;
      }
    });
  }

  openUpdateEventDataFormGroup(edfeg) {
    this.newFormAttachGroupsComponent.openDialogBox(this.registrationTypes, edfeg, this.communityDataForms);
  }

  updateEventDataFormEntityGroup(edfeg) {
    const index = this.eventDataFormEntityGroups.findIndex((k) => k.id === edfeg.id);
    this.eventDataFormEntityGroups[index] = edfeg;
    this.eventDataFormEntityGroups = [...this.eventDataFormEntityGroups];
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

  checkPaymentDetailsExists(edfeg) {
    this.paymentDetailsExist = false;
    this.paymentSettingService.indexPaymentSettings(edfeg.id).subscribe((data) => {
      if (data) {
        this.paymentDetailsExist = true;
      }
    });
  }
}
