import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentNonProfitSupportRoutingModule } from './student-non-profit-support-routing.module';
import { StudentNonProfitCommunitySupportComponent } from './components/student-non-profit-community-support/student-non-profit-community-support.component';

@NgModule({
  declarations: [StudentNonProfitCommunitySupportComponent],
  imports: [CommonModule, StudentNonProfitSupportRoutingModule],
})
export class StudentNonProfitSupportModule {}
