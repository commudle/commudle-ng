import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentNonProfitSupportRoutingModule } from './student-non-profit-support-routing.module';
import { StudentNonProfitCommunitySupportComponent } from './components/student-non-profit-community-support/student-non-profit-community-support.component';
import { NbButtonModule } from '@commudle/theme';

@NgModule({
  declarations: [StudentNonProfitCommunitySupportComponent],
  imports: [CommonModule, StudentNonProfitSupportRoutingModule, NbButtonModule],
})
export class StudentNonProfitSupportModule {}
