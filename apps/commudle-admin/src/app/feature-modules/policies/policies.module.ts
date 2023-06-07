import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoliciesRoutingModule } from './policies-routing.module';
import { NbCardModule } from '@commudle/theme';
import { PoliciesComponent } from './component/policies/policies.component';

@NgModule({
  declarations: [PoliciesComponent],
  imports: [
    CommonModule,
    PoliciesRoutingModule,
    // nebular
    NbCardModule,
  ],
})
export class PoliciesModule {}
