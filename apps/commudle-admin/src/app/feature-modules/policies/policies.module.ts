import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoliciesRoutingModule } from './policies-routing.module';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { NbCardModule } from '@nebular/theme';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';


@NgModule({
  declarations: [PrivacyPolicyComponent, TermsAndConditionsComponent],
  imports: [
    CommonModule,
    PoliciesRoutingModule,

    // nebular
    NbCardModule
  ]
})
export class PoliciesModule { }
