import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbEvaIconsModule } from '@commudle/eva-icons';
import { NbCardModule, NbIconModule, NbSpinnerModule } from '@commudle/theme';
import { NewsletterListComponent } from './components/newsletter-list/newsletter-list.component';
import { PublicNewslettersRoutingModule } from './public-newsletters-routing.module';

@NgModule({
  declarations: [NewsletterListComponent],
  imports: [
    CommonModule,
    PublicNewslettersRoutingModule,
    NbCardModule,
    NbIconModule,
    NbEvaIconsModule,
    NbSpinnerModule,
  ],
})
export class PublicNewslettersModule {}
