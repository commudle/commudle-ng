import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDiscountCode, IEvent } from '@commudle/shared-models';
import { DiscountCodesService, ToastrService } from '@commudle/shared-services';
import { NbDialogService } from '@commudle/theme';
import { EventDataFormEntityGroupsService } from 'apps/commudle-admin/src/app/services/event-data-form-entity-groups.service';
import { IEventDataFormEntityGroup } from 'apps/shared-models/event_data_form_enity_group.model';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { faCopy, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'commudle-discount-coupons',
  templateUrl: './discount-coupons.component.html',
  styleUrls: ['./discount-coupons.component.scss'],
})
export class DiscountCouponsComponent implements OnInit {
  @Input() event: IEvent;
  discountCodes: IDiscountCode[];
  eventDataFormEntityGroups: IEventDataFormEntityGroup[] = [];
  discountCouponForm: FormGroup;
  subscriptions: Subscription[] = [];
  selectedEventDataFormEntityGroups = [];

  icons = {
    faCopy,
    faPenToSquare,
  };
  constructor(
    private dialogService: NbDialogService,
    private fb: FormBuilder,
    private eventDataFormEntityGroupsService: EventDataFormEntityGroupsService,
    private discountCodesService: DiscountCodesService,
    private datePipe: DatePipe,
    private clipboard: Clipboard,
    private toastrService: ToastrService,
  ) {
    this.discountCouponForm = this.fb.group(
      {
        discount_code: this.fb.group<unknown>({
          code: ['', Validators.required],
          discount_type: ['', Validators.required],
          discount_value: ['', Validators.required],
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
        ],
      },
    );
  }

  ngOnInit(): void {
    this.getDiscountCoupons();
    this.fetchEventDataFormEntityGroups();
  }

  getDiscountCoupons() {
    this.subscriptions.push(
      this.discountCodesService.indexDiscountCodes(this.event.id).subscribe((data: IDiscountCode[]) => {
        this.discountCodes = data;
      }),
    );
  }

  fetchEventDataFormEntityGroups() {
    this.subscriptions.push(
      this.eventDataFormEntityGroupsService.getEventDataFormEntityGroups(this.event.id).subscribe((data) => {
        this.eventDataFormEntityGroups = data.event_data_form_entity_groups.filter(
          (item) => item.registration_type.id !== 3, //3 is for feedback
        );
      }),
    );
  }

  open(dialog: TemplateRef<any>, discountCode?) {
    this.selectedEventDataFormEntityGroups = [];
    if (discountCode) {
      const date = new Date(discountCode.expires_at);
      for (const code of discountCode.event_data_form_entity_group_ids) {
        this.addEventDataForm(code, 'edit');
      }
      this.discountCouponForm.get('discount_code').setValue({
        code: discountCode.code,
        discount_type: discountCode.discount_type,
        discount_value:
          discountCode.discount_type === 'fixed_amount'
            ? discountCode.discount_value / 100
            : discountCode.discount_value,
        is_limited: discountCode.is_limited,
        max_limit: discountCode.max_limit,
        expires_at: this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss'),
      });
    }
    this.dialogService.open(dialog, {
      closeOnBackdropClick: false,
      autoFocus: true,
      hasScroll: false,
      context: { type: discountCode ? 'edit' : 'create', id: discountCode?.id },
    });
  }

  savedDiscountCouponData(discountCodeId?) {
    if (this.discountCouponForm.controls.discount_code.get('discount_type').value === 'fixed_amount') {
      const discountValue = this.discountCouponForm.controls.discount_code.get('discount_value').value * 100;
      this.discountCouponForm.get('discount_code').patchValue({
        discount_value: discountValue,
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

  create(formData) {
    this.subscriptions.push(
      this.discountCodesService.createDiscountCode(formData, this.event.id).subscribe((data) => {
        this.discountCouponForm.reset();
        this.toastrService.successDialog('Discount Coupon Has Been Created');
        this.discountCodes.unshift(data);
      }),
    );
  }

  update(discountCodeId, formData) {
    this.subscriptions.push(
      this.discountCodesService.updateDiscountCodes(formData, discountCodeId).subscribe((data) => {
        const indexToUpdate = this.discountCodes.findIndex((code) => code.id === data.id);
        this.toastrService.successDialog('Discount Coupon Has Been Updated');
        if (indexToUpdate !== -1) {
          this.discountCodes[indexToUpdate] = data;
        }
      }),
    );
    this.discountCouponForm.reset();
  }

  addEventDataForm(event, formType?) {
    if (formType) {
      this.selectedEventDataFormEntityGroups.push(event);
    } else {
      const id = event.target.value;
      const index = this.selectedEventDataFormEntityGroups.indexOf(id);
      if (event.target.checked) {
        this.selectedEventDataFormEntityGroups.push(id);
      } else if (!event.target.checked) {
        this.selectedEventDataFormEntityGroups.splice(index, 1);
      }
    }
  }

  copyTextToClipboard(code) {
    this.clipboard.copy(code);
    this.toastrService.successDialog('Discount code copied!');
  }
}
