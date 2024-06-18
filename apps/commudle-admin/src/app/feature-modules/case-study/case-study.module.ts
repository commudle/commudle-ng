import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaseStudyRoutingModule } from './case-study-routing.module';
import { CaseStudyComponent } from './components/case-study/case-study.component';
import { CaseStudyHeaderComponent } from './components/case-study-header/case-study-header.component';
import { AppSharedComponentsModule } from 'apps/commudle-admin/src/app/app-shared-components/app-shared-components.module';
import { CaseStudiesComponent } from './components/case-studies/case-studies.component';
import { CaseStudiesHeaderComponent } from './components/case-studies-header/case-studies-header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NbButtonModule, NbIconModule } from '@commudle/theme';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { SharedPipesModule } from 'apps/shared-pipes/pipes.module';
import { CaseStudyCardComponent } from 'apps/commudle-admin/src/app/feature-modules/case-study/components/case-study-card/case-study-card.component';
@NgModule({
  declarations: [
    CaseStudyComponent,
    CaseStudyHeaderComponent,
    CaseStudiesComponent,
    CaseStudiesHeaderComponent,
    CaseStudyCardComponent,
  ],
  imports: [
    CommonModule,
    CaseStudyRoutingModule,
    AppSharedComponentsModule,
    FontAwesomeModule,
    NbButtonModule,
    SharedComponentsModule,
    SharedPipesModule,
    NbIconModule,
  ],
})
export class CaseStudyModule {}
