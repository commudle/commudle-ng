import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AboutComponent } from './components/about/about.component';
import { CommunitiesComponent } from './components/communities/communities.component';
import { FeaturesComponent } from './components/features/features.component';
import { HomeCommunityCardComponent } from './components/communities/home-community-card/home-community-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedComponentsModule } from 'projects/shared-components/shared-components.module';
import { SharedPipesModule } from 'projects/shared-pipes/pipes.module';
import { NbCardModule, NbFormFieldModule, NbSpinnerModule, NbIconModule, NbAccordionModule, NbBadgeModule, NbTooltipModule } from '@nebular/theme';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    HomePageComponent,
    AboutComponent,
    CommunitiesComponent,
    HomeCommunityCardComponent,
    FeaturesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedComponentsModule,
    SharedPipesModule,
    FontAwesomeModule,


    // Nebular
    NbFormFieldModule,
    NbCardModule,
    NbIconModule,
    NbAccordionModule,
    NbSpinnerModule,
    NbBadgeModule,
    NbTooltipModule


  ],
  exports: [
    HomePageComponent,
    CommunitiesComponent,
    AboutComponent,
    FeaturesComponent
  ]
})
export class HomeModule { }
