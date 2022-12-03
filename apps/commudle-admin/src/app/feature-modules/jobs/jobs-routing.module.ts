import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'apps/shared-services/lib-authwatch.guard';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { EmployersListComponent } from './components/employers-list/employers-list.component';
import { JobApplicationsComponent } from './components/job-applications/job-applications.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { JobComponent } from './components/job/job.component';
import { MyJobApplicationsComponent } from './components/my-job-applications/my-job-applications.component';

const routes: Routes = [
  {
    path: '',
    component: JobListComponent,
  },
  {
    path: 'my-applications',
    canActivate: [AuthGuard],
    component: MyJobApplicationsComponent,
  },
  {
    path: 'looking-for-work',
    component: EmployeesListComponent,
  },
  {
    path: 'hiring',
    component: EmployersListComponent,
  },
  {
    path: ':id',
    component: JobComponent,
    children: [
      {
        path: 'applications',
        component: JobApplicationsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsRoutingModule {}
