import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaseStudyRoutingModule } from './case-study-routing.module';
import { CaseStudyComponent } from './components/case-study/case-study.component';
import { CaseStudyHeaderComponent } from './components/case-study-header/case-study-header.component';
import { AppSharedComponentsModule } from 'apps/commudle-admin/src/app/app-shared-components/app-shared-components.module';

@NgModule({
  declarations: [CaseStudyComponent, CaseStudyHeaderComponent],
  imports: [CommonModule, CaseStudyRoutingModule, AppSharedComponentsModule],
})
export class CaseStudyModule {}
