import { NbListModule, NbIconModule, NbButtonModule, NbAlertModule, NbCardModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityEmailsListComponent } from './components/community-emails-list/community-emails-list.component';
import { LabCardComponent } from './components/lab-card/lab-card.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CommunityEmailsListComponent,
    LabCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,

    // Nebular
    NbListModule,
    NbIconModule,
    NbCardModule,
    NbButtonModule,
    NbAlertModule
  ],
  exports: [
    CommunityEmailsListComponent,
    LabCardComponent
  ]
})
export class ReusableComponentsModule { }
