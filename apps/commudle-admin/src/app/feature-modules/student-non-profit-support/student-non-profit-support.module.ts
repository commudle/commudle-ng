import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentNonProfitSupportRoutingModule } from './student-non-profit-support-routing.module';
import { StudentNonProfitCommunitySupportComponent } from './components/student-non-profit-community-support/student-non-profit-community-support.component';
import { NbButtonModule } from '@commudle/theme';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedComponentsModule } from '@commudle/shared-components';

@NgModule({
  declarations: [StudentNonProfitCommunitySupportComponent],
  imports: [
    CommonModule,
    StudentNonProfitSupportRoutingModule,
    NbButtonModule,
    FontAwesomeModule,
    SharedComponentsModule,
  ],
})
export class StudentNonProfitSupportModule {}
