import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicNewslettersRoutingModule } from './public-newsletters-routing.module';
import { MainNewsletterList } from './components/main-newsletter-list/main-newsletter-list.component';
import { NbCardModule, NbIconModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';


@NgModule({
  declarations: [
    MainNewsletterList,
  ],
  imports: [
    CommonModule,
    PublicNewslettersRoutingModule,

    //Nebular
    NbCardModule,
    NbIconModule,
    NbEvaIconsModule,
  ]
})
export class PublicNewslettersModule { }
