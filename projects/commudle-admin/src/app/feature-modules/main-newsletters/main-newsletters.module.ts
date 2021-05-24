import { NbActionsModule, NbInputModule, NbListModule, NbSelectModule, NbSpinnerModule } from '@nebular/theme';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NbIconModule } from '@nebular/theme';
import { NbButtonModule } from '@nebular/theme';
import { NbCardModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNewslettersRoutingModule } from './main-newsletters-routing.module';
import { IndexComponent } from './components/index/index.component';
import { MainNewsletterComponent } from './components/main-newsletter/main-newsletter.component';
import { MainNewsletterListItemComponent } from './components/index/main-newsletter-list-item/main-newsletter-list-item.component';
import { MainNewsletterFormComponent } from './components/main-newsletter-form/main-newsletter-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckRedirectGuard } from 'projects/shared-services/check-redirect.guard';


@NgModule({
  declarations: [
    IndexComponent,
    MainNewsletterComponent,
    MainNewsletterListItemComponent,
    MainNewsletterFormComponent
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
    NbSelectModule
  ],
  providers: [
    CheckRedirectGuard
  ]
})
export class MainNewslettersModule { }
