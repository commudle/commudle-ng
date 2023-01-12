import { NbActionsModule, NbDialogModule, NbInputModule, NbListModule, NbSelectModule, NbSpinnerModule, NbTagModule, NbTooltipModule } from '@commudle/theme';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NbIconModule } from '@commudle/theme';
import { NbButtonModule } from '@commudle/theme';
import { NbCardModule } from '@commudle/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNewslettersRoutingModule } from './main-newsletters-routing.module';
import { IndexComponent } from './components/index/index.component';
import { MainNewsletterComponent } from './components/main-newsletter/main-newsletter.component';
import { MainNewsletterListItemComponent } from './components/index/main-newsletter-list-item/main-newsletter-list-item.component';
import { MainNewsletterFormComponent } from './components/main-newsletter-form/main-newsletter-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckRedirectGuard } from 'apps/shared-services/check-redirect.guard';
import { MainNewsletterSchedulerComponent } from './components/main-newsletter-scheduler/main-newsletter-scheduler.component';
import { MainNewsletterTestEmailerComponent } from './components/main-newsletter-test-emailer/main-newsletter-test-emailer.component';
import { MainNewsletterEmailStatsComponent } from './components/main-newsletter-email-stats/main-newsletter-email-stats.component';


@NgModule({
  declarations: [
    IndexComponent,
    MainNewsletterComponent,
    MainNewsletterListItemComponent,
    MainNewsletterFormComponent,
    MainNewsletterSchedulerComponent,
    MainNewsletterTestEmailerComponent,
    MainNewsletterEmailStatsComponent,
  ],
  exports: [
    MainNewsletterComponent
  ],
  imports: [
    CommonModule,
    MainNewslettersRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    // nebular
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    EditorModule,
    NbInputModule,
    NbActionsModule,
    NbListModule,
    NbSpinnerModule,
    NbSelectModule,
    NbDialogModule.forChild(),
    NbTagModule,
    NbTooltipModule
  ],
  providers: [
    CheckRedirectGuard
  ]
})
export class MainNewslettersModule { }
