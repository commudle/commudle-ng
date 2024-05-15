import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaseStudyRoutingModule } from './case-study-routing.module';
import { CaseStudyTaaranganaComponent } from './components/case-study-taarangana/case-study-taarangana.component';
import { CaseStudyTaaranganaHeaderComponent } from './components/case-study-taarangana-header/case-study-taarangana-header.component';
import { AppSharedComponentsModule } from 'apps/commudle-admin/src/app/app-shared-components/app-shared-components.module';

@NgModule({
  declarations: [CaseStudyTaaranganaComponent, CaseStudyTaaranganaHeaderComponent],
  imports: [CommonModule, CaseStudyRoutingModule, AppSharedComponentsModule],
})
export class CaseStudyModule {}
