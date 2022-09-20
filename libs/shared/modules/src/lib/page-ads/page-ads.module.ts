import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedDirectivesModule } from '@commudle/shared-directives';
import { NbCardModule } from '@nebular/theme';
import { PageAdsComponent } from './components/page-ads/page-ads.component';

@NgModule({
  declarations: [PageAdsComponent],
  imports: [CommonModule, SharedDirectivesModule, NbCardModule],
  exports: [PageAdsComponent],
})
export class PageAdsModule {}
