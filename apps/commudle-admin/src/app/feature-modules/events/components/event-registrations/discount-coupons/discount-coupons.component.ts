import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EDbModels, ICommunity, IDiscountCode, IEvent } from '@commudle/shared-models';
import { DiscountCodesService, ToastrService } from '@commudle/shared-services';
import { NbDialogRef, NbDialogService } from '@commudle/theme';
import { Subscription } from 'rxjs';
import { faCopy, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Clipboard } from '@angular/cdk/clipboard';
import { DiscountCouponFormComponent } from 'apps/commudle-admin/src/app/feature-modules/events/components/event-registrations/discount-coupons/discount-coupon-form/discount-coupon-form.component';
import { CustomPageFormComponent } from 'apps/commudle-admin/src/app/app-shared-components/custom-page/custom-page-form/custom-page-form.component';
import { EPageType, ICustomPage } from 'apps/shared-models/custom-page.model';

@Component({
  selector: 'commudle-discount-coupons',
  templateUrl: './discount-coupons.component.html',
  styleUrls: ['./discount-coupons.component.scss'],
})
export class DiscountCouponsComponent implements OnInit {
  @Input() event: IEvent;
  @Input() community: ICommunity;
  @Input() refundPolicy: ICustomPage;
  discountCodes: IDiscountCode[];
  subscriptions: Subscription[] = [];
  dialogRef: NbDialogRef<any>;

  icons = {
    faCopy,
    faPenToSquare,
  };

  EDbModels = EDbModels;
  EPageType = EPageType;

  @ViewChild(CustomPageFormComponent) customPageFormComponent: CustomPageFormComponent;
  constructor(
    private dialogService: NbDialogService,
    private discountCodesService: DiscountCodesService,
    private clipboard: Clipboard,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.discountCodesService.indexDiscountCodes(this.event.id);
    this.getDiscountCoupons();
  }

  getDiscountCoupons() {
    this.subscriptions.push(
      this.discountCodesService.discountCodes$.subscribe((data) => {
        this.discountCodes = data;
      }),
    );
  }

  openFormDialog(discountCode?) {
    const dialogRef = this.dialogService.open(DiscountCouponFormComponent, {
      closeOnBackdropClick: false,
      autoFocus: true,
      hasScroll: false,
      context: { type: discountCode ? 'edit' : 'create', discountCode: discountCode, event: this.event },
    });

    //handle output response
    dialogRef.componentRef.instance.consentValueChangedOutput.subscribe((data: IDiscountCode) => {
      if (discountCode) {
        const indexToUpdate = this.discountCodes.findIndex((code) => code.id === data.id);
        if (indexToUpdate !== -1) {
          this.discountCodes[indexToUpdate] = data;
        }
      } else {
        this.discountCodes.unshift(data);
      }
    });
  }

  copyTextToClipboard(code) {
    this.clipboard.copy(code);
    this.toastrService.successDialog('Discount code copied!');
  }

  open(dialog: TemplateRef<any>) {
    this.dialogRef = this.dialogService.open(dialog);
  }

  createOrUpdateRefundPage() {
    this.customPageFormComponent.createOrUpdate();
    this.dialogRef.close();
    this.community.has_refund_policy = true;
  }

  updateRefundPage(page) {
    this.refundPolicy = page;
  }
}
