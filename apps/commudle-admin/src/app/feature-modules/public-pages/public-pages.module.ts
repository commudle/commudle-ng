import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbCardModule } from '@commudle/theme';
import { SharedPipesModule } from 'apps/shared-pipes/pipes.module';
import { PublicPageGuidelinesComponent } from './components/public-page-guidelines/public-page-guidelines.component';
import { PublicPagesRoutingModule } from './public-pages-routing.module';

@NgModule({
  declarations: [PublicPageGuidelinesComponent],
  imports: [CommonModule, PublicPagesRoutingModule, NbCardModule, SharedPipesModule],
})
export class PublicPagesModule {}
