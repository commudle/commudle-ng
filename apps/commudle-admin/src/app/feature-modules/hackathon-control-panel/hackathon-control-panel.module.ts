import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HackathonControlPanelRoutes } from './hackathon-control-panel.routing';
import { HackathonControlPanelDashboardComponent } from './components/hackathon-control-panel-dashboard/hackathon-control-panel-dashboard.component';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { SidebarComponent } from 'apps/shared-components/sidebar/sidebar.component';

@NgModule({
  declarations: [HackathonControlPanelDashboardComponent],
  imports: [
    CommonModule,
    HackathonControlPanelRoutes,
    SharedComponentsModule,

    //components
    SidebarComponent,
  ],
})
export class HackathonControlPanelModule {}
