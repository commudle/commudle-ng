import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';
import { SharedPipesModule } from '@commudle/shared-pipes';
import { PublicPageGuidelinesComponent } from './components/public-page-guidelines/public-page-guidelines.component';
import { PublicPagesRoutingModule } from './public-pages-routing.module';

@NgModule({
  declarations: [PublicPageGuidelinesComponent],
  imports: [CommonModule, PublicPagesRoutingModule, NbCardModule, SharedPipesModule],
})
export class PublicPagesModule {}
