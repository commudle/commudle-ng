import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaseStudyRoutingModule } from './case-study-routing.module';
import { CaseStudyComponent } from './components/case-study/case-study.component';
import { CaseStudyHeaderComponent } from './components/case-study-header/case-study-header.component';
import { AppSharedComponentsModule } from 'apps/commudle-admin/src/app/app-shared-components/app-shared-components.module';
import { CaseStudiesComponent } from './components/case-studies/case-studies.component';
import { CaseStudiesHeaderComponent } from './components/case-studies-header/case-studies-header.component';
import { CaseStudiesCardComponent } from './components/case-studies-card/case-studies-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NbButtonModule } from '@commudle/theme';

@NgModule({
  declarations: [
    CaseStudyComponent,
    CaseStudyHeaderComponent,
    CaseStudiesComponent,
    CaseStudiesHeaderComponent,
    CaseStudiesCardComponent,
  ],
  imports: [CommonModule, CaseStudyRoutingModule, AppSharedComponentsModule, FontAwesomeModule, NbButtonModule],
})
export class CaseStudyModule {}
