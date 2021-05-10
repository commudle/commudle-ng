import { NbActionsModule, NbInputModule } from '@nebular/theme';
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


@NgModule({
  declarations: [IndexComponent, MainNewsletterComponent, MainNewsletterListItemComponent, MainNewsletterFormComponent],
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
    NbActionsModule
  ]
})
export class MainNewslettersModule { }
