import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbButtonModule } from '@nebular/theme';
import { HomepageCardComponent } from './components/homepage-card/homepage-card.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageBannerComponent } from './components/homepage-banner/homepage-banner.component';

@NgModule({
  declarations: [HomepageComponent, HomepageCardComponent, HomepageBannerComponent],
  imports: [CommonModule, HomepageRoutingModule, NbButtonModule],
})
export class HomepageModule {}
