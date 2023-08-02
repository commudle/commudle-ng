import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { IDiscountCode } from '@commudle/shared-models';
import { DiscountCodesService } from '@commudle/shared-services';
import { NbDialogService } from '@commudle/theme';
import { EventDataFormEntityGroupsService } from 'apps/commudle-admin/src/app/services/event-data-form-entity-groups.service';
import { IEventDataFormEntityGroup } from 'apps/shared-models/event_data_form_enity_group.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-discount-coupons',
  templateUrl: './discount-coupons.component.html',
  styleUrls: ['./discount-coupons.component.scss'],
})
export class DiscountCouponsComponent implements OnInit {
  @Input() event;
  discountCodes: IDiscountCode[];
  eventDataFormEntityGroups: IEventDataFormEntityGroup[] = [];
  discountCouponForm;
  subscriptions: Subscription[] = [];
  constructor(
    private dialogService: NbDialogService,
    private fb: FormBuilder,
    private eventDataFormEntityGroupsService: EventDataFormEntityGroupsService,
    private discountCodesService: DiscountCodesService,
  ) {
    this.discountCouponForm = this.fb.group({
      discount_code: this.fb.group<unknown>({
        code: ['', Validators.required],
        discount_type: ['', Validators.required],
        discount_value: ['', Validators.required],
        is_limited: ['', Validators.required],
        max_limit: ['', Validators.required],
        expires_at: ['', Validators.required],
      }),
    });
  }

  ngOnInit(): void {
    this.getDiscountCoupons();
    this.fetchEventDataFormEntityGroups();
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  fetchEventDataFormEntityGroups() {
    this.subscriptions.push(
      this.eventDataFormEntityGroupsService.getEventDataFormEntityGroups(this.event.id).subscribe((data) => {
        this.eventDataFormEntityGroups = data.event_data_form_entity_groups;
      }),
    );
  }

  create() {
    const groupIds = [160];
    const formData: any = new FormData();
    const discountCodeFormData = this.discountCouponForm.get('discount_code').value;

    Object.keys(discountCodeFormData).forEach((key) =>
      !(discountCodeFormData[key] == null) ? formData.append(`discount_code[${key}]`, discountCodeFormData[key]) : '',
    );

    groupIds.forEach((value) => formData.append('discount_code[event_data_form_entity_group_ids][]', value));

    this.subscriptions.push(
      this.discountCodesService.createDiscountCode(formData, this.event.id).subscribe((data) => {}),
    );
  }

  getDiscountCoupons() {
    this.subscriptions.push(
      this.discountCodesService.indexDiscountCodes(this.event.id).subscribe((data) => {
        this.discountCodes = data;
      }),
    );
  }
}
