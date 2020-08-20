import { NbListModule, NbIconModule, NbButtonModule, NbAlertModule, NbCardModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityEmailsListComponent } from './components/community-emails-list/community-emails-list.component';



@NgModule({
  declarations: [CommunityEmailsListComponent],
  imports: [
    CommonModule,

    // Nebular
    NbListModule,
    NbIconModule,
    NbCardModule,
    NbButtonModule,
    NbAlertModule
  ],
  exports: [
    CommunityEmailsListComponent
  ]
})
export class ReusableComponentsModule { }
