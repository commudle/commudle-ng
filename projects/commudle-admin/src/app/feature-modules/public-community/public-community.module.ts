import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicCommunityRoutingModule } from './public-community-routing.module';
import { HomeCommunityComponent } from './components/home-community/home-community.component';
import {
  NbCardModule,
  NbListModule,
  NbInputModule,
  NbButtonModule,
  NbIconModule,
  NbTooltipModule,
  NbPopoverModule,
  NbTabsetModule,
  NbAlertModule
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'projects/shared-components/shared-components.module';
import { AboutComponent } from './components/about/about.component';
import { EventsComponent } from './components/events/events.component';
import { MembersComponent } from './components/members/members.component';


@NgModule({
  declarations: [HomeCommunityComponent, AboutComponent, EventsComponent, MembersComponent],
  imports: [
    CommonModule,
    PublicCommunityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,





    // Nebular
    NbCardModule,
    NbListModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
    NbPopoverModule,
    NbTabsetModule,
    NbAlertModule
  ]
})
export class PublicCommunityModule { }
