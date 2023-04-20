import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentNonProfitCommunitySupportComponent } from './components/student-non-profit-community-support/student-non-profit-community-support.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '/student-non-profit-community-support',
    component: StudentNonProfitCommunitySupportComponent,
  },
];
// /student-non-profit-community-support

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class StudentNonProfitSupportRoutingModule {}
