import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IDiscountCode, IEvent } from '@commudle/shared-models';
import { DiscountCodesService, ToastrService } from '@commudle/shared-services';
import { NbDialogRef } from '@commudle/theme';
import { EventDataFormEntityGroupsService } from 'apps/commudle-admin/src/app/services/event-data-form-entity-groups.service';
import { IEventDataFormEntityGroup } from 'apps/shared-models/event_data_form_enity_group.model';
import { Subscription } from 'rxjs';
import moment from 'moment';

@Component({
  selector: 'commudle-discount-coupon-form',
  templateUrl: './discount-coupon-form.component.html',
  styleUrls: ['./discount-coupon-form.component.scss'],
})
export class DiscountCouponFormComponent implements OnInit {
  @Input() event: IEvent;
  @Input() type: string;
  @Input() discountCode: IDiscountCode;
  discountCouponForm: FormGroup;
  eventDataFormEntityGroups: IEventDataFormEntityGroup[] = [];
  selectedEventDataFormEntityGroups = [];
  subscriptions: Subscription[] = [];

  @Output() consentValueChangedOutput = new EventEmitter<IDiscountCode>();

  constructor(
    private fb: FormBuilder,
    private discountCodesService: DiscountCodesService,
    private toastrService: ToastrService,
    private eventDataFormEntityGroupsService: EventDataFormEntityGroupsService,
    private datePipe: DatePipe,
    private dialogRef: NbDialogRef<DiscountCouponFormComponent>,
  ) {
    this.discountCouponForm = this.fb.group(
      {
        discount_code: this.fb.group<unknown>({
          code: ['', Validators.required],
          discount_type: ['', Validators.required],
          discount_value: ['', [Validators.required, Validators.min(1)]],
          is_limited: [false, Validators.required],
          max_limit: [0],
          expires_at: [''],
        }),
      },
      {
        validators: [
          // if is_limited is true, then max_limit is required
          (fb) =>
            fb.get('discount_code').get('is_limited').value === true && !fb.get('discount_code').get('max_limit').value
              ? { max_limit: true }
              : null,
          (fb) => {
            const discountGroup = fb.get('discount_code');
            const discountType = discountGroup.get('discount_type').value;
            const discountValue = discountGroup.get('discount_value').value;

            if (discountType === 'percent' && discountValue > 100) {
              discountGroup.get('discount_value').setErrors({ discount_value_exceeds: true });
            }
          },
        ],
      },
    );
  }

  ngOnInit(): void {
    this.fetchEventDataFormEntityGroups();
    this.selectedEventDataFormEntityGroups = [];
    if (this.discountCode) {
      const date = new Date(this.discountCode.expires_at);
      for (const code of this.discountCode.event_data_form_entity_group_ids) {
        this.addEventDataForm(code, 'edit');
      }
      this.discountCouponForm.get('discount_code').setValue({
        code: this.discountCode.code,
        discount_type: this.discountCode.discount_type,
        discount_value:
          this.discountCode.discount_type === 'fixed_amount'
            ? this.discountCode.discount_value / 100
            : this.discountCode.discount_value,
        is_limited: this.discountCode.is_limited,
        max_limit: this.discountCode.max_limit,
        expires_at: this.discountCode.expires_at ? this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss') : '',
      });
    }
  }

  onCodeInput(event: any) {
    const inputElement = event.target;
    const inputValue = inputElement.value.toUpperCase();
    this.discountCouponForm.get('discount_code.code')?.setValue(inputValue, { emitEvent: false });
  }

  clearExpiresAt() {
    this.discountCouponForm.get('discount_code.expires_at').setValue('');
  }

  // fetch EDFEG:forms name
  fetchEventDataFormEntityGroups() {
    this.subscriptions.push(
      this.eventDataFormEntityGroupsService.getEventDataFormEntityGroups(this.event.id).subscribe((data) => {
        this.eventDataFormEntityGroups = data.event_data_form_entity_groups.filter(
          (item) => item.registration_type.id !== 3, //3 is for feedback
        );
        if (this.type === 'create') {
          for (const edfeg of this.eventDataFormEntityGroups) {
            if (edfeg.is_paid) {
              this.selectedEventDataFormEntityGroups.push(edfeg.id);
            }
          }
        }
      }),
    );
  }

  //save discount code data
  savedDiscountCouponData(discountCodeId?) {
    if (this.discountCouponForm.controls.discount_code.get('discount_type').value === 'fixed_amount') {
      const discountValue = this.discountCouponForm.controls.discount_code.get('discount_value').value * 100;
      this.discountCouponForm.get('discount_code').patchValue({
        discount_value: discountValue,
      });
    }
    if (this.discountCouponForm.controls.discount_code.get('expires_at').value) {
      const expireDate = this.discountCouponForm.controls.discount_code.get('expires_at').value;

      this.discountCouponForm.controls.discount_code.patchValue({
        expires_at: moment(expireDate).local(),
      });
    }
    const formData: any = new FormData();
    const discountCodeFormData = this.discountCouponForm.get('discount_code').value;

    Object.keys(discountCodeFormData).forEach((key) =>
      !(discountCodeFormData[key] == null) ? formData.append(`discount_code[${key}]`, discountCodeFormData[key]) : '',
    );

    this.selectedEventDataFormEntityGroups.forEach((value) =>
      formData.append('discount_code[event_data_form_entity_group_ids][]', value),
    );
    if (discountCodeId) {
      this.update(discountCodeId, formData);
    } else {
      this.create(formData);
    }
  }

  //create discount code
  create(formData) {
    this.subscriptions.push(
      this.discountCodesService.createDiscountCode(formData, this.event.id).subscribe((data) => {
        this.discountCodesService.updateDiscountIndex(data);
        this.toastrService.successDialog('Discount Coupon Has Been Created');
        this.closeDialogBox();
        this.discountCouponForm.reset();
      }),
    );
  }

  // update discount code
  update(discountCodeId, formData) {
    this.subscriptions.push(
      this.discountCodesService.updateDiscountCodes(formData, discountCodeId).subscribe((data) => {
        this.consentValueChangedOutput.emit(data);
        this.toastrService.successDialog('Discount Coupon Has Been Updated');
        this.closeDialogBox();
        this.discountCouponForm.reset();
      }),
    );
  }

  // add forms name for api
  addEventDataForm(event, formType?) {
    if (formType) {
      this.selectedEventDataFormEntityGroups.push(event);
    } else {
      const id = Number(event.target.value);
      const index = this.selectedEventDataFormEntityGroups.indexOf(id);
      if (event.target.checked) {
        this.selectedEventDataFormEntityGroups.push(id);
      } else if (!event.target.checked) {
        this.selectedEventDataFormEntityGroups.splice(index, 1);
      }
    }
  }

  //close dialog box
  closeDialogBox() {
    this.dialogRef.close();
  }
}
