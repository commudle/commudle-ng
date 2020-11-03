import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityChannelsDashboardComponent } from './components/community-channels-dashboard/community-channels-dashboard.component';



@NgModule({
  declarations: [CommunityChannelsDashboardComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CommunityChannelsDashboardComponent
  ]
})
export class CommunityChannelsModule { }
