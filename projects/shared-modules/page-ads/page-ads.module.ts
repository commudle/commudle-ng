import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';
import { SharedDirectivesModule } from 'projects/shared-directives/shared-directives.module';
import { PageAdsComponent } from './components/page-ads/page-ads.component';

@NgModule({
  declarations: [PageAdsComponent],
  imports: [CommonModule, SharedDirectivesModule, NbCardModule],
  exports: [PageAdsComponent],
})
export class PageAdsModule {}
