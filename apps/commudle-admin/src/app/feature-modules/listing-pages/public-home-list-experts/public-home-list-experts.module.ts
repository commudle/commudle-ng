import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicHomeListExpertsRoutingModule } from './public-home-list-experts-routing.module';
import { PublicHomeListExpertsComponent } from './components/public-home-list-experts/public-home-list-experts.component';
import { ListingPagesLayoutComponent } from 'apps/commudle-admin/src/app/app-shared-components/listing-pages-layout/listing-pages-layout.component';
import { ExpertsHeaderComponent } from './components/experts-header/experts-header.component';

@NgModule({
  declarations: [PublicHomeListExpertsComponent, ExpertsHeaderComponent],
  imports: [CommonModule, PublicHomeListExpertsRoutingModule, ListingPagesLayoutComponent],
})
export class PublicHomeListExpertsModule {}
