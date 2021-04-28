import { EditorModule } from '@tinymce/tinymce-angular';
import { NbCardModule, NbIconModule, NbTabsetModule, NbButtonModule, NbDatepickerModule, NbTimepickerModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewslettersRoutingModule } from './newsletters-routing.module';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { NewsletterListComponent } from './components/newsletter/newsletter-list/newsletter-list.component';
import { CreateNewsletterComponent } from './components/create-newsletter/create-newsletter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [NewsletterComponent, NewsletterListComponent, CreateNewsletterComponent],
  imports: [
    CommonModule,
    NewslettersRoutingModule,
    EditorModule,
    FormsModule,
    ReactiveFormsModule,

    //Nebular
    NbCardModule,
    NbIconModule,
    NbTabsetModule,
    NbButtonModule,
    NbDatepickerModule,
    NbTimepickerModule,



  ]
})
export class NewslettersModule { }
