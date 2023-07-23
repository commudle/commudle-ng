import { NbListModule, NbIconModule, NbButtonModule, NbAlertModule, NbCardModule } from '@commudle/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityEmailsListComponent } from './components/community-emails-list/community-emails-list.component';
import { LabCardComponent } from './components/lab-card/lab-card.component';
import { RouterModule } from '@angular/router';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { BackButtonComponent } from 'apps/shared-components/back-button/back-button.component';

@NgModule({
  declarations: [CommunityEmailsListComponent, LabCardComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedComponentsModule,

    // standalone
    BackButtonComponent,

    // Nebular
    NbListModule,
    NbIconModule,
    NbCardModule,
    NbButtonModule,
    NbAlertModule,
  ],
  exports: [CommunityEmailsListComponent, LabCardComponent],
})
export class ReusableComponentsModule {}
