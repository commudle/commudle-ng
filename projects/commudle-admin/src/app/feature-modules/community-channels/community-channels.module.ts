import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityChannelsDashboardComponent } from './components/community-channels-dashboard/community-channels-dashboard.component';
import { CommunityChannelsRoutingModule } from './community-channels-routing.module';



@NgModule({
  declarations: [CommunityChannelsDashboardComponent],
  imports: [
    CommonModule,
    CommunityChannelsRoutingModule
  ],
  exports: [
    CommunityChannelsDashboardComponent
  ]
})
export class CommunityChannelsModule { }
