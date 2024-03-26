import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpertProgramRoutingModule } from './expert-program-routing.module';
import { ExpertsProgramComponent } from './components/experts-program/experts-program.component';
import { AppSharedComponentsModule } from 'apps/commudle-admin/src/app/app-shared-components/app-shared-components.module';
import { SharedComponentsModule } from '@commudle/shared-components';

@NgModule({
  declarations: [ExpertsProgramComponent],
  imports: [CommonModule, ExpertProgramRoutingModule, AppSharedComponentsModule, SharedComponentsModule],
})
export class ExpertProgramModule {}
